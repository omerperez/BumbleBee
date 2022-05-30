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

export function checkLanguageInput(e, setError) {
  var english = /^[A-Za-z0-9]*$/;
  if (!english.test(e.target.value))
    return setError("Please Enter English Letters");
  return setError("");
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

export function ValidateEmail(mail) {
  if(mail.length < 8){
    return false
  } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
}