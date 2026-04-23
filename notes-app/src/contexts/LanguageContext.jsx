import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const translations = {
  id: {
    appName: '📝 Catatan Pribadi',
    logout: 'Keluar',
    changeTheme: 'Ubah Tema',
    loading: 'Memuat...',
    noteNotFound: 'Catatan tidak ditemukan.',
    search: 'Cari catatan...',
    newNote: '+ Catatan Baru',
    active: 'Aktif',
    archived: 'Diarsipkan',
    empty: 'Tidak ada catatan.',
    archive: 'Arsip',
    unarchive: 'Batal Arsip',
    delete: 'Hapus',
    back: 'Kembali',
    addNoteTitle: 'Catatan Baru',
    titlePlaceholder: 'Judul',
    bodyPlaceholder: 'Isi catatan...',
    save: 'Simpan',
    cancel: 'Batal',
    login: 'Masuk',
    register: 'Daftar',
    email: 'Email',
    password: 'Password',
    name: 'Nama',
    confirmPassword: 'Konfirmasi Password',
    loginError: 'Email atau password salah.',
    registerError: 'Registrasi gagal. Email mungkin sudah digunakan.',
    passwordMismatch: 'Password dan konfirmasi password tidak cocok.',
    noAccount: 'Belum punya akun?',
    hasAccount: 'Sudah punya akun?',
  },
  en: {
    appName: '📝 Personal Notes',
    logout: 'Logout',
    changeTheme: 'Change Theme',
    loading: 'Loading...',
    noteNotFound: 'Note not found.',
    search: 'Search notes...',
    newNote: '+ New Note',
    active: 'Active',
    archived: 'Archived',
    empty: 'No notes found.',
    archive: 'Archive',
    unarchive: 'Unarchive',
    delete: 'Delete',
    back: 'Back',
    addNoteTitle: 'New Note',
    titlePlaceholder: 'Title',
    bodyPlaceholder: 'Note content...',
    save: 'Save',
    cancel: 'Cancel',
    login: 'Login',
    register: 'Register',
    email: 'Email',
    password: 'Password',
    name: 'Name',
    confirmPassword: 'Confirm Password',
    loginError: 'Invalid email or password.',
    registerError: 'Registration failed. Email may already be in use.',
    passwordMismatch: 'Password and confirm password do not match.',
    noAccount: "Don't have an account?",
    hasAccount: 'Already have an account?',
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'id');

  function toggleLanguage() {
    setLanguage((prev) => {
      const next = prev === 'id' ? 'en' : 'id';
      localStorage.setItem('language', next);
      return next;
    });
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
