import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Loading from '../components/ui/loading';
import Background from '../components/ui/background';

const HomeLayout = () => {
  const { loading } = useSelector((state: RootState) => state.util);
  return (
    <Fragment>
      {loading && <Loading size="16" />}
      <Background />
      <Outlet />
    </Fragment>
  );
};

export default HomeLayout;
