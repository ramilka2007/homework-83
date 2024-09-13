import './App.css';
import Home from './containers/Home/Home';
import Register from './features/users/Register';
import Login from './features/users/Login';
import { Route, Routes } from 'react-router-dom';
import Albums from './containers/Albums/Albums';
import Tracks from './containers/Tracks/Tracks';
import Artists from './containers/Artists/Artists';

const App = () => {
  return (
    <>
      <header></header>
      <main className="mt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/albums" element={<Albums />} />
          <Route path="/tracks" element={<Tracks />} />
          <Route path="*" element={<h1>Not found</h1>} />
        </Routes>
      </main>
    </>
  );
};

export default App;
