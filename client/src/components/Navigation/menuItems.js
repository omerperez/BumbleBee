import { costomImage, dhlImage, govilImage } from "../images/projectImages";

const topbarMenuItems = [
  {
    path: "/my-profile",
    image: "profile",
  },
];

const topbarMenuItemsForDealer = [
  {
    path: "/my-profile",
    image: "profile",
  },
  {
    path: "/create-car",
    image: "plus",
  },
];

const topbarMenuItemsForAdmin = [
  {
    path: "/my-profile",
    image: "profile",
  },
  {
    path: "/create-car",
    image: "plus",
  },
];


const managerMenuItems = [
  {
    title: "Home Page",
    path: "/homepage",
    image: "home.png",
    isDisabled: false,
  },
  {
    title: "Mange Users",
    path: "/our-users",
    image: "members.png",
    isDisabled: false,
  },
  {
    title: "My Profile",
    image: costomImage,
    path: "/my-profile",
    image: "profile.png",
    isDisabled: false,
  },
  {
    title: "Dashboard Statistics",
    path: "/manager-dashboard",
    image: "graph.png",
    isDisabled: false,
  },
];

const dealerMenuItems = [
  {
    title: "Home Page",
    path: "/homepage",
    image: "home.png",
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
    title: "My Profile",
    image: costomImage,
    path: "/my-profile",
    image: "profile.png",
    isDisabled: false,
  },
  {
    title: "Order Status",
    path: "/order-status",
    image: "mail.png",
    isDisabled: false,
  },
];

const clientMenuItems = [
  {
    title: "Home Page",
    path: "/homepage",
    image: "home.png",
    isDisabled: false,
    role: "1",
  },
  {
    title: "My Profile",
    image: costomImage,
    path: "/my-profile",
    image: "profile.png",
    isDisabled: false,
  },
  {
    title: "My Favorite",
    image: costomImage,
    path: "/my-favorite",
    image: "fav.png",
    isDisabled: false,
    role: "1",
  },
  {
    title: "About Us",
    path: "/about-us",
    image: "about.png",
    isDisabled: false,
    role: "1",
  },
  {
    title: "DHL Label form",
    image: dhlImage,
    path: "/dhl-label",
    image: "dhl.png",
    isDisabled: false,
    role: "1",
  },
  {
    title: "Gov IL",
    path: "/govil",
    image: "gov.png",
    isDisabled: false,
    role: "1",
  },
  {
    title: "Customs Broker",
    image: costomImage,
    path: "/customs-broker",
    image: "broker.png",
    isDisabled: false,
    role: "1",
  },
];

export {
  managerMenuItems,
  clientMenuItems,
  topbarMenuItems,
  topbarMenuItemsForDealer,
  dealerMenuItems,
  topbarMenuItemsForAdmin,
};

    
