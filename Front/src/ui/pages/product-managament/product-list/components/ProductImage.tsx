export const ProductImage = ({ img = '' }) => {
  return (
    <img
      className="rounded-sm w-full"
      src={img ? img : '/mediafiles/misc/no-image.jpg'}
    />
  );
};
