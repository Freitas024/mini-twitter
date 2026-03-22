import { Routes, Route } from 'react-router-dom'
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import { PrivateRoute } from './components/PrivateRoute';
export default function App() {

  return (
    <Routes>
      <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}