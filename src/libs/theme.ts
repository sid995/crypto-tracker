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

export function setTheme(theme: 'dark' | 'light' | 'system') {
  if (typeof window === 'undefined') return; // Guard for SSR

  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    localStorage.theme = 'dark';
  } else if (theme === 'light') {
    document.documentElement.classList.remove('dark');
    localStorage.theme = 'light';
  } else {
    localStorage.removeItem('theme');
    document.documentElement.classList.toggle(
      'dark',
      window.matchMedia('(prefers-color-scheme: dark)').matches
    );
  }
}
