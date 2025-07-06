import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function BookDetails() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/books/${id}/`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setBook(data));
  }, [id, token]);

  const deleteBook = () => {
    fetch(`http://127.0.0.1:8000/books/${id}/`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => navigate('/'));
  };

  if (!book) return <div className="container mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Publication Date:</strong> {book.publication_date}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Description:</strong> {book.description}</p>
      <Link to={`/edit/${book.id}`} className="btn btn-warning me-2">Edit</Link>
      <button onClick={deleteBook} className="btn btn-danger">Delete</button>
    </div>
  );
}

export default BookDetails;
