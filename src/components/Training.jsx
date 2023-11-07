import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import format from "date-fns/format";
import Button from '@mui/material/Button';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

function Training() {
  const [trainings, setTrainings] = useState([]);
  const [customers, setCustomers] = useState({});

  useEffect(() => {
    fetchTrainings();
  }, []);

  useEffect(() => {
    fetchCustomerData();
  }, []);

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'dd.MM.yyyy HH:mm');
  }

  const [columnDefs] = useState([
    { field: 'activity', sortable: true, filter: true },
    { field: 'date', sortable: true, filter: true, valueFormatter: params => formatDate(params.value) },
    { field: 'duration', sortable: true, filter: true },
    { field: 'customerName', sortable: true, filter: true },
    {
      cellRenderer: params => 
        <Button size="small" onClick={() => deleteTraining(params.data.links[0].href)}>
          Delete
        </Button>,
      width: 120
    }
  ]);

  const fetchTrainings = () => {
    fetch('https://traineeapp.azurewebsites.net/api/trainings')
      .then(response => {
        if (response.ok)
          return response.json();
        else
          throw new Error("Error in fetch: " + response.statusText);
      })
      .then(data => setTrainings(data.content))
      .catch(err => console.error(err));
  }


  const fetchCustomerData = () => {
    fetch('https://traineeapp.azurewebsites.net/api/customers', {method: "GET"})
      .then(response => {
        if (response.ok)
          return response.json();
        else
          throw new Error("Error in fetch: " + response.statusText);
      })
      .then(data => {
        const customerData = {};
        data.content.forEach(customer => {
          customerData[customer.id] = `${customer.firstname} ${customer.lastname}`;
        });
        setCustomers(customerData);
      })
      .catch(err => console.error(err));
  }

  const trainingData = trainings.map(training => ({
    ...training,
    customerName: customers[training.customerId],
  }));

  const deleteTraining = (url) => {
    if (window.confirm("Are you sure?")) {
      fetch(url, { method: 'DELETE' })
      .then(response => {
        if (response.ok)
          fetchTrainings();
        else
          throw new Error("Error in DELETE: " + response.statusText);
      })
      .catch(err => console.error(err))
      }
  }

  return (
    <div className="ag-theme-material" style={{ height: "500px", width: "100%" }}>
      <h1>Training</h1>
      <AgGridReact
        rowData={trainingData}
        columnDefs={columnDefs}
        pagination={true}
        paginationAutoPageSize={true}
      />
    </div>
  );
}

export default Training;