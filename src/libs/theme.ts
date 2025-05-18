'use client';

export function initializeTheme() {
  if (typeof window !== 'undefined') {
    document.documentElement.classList.toggle(
      'dark',
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
  }
}

export function setTheme(theme: 'dark' | 'light') {
  try {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  } catch (e) {
    console.error('Error setting theme:', e);
  }
}
