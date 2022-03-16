export function checkRegisterFields(
  firstName,
  lastName,
  email,
  mobile,
  password,
  file
) {
  return firstName && lastName && email && mobile && password && file
    ? false
    : true;
}