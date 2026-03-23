import { Routes, Route } from 'react-router-dom'
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import { PrivateRoute } from './components/PrivateRoute';
import { Toaster } from 'react-hot-toast';

export default function App() {

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}