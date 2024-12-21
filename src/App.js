import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm/index';
import Home from "./components/Home/index";
import Profile from './components/Profile';
import Popular from './components/Popular';
import MovieDetails from './components/MovieDetails';
import SearchRoute from './components/SearchRoute';
import NotFound from './components/NotFound';

import './App.css';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/" element={<Home />} />
      <Route path="/account" element={<Profile />} />
      <Route path="/popular" element={<Popular />} />
      <Route path="/movies/:id" element={<MovieDetails />} />
      <Route path="/search" element={<SearchRoute />} />
      <Route path="/not-found" element={<NotFound />} />
      {/* Redirect all unmatched routes to the not-found page */}
      <Route path="*" element={<Navigate to="/not-found" replace />} />
    </Routes>
  </BrowserRouter>
);

export default App;


