import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('http://127.0.0.1:8000/api/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        navigate('/login');
      } else {
        const errorMsg =
          (data.username && data.username[0]) ||
          (data.email && data.email[0]) ||
          data.detail ||
          'Registration failed.';
        setError(errorMsg);
      }
    } catch (err) {
      console.error('Network error:', err);
      setError('Could not connect to server.');
    }
  };

  return (
    <div className="container mt-5 col-md-6">
      <h2 className="mb-4">Register</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} className="card p-4 shadow">
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input name="username" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input name="email" type="email" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input name="password" type="password" className="form-control" onChange={handleChange} required />
        </div>
        <button className="btn btn-primary w-100">Register</button>
      </form>
    </div>
  );
}

export default Register;
