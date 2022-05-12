import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import moment from "moment"
 function WithdrawRequest() {
    let apiBaseURL = "http://localhost:5000";
    const [data, setData] = useState([]); 
    const columns = [
        // { title: "Sr No", render: (rowData) => rowData.tableData.id + 1 },
        { title: "User Name", field: "username" },
        { title: "Email ID", field: "email" },
        { title: "TXN ID", field: "txn_id",filtering:true }, 
        { title: "Balance", field: "points",filtering:true },
        { title: "Withdraw Amount", field: "txn_amount",filtering:true },
        { title: "Mode", field: "is_request_mode",filtering:true },
        { 
        title: "TXN Date",
          render: rowData => rowData.txn_date?moment(rowData.txn_date).format('YYYY-M-D h:mm:ss'):'Not login yet',
          filtering:true,
        }, 
      ];
    //get Agents
    const getReports = async () => {
        await axios({
            method: "GET",
            url: `${apiBaseURL}/api/payments/WithdrawHistory`,
            // data: user,
            // headers: {"Authorization" : `Bearer ${authToken}`}
        })    
        .then(function (response) {
          if (response.data.status === 200)
          {
              console.log(response.data.data)
            setData(response.data.data);
          } 
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    useEffect(() => {
      getReports();
    }, []);
  //get Agents
  const changeStatus = async (distributor,status,message) => { 
     
    // Swal.fire({
    //     title: `Are you sure? Want to ${message}`,
    //     // text: "You won't be able to revert this!",
    //     icon: 'warning',
    //     showCancelButton: true,
    //     confirmButtonColor: '#3085d6',
    //     cancelButtonColor: '#d33',
    //     confirmButtonText: `Yes, ${message} it!`
    //   }).then((result) => {
    //     if (result.isConfirmed) {  
    //         let statusCode;
    //         if(status ===1){
    //           statusCode =0
    //         }else{
    //           statusCode =0
    //         }
    //         let updateData = {
    //             active:statusCode,
    //             distributor_id:distributor
    //         }
    //         axios.put(`${apiBaseURL}/api/users/changeStatusDistributor`,updateData)
    //         .then(function (response) { 
    //           if (response.data.status === 200) {
    //               getPlayers();
    //               Swal.fire(
    //                 `${response.data.message}!`,
    //                 `User status have been ${response.data.message}`,
    //                 'success'
    //               )
    //           }else{
    //             Swal.fire(
    //                 `${response.data.message}!`, 
    //                 'error'
    //               )
    //           }
    //         })
    //         .catch(function (error) {
    //             Swal.fire(
    //                 `Something Went wrong!`, 
    //                 'error'
    //               )
    //         }); 
    //     }
    //   })
  };

  //get Agents
  const deleteUser = async (distributor) => {
    // Swal.fire({
    //     title: 'Are you sure?',
    //     text: "You won't be able to revert this!",
    //     icon: 'warning',
    //     showCancelButton: true,
    //     confirmButtonColor: '#3085d6',
    //     cancelButtonColor: '#d33',
    //     confirmButtonText: 'Yes, delete it!'
    //   }).then((result) => {
    //     if (result.isConfirmed) {  
    //         axios.delete(`${apiBaseURL}/api/users/deleteDistributor/${distributor}`)
    //         .then(function (response) {
    //             console.log(response )
    //           if (response.data.status === 200) {
    //               getPlayers();
    //               Swal.fire(
    //                 `${response.data.message}!`,
    //                 `User have been ${response.data.message}`,
    //                 'success'
    //               )
    //           }else{
    //             Swal.fire(
    //                 `${response.data.message}!`, 
    //                 'error'
    //               )
    //           }
    //         })
    //         .catch(function (error) {
    //             Swal.fire(
    //                 `Something Went wrong!`, 
    //                 'error'
    //               )
    //         }); 
    //     }
    //   })
};
    return ( 
        <><div className="card card-outline card-info">
        <MaterialTable
          title="Withdraw Request"
          data={data}
          columns={columns} 
        //   options={{ actionsColumnIndex: -1 }}
          actions={[
            (rowData) => {
              return {
                icon: rowData.active === 1 ? "adminpanelsettings" : "accessibilitynow",
                tooltip: rowData.active === 1 ? "Blocked" : "Active",
                onClick: (event, row) => changeStatus(row.distributor_id,row.active,`${row.active === 0 ? "block" : "unblock"}`),
              };
            },
            {
              icon: "delete",
              tooltip: "Remove Distributor",
              onClick: (event, rowData) => deleteUser(rowData.distributor_id),
            },
          ]}
        />
      </div> 
        </>
    );
  }
export default WithdrawRequest