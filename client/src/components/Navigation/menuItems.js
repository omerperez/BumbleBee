import { costomImage, dhlImage } from "../images/projectImages";

const managerMenuItems = [
  {
    title: "Home Page",
    path: "/homepage",
    image: "home.png",
    isDisabled: false,
  },
  {
    title: "About Us",
    path: "/about-us",
    image: "about.png",
    isDisabled: false,
  },
  {
    title: "Mange Users",
    path: "/our-users",
    image: "members.png",
    isDisabled: false,
  },
  {
    title: "My Cars",
    path: "/mycars",
    image: "mycars.png",
    isDisabled: false,
  },
  {
    title: "Add New Car",
    path: "/create-car",
    image: "car.png",
    isDisabled: false,
  },
  {
    title: "DHL Label form",
    image: "dhl.png",
    path: "/dhl-label",
    isDisabled: false,
  },
  {
    title: "Customs Broker",
    image: "broker.png",
    path: "/customs-broker",
    isDisabled: false,
  },
];

const clientMenuItems = [
  {
    title: "Home Page",
    path: "/homepage",
    isDisabled: false,
    role: "1",
  },
  {
    title: "About Us",
    path: "/about-us",
    isDisabled: false,
    role: "1",
  },
  {
    title: "DHL Label form",
    image: dhlImage,
    path: "/dhl-label",
    isDisabled: false,
    role: "1",
  },
  {
    title: "Customs Broker",
    image: costomImage,
    path: "/customs-broker",
    isDisabled: false,
    role: "1",
  },
];

export { managerMenuItems, clientMenuItems };

    
