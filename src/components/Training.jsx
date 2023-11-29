import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import dayjs from "dayjs";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

function Training() {
  const [trainings, setTrainings] = useState([]);

  const [columnDefs] = useState([
    { field: 'activity', sortable: true, filter: true },
    { 
      field: 'date', 
      sortable: true, 
      filter: true, 
      valueFormatter: (params) => dayjs(params.value).format("DD.MM.YYYY hh:MM")
    },
    { field: 'duration', sortable: true, filter: true },
    {
      headerName: "Customer",
      valueGetter: params =>
        { 
          if (params.data.customer !== null) 
            return params.data.customer.firstname + " " + params.data.customer.lastname
          else
            return "Customer not found" 
        } ,
      sortable: true,
      filter: true,
    },

    {
      headerName: "",
      field: 'id',
      cellRenderer: (params) => (
        <IconButton size="small" onClick={() => deleteTraining(params.value)}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      ),
      width: 120
    }
  ]);

  const getTrainings = () => {
    fetch('https://traineeapp.azurewebsites.net/gettrainings')
      .then(response => {
        if (response.ok)
          return response.json();
        else
          throw new Error("Error in fetch: " + response.statusText);
      })
      .then(data => {
        setTrainings(data);
      })
      .catch(err => console.error(err));
  };


  useEffect(() => {
    getTrainings();

  }, []);

const deleteTraining = (id) => {
  if (window.confirm("Are you sure?")) {
    fetch(`https://traineeapp.azurewebsites.net/api/trainings/${id}`, { method: 'DELETE' })
      .then(response => {
        if (response.ok)
          getTrainings();
        else
          throw new Error("Error in DELETE: " + response.statusText);
      })
      .catch(err => console.error(err));
  }
}

  return (
    <div className="ag-theme-material" style={{ height: "500px", width: "100%" }}>
      <h1>Training</h1>
      <AgGridReact
        rowData={trainings}
        columnDefs={columnDefs}
        pagination={true}
        paginationAutoPageSize={true}
      />
    </div>
  );
}

export default Training;