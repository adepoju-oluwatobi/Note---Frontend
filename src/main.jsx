import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from "./App";
import AddNote from "./pages/AddNotes";
import ShowNotes from "./pages/ShowNotes";
import Signup from "./pages/SignUp";
import EditNote from "./pages/EditNote";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/add_notes",
    element: <AddNote />,
  },
  {
    path: "/notes",
    element: <ShowNotes user_id={localStorage.getItem('user_id')} />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/edit_note/:noteId",
    element: <EditNote />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);