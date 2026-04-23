import { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../utils/api';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

export default function LoginPage() {
  const { onLoginSuccess } = useAuth();
  const { t } = useLanguage();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const { error: err, data } = await login(form);
    if (err) {
      setError(t.loginError);
      return;
    }
    onLoginSuccess(data.accessToken);
  }

  return (
    <div className="auth-container">
      <h2>{t.login}</h2>
      <form onSubmit={handleSubmit}>
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
        {error && <p className="error">{error}</p>}
        <button type="submit">{t.login}</button>
      </form>
      <p>
        {t.noAccount} <Link to="/register">{t.register}</Link>
      </p>
    </div>
  );
}
