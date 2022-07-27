interface Validate {
  isAuth: boolean;
  children: JSX.Element;
}

const PrivateRoutes: React.FC<Validate> = ({ isAuth, children }) => {
  return isAuth ? children : null;
};
export default PrivateRoutes;
