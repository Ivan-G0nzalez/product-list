import { useState } from 'react';
import { toAbsoluteUrl } from '../../../utils/utils';
import { useAuth } from '../../../adapters/auth/Auth';
import { Link } from 'react-router-dom';

const AsideMenu = () => {
  const { currentUser, logout } = useAuth();
  const [open, setOpen] = useState<boolean>(false);

  const menuItems = [
    {
      id: 1,
      label: 'Products',
      icon: 'mediafiles/misc/Chart.png',
      to: '/apps/products-management/products',
    },
    {
      id: 2,
      label: 'Categories',
      icon: 'mediafiles/misc/Chart_fill.png',
      to: '/categories',
    },
    // Agrega más elementos aquí
  ];
  return (
    <div className="flex">
      <div
        className={`${
          open ? 'w-72' : 'w-20'
        } duration-300 h-screen p-5 pt-8 bg-indigo-600 relative`}
      >
        <img
          src={toAbsoluteUrl(`mediafiles/misc/control.png`)}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-2 border-indigo-600 rounded-full ${
            !open && 'rotate-180'
          }`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src={currentUser?.avatar}
            className={`cursor-pointer w-14 duration-500 rounded-full`}
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              e.currentTarget.src = '/mediafiles/avatars/blank.svg';
            }}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-300 ${
              !open && 'scale-0'
            }`}
          >
            {currentUser?.full_name}
          </h1>
        </div>
        <ul className="pt-6">
          <ul className="pt-6">
            {menuItems.map((item) => (
              <Link
                to={item.to}
                key={item.id}
                className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-100 text-sm items-center gap-x-4 
        mt-2 ${item.id === 1 && 'bg-light-white'}`}
              >
                <img src={toAbsoluteUrl(item.icon)} />
                <span
                  className={`${
                    !open && 'hidden'
                  } origin-left duration-200 text-lg`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
            <a
              onClick={logout}
              className=" flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-100 text-sm items-center gap-x-4 
        mt-2 ${item.id === 1 && 'bg-light-white"
            >
              <img src={toAbsoluteUrl(`mediafiles/misc/switch.png`)} />
              <span
                className={`${
                  !open && 'hidden'
                } origin-left duration-200 text-lg`}
              >
                Log Out
              </span>
            </a>
          </ul>
        </ul>
      </div>
    </div>
  );
};

export { AsideMenu };
