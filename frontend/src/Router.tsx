import {
  createBrowserRouter, Navigate, RouterProvider, useParams,
} from 'react-router-dom';
import { useContext } from 'react';
import { Root, loader as gamesLoader } from './pages/Root/Root';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import Home from './pages/Home';
import About from './pages/About';
import Categories from './pages/Categories';
import Games from './pages/Games';
import Upload from './pages/Upload/Upload';
import Profile from './pages/Profile/Profile';
import Test from './pages/Test';

import { Game } from './sections/Game/Game';
import { Search } from './sections/Search/Search';
import { Login } from './pages/Authentication/Login/Login';
import { Register } from './pages/Authentication/Register/Register';
import { ForgotPassword } from './pages/Authentication/ForgotPassword/ForgotPassword';
import { AuthContext } from './utilities/auth/AuthContext';

function RequireAuth({ children, redirectTo }: any) {
  const { user } = useContext(AuthContext);
  if (user) {
    return children;
  }
  return <Navigate to={redirectTo} replace />;
}

function GuestOnly({ children, redirectTo }: any) {
  const { user } = useContext(AuthContext);
  if (!user) {
    return children;
  }
  return <Navigate to={redirectTo} replace />;
}

function GameCategoryWrapper() {
  const { category } = useParams();
  console.log(category);
  return <Games gameCategory={category} />;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: gamesLoader,
    id: 'root',
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/games',
        element: <Games />,
      },
      {
        path: '/games/categories',
        element: <Categories />,
      },
      {
        path: '/games/categories/:category',
        element: <GameCategoryWrapper />,
      },
      {
        path: '/games/:id',
        element: <Game />,
      },
      {
        path: '/login',
        element: (
          <GuestOnly redirectTo="/" required>
            <Login />
          </GuestOnly>
        ),
      },
      {
        path: '/register',
        element: (
          <GuestOnly redirectTo="/" required>
            <Register />
          </GuestOnly>
        ),
      },
      {
        path: '/forgot-password',
        element: (
          <GuestOnly redirectTo="/" required>
            <ForgotPassword />
          </GuestOnly>
        ),
      },
      {
        path: '/profile',
        element: (
          <RequireAuth redirectTo="/login" required>
            <Profile />
          </RequireAuth>
        ),
      },
      {
        path: '/upload',
        element: (
          <RequireAuth redirectTo="/login" required>
            <Upload />
          </RequireAuth>
        ),
      },
      {
        path: '/search/:query',
        element: <Search />,
      },
      {
        path: '/test',
        element: <Test />,
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
]);

export function Router() {
  return (
    <RouterProvider router={router} fallbackElement={<Home />} />
  );
}
