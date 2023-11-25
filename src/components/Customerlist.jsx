import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import AddTraining from "./AddTraining";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

function Customerlist() {
  const [customers, setCustomers] = useState([]);


  useEffect(() => {
    fetchCustomers();
  }, []);

  const [columnDefs] = useState([
    { field: 'firstname', sortable: true, filter: true, width: 150 },
    { field: 'lastname', sortable: true, filter: true, width: 150 },
    { field: 'streetaddress', sortable: true, filter: true },
    { field: 'postcode', sortable: true, filter: true, width: 120 },
    { field: 'city', sortable: true, filter: true, width: 130 },
    { field: 'email', sortable: true, filter: true },
    { field: 'phone', sortable: true, filter: true, width: 140 },
    {
      cellRenderer: params => <AddTraining fetchTrainings={fetchTrainings} customerId={params.data.id}  />,
      width: 180
    },
    {
      cellRenderer: params => <EditCustomer fetchCustomers={fetchCustomers} data={params.data} />,
      width: 100
    },
    {
      cellRenderer: params =>
        <IconButton size="small" onClick={() => deleteCustomer(params.data.links[0].href)}>
          <DeleteIcon fontSize="small" />
        </IconButton>,
      width: 100
    },
  ]);

  const fetchCustomers = () => {
    fetch('https://traineeapp.azurewebsites.net/api/customers')
      .then(response => {
        if (response.ok)
          return response.json();
        else
          throw new Error("Error in fetch: " + response.statusText);
      })
      .then(data => setCustomers(data.content))
      .catch(err => console.error(err));
  }

  const fetchTrainings = () => {
    fetch('https://traineeapp.azurewebsites.net/api/training')
      .then(response => {
        if (response.ok)
          return response.json();
        else
          throw new Error("Error in fetch: " + response.statusText);
      })
      .then(data => setCustomers(data.content))
      .catch(err => console.error(err));
  }

  const deleteCustomer = (url) => {
    if (window.confirm("Are you sure?")) {
      fetch(url, { method: 'DELETE' })
        .then(response => {
          if (response.ok)
            fetchCustomers();
          else
            throw new Error("Error in DELETE: " + response.statusText);
        })
        .catch(err => console.error(err))
    }
  }

  return (
    <>

      <div className="ag-theme-material" style={{ height: "500px", width: "100%" }}>
        <h1>Customers</h1>
        <AgGridReact
          rowData={customers}
          columnDefs={columnDefs}
          pagination={true}
          paginationAutoPageSize={true}
        />
        <AddCustomer fetchCustomers={fetchCustomers} />
      </div>
    </>
  );
}

export default Customerlist;