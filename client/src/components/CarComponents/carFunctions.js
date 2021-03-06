function whatsappMassege(dealerName, location){
  return ("Hi " +
  dealerName+
  ", I see you sell this car is BumbleBee: " +
  location +
  " can you bring me more details please?"
  );
}

export function sendWhatsAppToDealer(mobile, firstName) {
    const number = mobile ? mobile : "+9722520484";
  window.open(
    "https://wa.me/" +
      number +
      "?text=" +
      whatsappMassege(firstName, window.location.href)
  );
};

export function numberWithCommas(x) {
  if(x && x.length > 4){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return x ?? 0;
}

export function convertDateFormat(registrationDate) {
  const dateWithoutTime = registrationDate.substring(
    0,
    registrationDate.indexOf("T")
  );
  return dateWithoutTime.split("-");
}
export function CheckDisableStatus(values) {
  return !(
    values.company &&
    values.model &&
    values.year &&
    values.engine &&
    values.firstRegistrationDate
  );
}

export function checkCarsFields(values){
  
  return (
    (values.main &&
    values.image &&
    values.company &&
    values.model &&
    values.year &&
    values.engine &&
    values.km &&
    values.price &&
    values.fuel &&
    values.numberOfSeats &&
    values.doorCount &&
    values.gearbox &&
    values.firstRegistrationDate &&
    values.colour &&
    values.condition) ? true : false 
  );
}