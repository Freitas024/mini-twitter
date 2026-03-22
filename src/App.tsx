import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import { PrivateRoute } from './components/PrivateRoute';
export default function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('Theme')
    if (savedTheme) {
      return savedTheme === 'dark'
    }
    return false;
  });

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  }

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
    }

    localStorage.setItem('Theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <Routes>
      <Route path="/home" element={<PrivateRoute><Home toggleTheme={toggleTheme} isDark={isDark} /></PrivateRoute>} />
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}