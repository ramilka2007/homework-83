import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../features/users/usersSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Home = () => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (!user) {
      navigate('/register');
    }
  }, [user]);
  return null;
};

export default Home;
