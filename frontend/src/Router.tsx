import { createBrowserRouter, Navigate, RouterProvider, useParams } from 'react-router-dom';
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
import { Login } from './sections/Login/Login';
import { Register } from './sections/Login/Register/Register';
import { ForgotPassword } from './sections/Login/ForgotPassword/ForgotPassword';
import { useContext } from 'react';
import { AuthContext } from './utilities/auth/AuthContext';

function RequireAuth({ children, redirectTo }: any) {
  const { user } = useContext(AuthContext);
  if (user) {
    return children;
  } else {
    return <Navigate to={redirectTo} replace={true} />;
  }
}

function GuestOnly({ children, redirectTo }: any) {
  const { user } = useContext(AuthContext);
  if (!user) {
    return children;
  } else {
    return <Navigate to={redirectTo} replace={true} />;
  }
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
          <GuestOnly redirectTo="/" required={true}>
            <Login />
          </GuestOnly>
        ),
      },
      {
        path: '/forgot-password',
        element: (
          <GuestOnly redirectTo="/" required={true}>
            <ForgotPassword />
          </GuestOnly>
        ),
      },
      {
        path: '/profile',
        element: (
          <RequireAuth redirectTo="/login" required={true}>
            <Profile />
          </RequireAuth>
        ),
      },
      {
        path: '/register',
        element: (
          <GuestOnly redirectTo="/" required={true}>
            <Register />
          </GuestOnly>
        ),
      },
      {
        path: '/upload',
        element: (
          <RequireAuth redirectTo="/login" required={true}>
            <Upload />
          </RequireAuth>
        ),
      },
      {
        path: '/search/:query',
        element: <Search />,
      },
      {
        path: '/upload',
        element: <Upload />,
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
  return <RouterProvider router={router} fallbackElement={<Home />} />;
}
