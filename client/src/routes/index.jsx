import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import PrivateRoute from "../components/private-route";
import App from "../App";
import Notfound from "../pages/notfound"
import Register from "../pages/register";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index:true,
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "home",
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: <Home />,
          }
        ],
      },
      {
        path: "*",
        element: <Notfound />,
      },
    ],
  },
]);

export default routes;
