import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/Root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
