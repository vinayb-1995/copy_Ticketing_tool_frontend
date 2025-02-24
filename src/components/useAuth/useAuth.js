import { useSelector } from 'react-redux';

const useAuth = () => {
  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.auth.role);
  return { isAuthenticated: !!token, role };
};

export default useAuth;
