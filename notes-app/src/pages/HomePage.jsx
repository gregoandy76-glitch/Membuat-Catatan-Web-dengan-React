import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getNotes, getArchivedNotes, deleteNote, archiveNote, unarchiveNote } from '../utils/api';
import NoteItem from '../components/NoteItem';
import LoadingSpinner from '../components/LoadingSpinner';
import { useLanguage } from '../contexts/LanguageContext';

export default function HomePage() {
  const { t } = useLanguage();
  const [notes, setNotes] = useState([]);
  const [archived, setArchived] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('active');

  async function fetchNotes() {
    setLoading(true);
    const [activeRes, archivedRes] = await Promise.all([getNotes(), getArchivedNotes()]);
    if (!activeRes.error) setNotes(activeRes.data);
    if (!archivedRes.error) setArchived(archivedRes.data);
    setLoading(false);
  }

  useEffect(() => { fetchNotes(); }, []);

  async function handleDelete(id) {
    await deleteNote(id);
    fetchNotes();
  }

  async function handleArchiveToggle(id, isArchived) {
    if (isArchived) await unarchiveNote(id);
    else await archiveNote(id);
    fetchNotes();
  }

  const displayed = (tab === 'active' ? notes : archived).filter((n) =>
    n.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-container">
      <div className="home-header">
        <input
          type="text"
          placeholder={t.search}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <Link to="/notes/new" className="btn-add">{t.newNote}</Link>
      </div>

      <div className="tabs">
        <button className={tab === 'active' ? 'active' : ''} onClick={() => setTab('active')}>
          {t.active}
        </button>
        <button className={tab === 'archived' ? 'active' : ''} onClick={() => setTab('archived')}>
          {t.archived}
        </button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : displayed.length === 0 ? (
        <p className="empty">{t.empty}</p>
      ) : (
        <div className="notes-grid">
          {displayed.map((note) => (
            <NoteItem
              key={note.id}
              note={{ ...note, archived: tab === 'archived' }}
              onDelete={handleDelete}
              onArchiveToggle={handleArchiveToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}
