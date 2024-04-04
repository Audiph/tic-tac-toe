import React from 'react';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Landing from './pages/Landing';
import HomeLayout from './pages/HomeLayout';
import Game from '@/pages/Game';
import Error from '@/pages/Error';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'game/:id',
        element: <Game />,
      },
    ],
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
