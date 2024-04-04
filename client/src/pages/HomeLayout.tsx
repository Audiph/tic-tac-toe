import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import Background from '../components/ui/background';

const HomeLayout = () => {
  return (
    <Fragment>
      <Background />
      <Outlet />
    </Fragment>
  );
};

export default HomeLayout;
