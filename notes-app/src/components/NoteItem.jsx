import { Link } from 'react-router-dom';

export default function NoteItem({ note, onDelete, onArchiveToggle }) {
  const date = new Date(note.createdAt).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <div className="note-item">
      <Link to={`/notes/${note.id}`}>
        <h3>{note.title}</h3>
        <p className="note-date">{date}</p>
        <p className="note-body">{note.body}</p>
      </Link>
      <div className="note-actions">
        <button onClick={() => onArchiveToggle(note.id, note.archived)}>
          {note.archived ? 'Batal Arsip' : 'Arsip'}
        </button>
        <button className="btn-delete" onClick={() => onDelete(note.id)}>Hapus</button>
      </div>
    </div>
  );
}
