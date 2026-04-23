import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addNote } from '../utils/api';
import { useLanguage } from '../contexts/LanguageContext';

export default function AddNotePage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [form, setForm] = useState({ title: '', body: '' });

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { error } = await addNote(form);
    if (!error) navigate('/');
  }

  return (
    <div className="add-container">
      <h2>{t.addNoteTitle}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder={t.titlePlaceholder}
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="body"
          placeholder={t.bodyPlaceholder}
          value={form.body}
          onChange={handleChange}
          rows={8}
          required
        />
        <div className="form-actions">
          <button type="submit">{t.save}</button>
          <button type="button" onClick={() => navigate('/')}>{t.cancel}</button>
        </div>
      </form>
    </div>
  );
}
