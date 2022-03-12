export const error403 = ({ currentTarget }) => {
  currentTarget.src = "/image_not_available.png";
  currentTarget.onerror = null;
};
