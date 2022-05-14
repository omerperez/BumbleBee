export default function calcNetPrice(type, price){
    const order = localStorage.getItem("usd-ils") * 12000;
    let tax = price + order;
    let laxuryTax = (localStorage.getItem("usd-ils") * (300000));
    let others = (localStorage.getItem("usd-ils") * (5000))
    if (type == "Gasoline" || type == "בנזין") {
      tax = tax * 1.14;
    } else if (type == "Hybrid") {
      tax = tax * 0.64;
    } else {
      tax = tax * 0.29;
    }
    if (price + tax > laxuryTax) {
      tax = tax + (price + tax - laxuryTax) * 0.2;
    }
    return tax + others;
}