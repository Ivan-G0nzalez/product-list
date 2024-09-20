import { Outlet } from 'react-router-dom';
import { AsideMenu } from '../aside/AsideMenu';

const Wrapper = () => {
  return (
    <div className="flex">
      <AsideMenu />
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
};

export { Wrapper };
