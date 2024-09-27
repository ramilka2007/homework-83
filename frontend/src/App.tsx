import './App.css';
import Home from './containers/Home/Home';
import Register from './features/users/Register';
import Login from './features/users/Login';
import { Route, Routes } from 'react-router-dom';
import Albums from './containers/Albums/Albums';
import Tracks from './containers/Tracks/Tracks';
import TracksHistory from './containers/TrackHistories/TracksHistory';
import Toolbar from './UI/Toolbar/Toolbar';
import TrackForm from './containers/Tracks/TrackForm';
import ArtistForm from './containers/Artists/ArtistForm';
import AlbumForm from './containers/Albums/AlbumForm';
import ProtectedRoute from './UI/ProtectedRoute/ProtectedRoute';
import { selectUser } from './features/users/usersSlice';
import { useAppSelector } from './app/hooks';

const App = () => {
  const user = useAppSelector(selectUser);

  return (
    <>
      <header>
        <Toolbar />
      </header>
      <main className="mt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/albums" element={<Albums />} />
          <Route path="/tracks" element={<Tracks />} />
          <Route path="/tracks-history" element={<TracksHistory />} />
          <Route
            path="/add-new-artist"
            element={
              <ProtectedRoute isAllowed={user && user.role === 'admin'}>
                <ArtistForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-new-album"
            element={
              <ProtectedRoute isAllowed={user && user.role === 'admin'}>
                <AlbumForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-new-track"
            element={
              <ProtectedRoute isAllowed={user && user.role === 'admin'}>
                <TrackForm />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<h1>Not found</h1>} />
        </Routes>
      </main>
    </>
  );
};

export default App;
