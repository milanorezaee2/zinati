import { useEffect, useState } from 'react';

export interface HashRoute {
  path: string;
  params: URLSearchParams;
}

function readRoute(): HashRoute {
  const raw = window.location.hash.replace(/^#/, '') || '/';
  const [path, search = ''] = raw.split('?');
  return { path: path || '/', params: new URLSearchParams(search) };
}

export function useHashRoute(): HashRoute {
  const [route, setRoute] = useState(readRoute);

  useEffect(() => {
    const handleChange = () => setRoute(readRoute());
    window.addEventListener('hashchange', handleChange);
    return () => window.removeEventListener('hashchange', handleChange);
  }, []);

  return route;
}
