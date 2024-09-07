import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Employees from "./pages/Employees/Employees";
import CreateEmployee from "./pages/CreateEmployee/CreateEmployee";
import EditEmployee from "./pages/EditEmployee/EditEmployee";
import Login from "./pages/Login/Login";
import { useAtom } from "jotai";
import { isAuthenticatedAtom } from "./atoms/authAtom";

const MainRouter = () => {
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);

  const protectedRouter = createBrowserRouter([
    {
      path: "/",
      element: <Employees />,
    },
    {
      path: "/create",
      element: <CreateEmployee />,
    },
    {
      path: "/:employeeId",
      element: <EditEmployee />,
    },
  ]);

  const loginRouter = createBrowserRouter([
    {
      path: "*",
      element: <Login />,
    },
  ]);
  return (
    <RouterProvider router={isAuthenticated ? protectedRouter : loginRouter} />
  );
};

export default MainRouter;
