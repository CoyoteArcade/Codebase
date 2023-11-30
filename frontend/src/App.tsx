import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { Router } from './Router';
import { theme } from './theme';
import { AuthContext } from './utilities/auth/AuthContext';
import { useState } from 'react';

import './global.css';

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{user, setUser} as any}>
    <MantineProvider defaultColorScheme="light" theme={theme}>
      <Router />
    </MantineProvider>
    </AuthContext.Provider>
  );
}
