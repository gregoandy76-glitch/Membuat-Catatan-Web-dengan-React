import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

export default function Navbar() {
  const { authedUser, onLogout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">{t.appName}</Link>
      <div className="nav-right">
        <button className="btn-theme" onClick={toggleTheme} title={t.changeTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        <button className="btn-lang" onClick={toggleLanguage} title={language === 'id' ? 'Switch to English' : 'Ganti ke Indonesia'}>
          {language === 'id' ? '🇮🇩 ID' : '🇺🇸 EN'}
        </button>
        {authedUser && (
          <>
            <span>{authedUser.name}</span>
            <button onClick={onLogout}>{t.logout}</button>
          </>
        )}
      </div>
    </nav>
  );
}
