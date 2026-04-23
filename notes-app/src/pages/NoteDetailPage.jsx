import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { useLanguage } from '../contexts/LanguageContext';

export default function NoteDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNote(id).then(({ error, data }) => {
      if (!error) setNote(data);
      setLoading(false);
    });
  }, [id]);

  async function handleDelete() {
    await deleteNote(id);
    navigate('/');
  }

  async function handleArchiveToggle() {
    if (note.archived) await unarchiveNote(id);
    else await archiveNote(id);
    navigate('/');
  }

  if (loading) return <LoadingSpinner />;
  if (!note) return <p>{t.noteNotFound}</p>;

  const date = new Date(note.createdAt).toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <div className="detail-container">
      <h2>{note.title}</h2>
      <p className="note-date">{date}</p>
      <p className="detail-body">{note.body}</p>
      <div className="note-actions">
        <button onClick={handleArchiveToggle}>
          {note.archived ? t.unarchive : t.archive}
        </button>
        <button className="btn-delete" onClick={handleDelete}>{t.delete}</button>
        <button onClick={() => navigate('/')}>{t.back}</button>
      </div>
    </div>
  );
}
