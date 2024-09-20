import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../adapters/auth/Auth';
import { FC } from 'react';

const HeaderUserMenu: FC = () => {
  const { currentUser, logout } = useAuth();
  const URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  return (
    <div className="bg-gray-600 rounded-lg py-4 w-68" data-kt-menu="true">
      <div className="flex items-center px-3">
        <div className="w-12 h-12 mr-5">
          <img
            alt="Logo"
            src={URL + currentUser?.avatar}
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              e.currentTarget.src = '/mediafiles/avatars/blank.svg';
            }}
            className="object-cover w-full h-full rounded-full"
          />
        </div>

        <div className="flex flex-col">
          <div className="font-bold text-lg text-white">
            {currentUser?.full_name}
          </div>
          <a href="#" className="text-gray-300 hover:text-primary text-sm">
            {currentUser?.email}
          </a>
        </div>
      </div>

      <div className="my-2 border-t border-gray-700"></div>

      {/* <div className="px-5">
        <a
          onClick={() => navigate('/profile')}
          className="text-white hover:text-primary"
        >
          Información de perfil
        </a>
      </div> */}

      <div className="px-5">
        <a
          onClick={logout}
          className="text-white hover:text-primary cursor-pointer"
        >
          Logout
        </a>
      </div>
    </div>
  );
};

export { HeaderUserMenu };
