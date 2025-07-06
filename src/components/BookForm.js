// src/components/BookForm.js
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function BookForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '', author: '', publication_date: '', genre: '', description: ''
  });

  useEffect(() => {
    if (isEdit) {
      fetch(`http://127.0.0.1:8000/api/books/${id}/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => setForm(data))
        .catch(err => console.error("Error fetching book:", err));
    }
  }, [id, token, isEdit]);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();

    const url = isEdit
      ? `http://127.0.0.1:8000/api/books/${id}/`
      : `http://127.0.0.1:8000/api/books/`;

    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        navigate('/');
      } else {
        const errorData = await res.json();
        console.error('Failed to save book:', errorData);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>{isEdit ? 'Edit' : 'Add'} Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Title</label>
          <input name="title" value={form.title} className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Author</label>
          <input name="author" value={form.author} className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Publication Date</label>
          <input name="publication_date" type="date" value={form.publication_date} className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Genre</label>
          <input name="genre" value={form.genre} className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <textarea name="description" value={form.description} className="form-control" onChange={handleChange} required />
        </div>
        <button className="btn btn-primary">{isEdit ? 'Update' : 'Add'} Book</button>
      </form>
    </div>
  );
}

export default BookForm;
