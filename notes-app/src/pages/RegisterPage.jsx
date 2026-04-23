import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../utils/api';
import { useLanguage } from '../contexts/LanguageContext';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) {
      setError(t.passwordMismatch);
      return;
    }
    const { error: err } = await register({ name: form.name, email: form.email, password: form.password });
    if (err) {
      setError(t.registerError);
      return;
    }
    navigate('/login');
  }

  return (
    <div className="auth-container">
      <h2>{t.register}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder={t.name}
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder={t.email}
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder={t.password}
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder={t.confirmPassword}
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">{t.register}</button>
      </form>
      <p>
        {t.hasAccount} <Link to="/login">{t.login}</Link>
      </p>
    </div>
  );
}
