import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx'
import Customerlist from './components/Customerlist';
import Training from './components/Training';


const router = createBrowserRouter([ 
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Customerlist />,
      },
      {
        path: "/customerlist",
        element: <Customerlist />,
      },
      {
        path: "/training",
        element: <Training />,
      },
    ]
    }
  ]);
  
  




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)