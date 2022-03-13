const authBackground = "/authImage.jpeg";
const carHeaderImage = "/car.png";
const costomImage = "/costoms.jpeg";
const govilImage = "/govil.jpeg";
const dhlImage = "/images/dhl-menu.jpeg";
const israelFlag = "/israel-icon.jpeg";
const noAvailable = "/noimages.png";
const bumblebeeLogo = "/our-logo.png";
const emptyProfileImage = "/cmera-ic.png";
const profileSuccess = "/profile-suc.png";
const clapsImage = "/claps.png";
const image403 = "/image_not_available.png";
const uploadMultipleSucces = "/success.png";
const uploadMultipleEmpty = "/Group 9.png";
const uploadMainSucces = "/success-1.png";
const uploadMainEmpty = "/Group 7.png";

const error403 = ({ currentTarget }) => {
  currentTarget.src = image403;
  currentTarget.onerror = null;
};

export {
  authBackground,
  carHeaderImage,
  costomImage,
  govilImage,
  dhlImage,
  israelFlag,
  noAvailable,
  bumblebeeLogo,
  emptyProfileImage,
  profileSuccess,
  clapsImage,
  image403,
  uploadMultipleSucces,
  uploadMultipleEmpty,
  uploadMainSucces,
  uploadMainEmpty,
  error403,
};
