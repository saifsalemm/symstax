import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Employees from "./pages/Employees/Employees";
import CreateEmployee from "./pages/CreateEmployee/CreateEmployee";
import EditEmployee from "./pages/EditEmployee/EditEmployee";
import Login from "./pages/Login/Login";
import { useAtom } from "jotai";
import { authLoadingAtom, isAuthenticatedAtom } from "./atoms/authAtom";
import Spinner from "./components/Spinner";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import NotFound from "./pages/404/NotFound";

const MainRouter = () => {
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [isAuthLoading, setIsAuthLoading] = useAtom(authLoadingAtom);

  const protectedRouter = createBrowserRouter([
    {
      path: "/",
      element: <Employees />,
    },
    {
      path: "/employees",
      element: <Employees />,
    },
    {
      path: "/employees/create",
      element: <CreateEmployee />,
    },
    {
      path: "/employees/:employeeId",
      element: <EditEmployee />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  const loginRouter = createBrowserRouter([
    {
      path: "*",
      element: <Login />,
    },
  ]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setIsAuthenticated(!!currentUser);
      setIsAuthLoading(false);
    });

    return () => unsubscribe();
  }, [setIsAuthenticated, setIsAuthLoading]);

  if (isAuthLoading) {
    return <Spinner />;
  }

  return (
    <RouterProvider router={isAuthenticated ? protectedRouter : loginRouter} />
  );
};

export default MainRouter;
