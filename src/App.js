import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import BookList from './components/BookList';
import Login from './components/Login';
import Register from './components/Register';
import BookDetails from './components/BookDetails';
import BookForm from './components/BookForm';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/books/:id" element={<PrivateRoute><BookDetails /></PrivateRoute>} />
        <Route path="/add" element={<PrivateRoute><BookForm /></PrivateRoute>} />
        <Route path="/edit/:id" element={<PrivateRoute><BookForm /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
