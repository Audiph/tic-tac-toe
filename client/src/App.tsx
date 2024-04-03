import React from 'react';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Landing from './pages/Landing';
import HomeLayout from './pages/HomeLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <h1>Error</h1>,
    children: [
      {
        index: true,
        element: <Landing />,
      },
    ],
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
