import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";

import App from "./App.jsx";
import Landing from "./Pages/Landing";
import List from "./Pages/ListProblems";
import Problems from "./Pages/Problem";
import AddProblem from "./Pages/AddProblem";
import DeleteProblem from "./Pages/DeleteProblem";
import EditProblem from "./Pages/EditProblem";

// je children paaye aa OUTLET deke aao
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/content/list",
        element: <List />,
      },
      {
        path: "/content/problems/",
        element: <Problems />,
      },
      {
        path: "/content/addProblem",
        element: <AddProblem />,
      },
      {
        path: "/content/deleteProblem",
        element: <DeleteProblem />,
      },
      {
        path: "/content/editProblem",
        element: <EditProblem />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <RouterProvider router={router} />
  </ThemeProvider>
);
