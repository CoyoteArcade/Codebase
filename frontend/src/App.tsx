import { useEffect, useState } from 'react';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';
import '@mantine/notifications/styles.css';

import { Router } from './Router';
import { AuthContext } from './utilities/auth/AuthContext';
import { theme } from './theme';
import './global.css';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('coyoteArcadeUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser } as any}>
      <MantineProvider defaultColorScheme="light" theme={theme}>
        <Notifications />
        <Router />
      </MantineProvider>
    </AuthContext.Provider>
  );
}
