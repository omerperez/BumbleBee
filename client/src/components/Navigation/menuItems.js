import { costomImage, dhlImage } from "../images/projectImages";

const topbarMenuItems = [
  {
    path: "/my-profile",
    image: "profile",
  },
  // {
  //   path: "/",
  //   image: "notification_on",
  // },
  {
    path: "/",
    image: "notification",
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
  // {
  //   path: "/",
  //   image: "notification_on",
  // },
  {
    path: "/",
    image: "notification",
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
    title: "Dashboard Statistics",
    path: "/manager-dashboard",
    image: "user.png",
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
    title: "Order Status",
    path: "/order-status",
    image: "user.png",
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

export {
  managerMenuItems,
  clientMenuItems,
  topbarMenuItems,
  topbarMenuItemsForDealer,
  dealerMenuItems,
  topbarMenuItemsForAdmin,
};

    
