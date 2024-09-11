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
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header";

const MainRouter = () => {
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [isAuthLoading, setIsAuthLoading] = useAtom(authLoadingAtom);

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
    <BrowserRouter>
      <Header />
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/" element={<Employees />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/employees/create" element={<CreateEmployee />} />
            <Route path="/employees/:employeeId" element={<EditEmployee />} />
            <Route path="*" element={<NotFound />} />
          </>
        ) : (
          <Route path="*" element={<Login />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
