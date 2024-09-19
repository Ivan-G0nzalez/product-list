import { FC } from 'react';
import { Link } from 'react-router-dom';
import { toAbsoluteUrl } from '../../../../utils/utils';

const Error404: FC = () => {
  return (
    <div className="text-center">
      {/* Title */}
      <h1 className="font-bold text-4xl text-gray-900 mb-4">Oops!</h1>

      {/* Text */}
      <div className="font-semibold text-lg text-gray-500 mb-7">
        We can't find that page.
      </div>

      {/* Illustration */}
      <div className="mb-3">
        <img
          src={toAbsoluteUrl('mediafiles/auth/404-error.png')}
          className="max-w-full h-auto mb-6"
          alt="404 Error"
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

export default Error404;
