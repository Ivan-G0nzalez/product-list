import { FC } from 'react';
import { Link } from 'react-router-dom';
import { toAbsoluteUrl } from '../../../../utils/utils';

const Error500: FC = () => {
  return (
    <div className="text-center">
      {/* Title */}
      <h1 className="font-bold text-5xl text-gray-900 mb-4">System Error</h1>

      {/* Text */}
      <div className="font-semibold text-lg text-gray-500 mb-7">
        Something went wrong! Please try again later.
      </div>

      {/* Illustration */}
      <div className="mb-11">
        <img
          src={toAbsoluteUrl('mediafiles/auth/500-error.png')}
          className="max-w-full h-auto mb-6"
          alt="500 Error"
        />
      </div>

      {/* Link */}
      <div className="mb-0">
        <Link
          to="/home"
          className="btn btn-primary px-4 py-2 text-sm font-semibold"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export { Error500 };
