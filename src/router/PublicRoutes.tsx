import { Navigate } from "react-router-dom";

interface Validate {
  isAuth: boolean;
  // children: JSX.Element[] | JSX.Element;
  children: JSX.Element;
}

const PublicRoutes: React.FC<Validate> = ({ isAuth, children }) => {
  return isAuth ? children : <Navigate to="/" />;
};

export default PublicRoutes;
