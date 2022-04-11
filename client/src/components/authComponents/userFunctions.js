export function checkRegisterFields(
  userValue
) {
  return userValue.firstName &&
    userValue.lastName &&
    userValue.email &&
    userValue.mobile &&
    userValue.password &&
    userValue.image
    ? false
    : true;
}

export function ImageHandler(e, setState){
  const reader = new FileReader();
  reader.onload = () => {
    if (reader.readyState === 2) {
      setState(reader.result);
    }
  };
  reader.readAsDataURL(e.target.files[0]);
};