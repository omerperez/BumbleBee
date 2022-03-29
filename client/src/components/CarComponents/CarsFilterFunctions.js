export function handleChangeSelect(value, defaultList) {
  if (value === "All") {
    return defaultList;
  } else {
    return [value];
  }
};

export function handleChangeValueNumber(value, defaultNumberValue){
  if (value === "") {
    return defaultNumberValue;
  } else {
    return value;
  }
};