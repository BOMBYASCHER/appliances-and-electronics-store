import { useSelector } from 'react-redux'
import Login from './pages/Login';

const AuthenticatedRoute = ({ path, element: Component }) => {
  const { accessToken } = useSelector((state) => state.authentication);
  return (accessToken == null ? <Login /> : Component);
};

export default AuthenticatedRoute;
