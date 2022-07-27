interface Validate {
  isAuth: boolean;
  children: JSX.Element;
}

const PublicRoutes: React.FC<Validate> = ({ isAuth, children }) => {
  return isAuth ? children : null;
};

export default PublicRoutes;
