import { Navigate } from "react-router-dom";

interface Validate {
  isAuth: boolean;
  children: JSX.Element;
}

const PrivateRoutes: React.FC<Validate> = ({ isAuth, children }) => {
  return isAuth ? children : <Navigate to="/login" />;
};
export default PrivateRoutes;
