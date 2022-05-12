import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import moment from "moment"

function TransactionHistory() {
  let apiBaseURL = "http://localhost:3000";
  const [data, setData] = useState([]);
  const columns = [
    // { title: "Sl No", render: (rowData) => rowData.tableData.id + 1 },
    { title: "Sl No", field: "transaction_id" },
    { title: "Order Id", field: "order_id" },
    { title: "Amount", field: "txn_amount" },
    { title: "TXN ID", field: "txn_id", filtering: true },
    { title: "TXN Date", field: "txn_date", filtering: true },
    {
      title: "Transaction Date",
      render: rowData => rowData.created_at ? moment(rowData.created_at).format('YYYY-M-D h:mm:ss') : 'Not login yet',
      filtering: true,
    },
  ];
  //get Agents 
  const getReports = async () => {
    await axios({
      method: "GET",
      url: `${apiBaseURL}/money/transactionHistory`,
      // data: user,
      // headers: {"Authorization" : `Bearer ${authToken}`}
    })
      .then(function (response) {
        if (response.data.status === 200) {
          setData(response.data.data);
        } else {

        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    getReports();
  }, []);

  return (
    <>
      <div className="col-12 col-sm-6 col-md-3">
      </div>
      <div className="card card-outline card-info">
        <MaterialTable
          title="Transction Records"
          data={data}
          columns={columns}
        />
      </div>
    </>
  );
}
export default TransactionHistory