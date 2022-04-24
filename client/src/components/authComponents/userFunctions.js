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

export function InitDefauleUserProperties(values, user) {
  values._id = user._id;
  values.rating = user.rating ?? 0;
  values.ratingCount = user.ratingCount ?? 0;
  values.street = user.street ?? "Yeziat Eurpa";
  values.city = user.city ?? "Herzliya";
  values.country = user.country ?? "Israel";
  values.activityDaysTime = user.activityDaysTime ?? null;
}