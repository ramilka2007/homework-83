import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../features/users/usersSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Artists from '../Artists/Artists';

const Home = () => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (!user) {
      navigate('/register');
    }
  }, [user]);
  return (
    <div className="container">
      <Artists />
    </div>
  );
};

export default Home;
