import { Outlet } from 'react-router-dom';
import { toAbsoluteUrl } from '../../../utils/utils';

const AuthLayout = () => {
  return (
    <div className="flex flex-col lg:flex-row h-full min-h-screen">
      {/* Body */}
      <div className="flex flex-col lg:w-1/2 p-10 order-2 lg:order-1 justify-center items-center">
        <div className="w-full max-w-lg p-10">
          <Outlet />
        </div>
        <div className="flex justify-center mt-8">
          {/* Links */}
          <div className="flex font-semibold text-primary">
            <a href="#" className="px-5" target="_blank">
              Contact Us
            </a>
          </div>
        </div>
      </div>

      {/* Aside */}
      <div
        className="flex lg:w-1/2 bg-cover bg-center order-1 lg:order-2"
        style={{
          backgroundImage: `url(${toAbsoluteUrl(`mediafiles/auth/bg7.jpg`)})`,
        }}
      >
        <div className="flex flex-col justify-center items-center py-15 px-5 md:px-15 w-full bg-dark bg-opacity-75">
          {/* Logo */}
          <img
            className="w-36 md:w-1/2 xl:w-36 mb-10 lg:mb-20"
            src={toAbsoluteUrl(`mediafiles/misc/carrito-de-compras.png`)}
            alt="Logo"
          />

          {/* Title */}
          <h1 className="text-white text-4xl font-bold text-center mb-7">
            Nexus
          </h1>

          {/* Text */}
          <div className="text-white text-center space-y-2">
            <p>
              Este es un projecto el cual consume una API para mostrar productos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { AuthLayout };
