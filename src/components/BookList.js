import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function BookList() {
  const { token } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/books/', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!res.ok) {
          const errorData = await res.json();
          console.error('Failed to fetch books:', errorData);
          setError('Unable to load books.');
          return;
        }

        const data = await res.json();
        setBooks(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Network error.');
      }
    };

    if (token) fetchBooks();
  }, [token]);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between mb-3">
        <h2>Books</h2>
        <Link to="/add" className="btn btn-primary">Add Book</Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Author</th>
              <th>Publication Date</th>
              <th>Genre</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {books.length > 0 ? (
              books.map((book, index) => (
                <tr key={book.id} style={{ backgroundColor: 'whitesmoke' }}>
                  <td>{index + 1}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.publication_date}</td>
                  <td>{book.genre}</td>
                  <td>
                    <Link to={`/books/${book.id}`} className="btn btn-sm btn-success">
                      Details
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">No books available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BookList;
