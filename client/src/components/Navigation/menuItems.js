import { costomImage, govilImage, dhlImage } from "../images/projectImages";

export const managerMenuItems = [
  {
    title: "Home Page",
    path: "/homepage",
    isDisabled: false,
  },
  {
    title: "About Us",
    path: "/about-us",
    isDisabled: false,
  },
  {
    title: "Mange Users",
    path: "/our-users",
    isDisabled: false,
  },
  {
    title: "Add New Car",
    path: "/create-car",
    isDisabled: false,
  },
  {
    title: "DHL Label form",
    image: dhlImage,
    path: "/dhl-label",
    isDisabled: false,
  },
  {
    title: "Customs Broker",
    image: costomImage,
    path: "/customs-broker",
    isDisabled: false,
  },
];

export const clientMenuItems = [
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

export const defaultTextStyle = { color: "white", marginLeft: "10px" };
export const currentPageStyle = {
  background: "#E2A025",
  color: "#363636",
  borderLeft: "solid 10px #BA8600",
};
    
