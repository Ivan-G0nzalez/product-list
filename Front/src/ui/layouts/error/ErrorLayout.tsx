import { Outlet } from 'react-router-dom';
import { toAbsoluteUrl } from '../../../utils/utils';

const ErrorsLayout = () => {
  const backgroundImageUrl = `url(${toAbsoluteUrl('assets/media/bg7.jpg')})`;

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: backgroundImageUrl }}
    >
      <div className="flex flex-col items-center justify-center text-center p-10">
        <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-lg shadow-lg py-5">
          <div className="p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export { ErrorsLayout };
