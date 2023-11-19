import TokenIcon from "@mui/icons-material/Token";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import PersonIcon from "@mui/icons-material/Person";

import Celebrities from "../Pages/Celebrities";
import AddProduct from "../Pages/AddProduct";
import EditProduct from "../Pages/EditProduct";
import EditCelebrity from "../Pages/EditCelebrity";
import AddCelebrity from "../Pages/AddCelebrity";
import PurchaseHistory from "../Pages/AllCoupons";
import OrderRequests from "../Pages/OrderRequests";
import SingleRefund from "../Pages/singleRefund";
import SettingIcon from "../Assets/sidebarSettingsIcon.svg";
import SettingsPage from "../Pages/SettingsPage";
import EditOrder from "../Pages/editOrder";
import OrderTracking from "../Pages/OrderTracking";
import AddRecentVideo from "../Pages/AddRecentVideo";
import EditRecentVideo from "../Pages/EditRecentVideo";
import AddFAQs from "../Pages/AddFAQs";
import AllFAQs from "../Pages/AllFAQs";
import EditFAQ from "../Pages/EditFAQ";
import AllCoupon from "../Pages/AllCoupons";

const Abc = () => <></>;

export const routes = [
  {
    title: "Celebrities",
    name: "Celebrities",
    icon: <PersonIcon />,
    component: Celebrities,
  },

  {
    title: "Order Requests",
    name: "orders",
    icon: <StorefrontIcon />,
    component: OrderRequests,
  },
  {
    title: "All FAQs",
    name: "All_FAQs",
    icon: <TokenIcon />,
    component: AllFAQs,
  },
  {
    title: "Coupon",
    name: "Coupons",
    icon: <ShoppingBasketIcon />,
    component: AllCoupon,
  },
  {
    title: "Settings",
    name: "Settings",
    icon: <PhotoLibraryIcon />,
    component: SettingsPage,
  },
  {
    title: "Etag",
    name: "Etag",
    icon: <DocumentScannerIcon />,
    component: OrderTracking,
  },
  // {
  // 	title: "E-Tags",
  // 	name: "E-Tags",
  // 	icon: <QrCodeScannerIcon />,
  // 	component: Abc,
  // },
];

export const Editroutes = [
  {
    name: "edit_celebrity/:celebrityId",
    icon: <PersonIcon />,
    component: EditCelebrity,
  },
  {
    name: ":celebrityId/edit_video/:videoId",
    icon: <PersonIcon />,
    component: EditRecentVideo,
  },
  { name: "edit_order/:orderId", icon: <PersonIcon />, component: EditOrder },

  {
    name: "edit_faq/:id",
    icon: <StorefrontIcon />,
    component: EditFAQ,
  },
  {
    name: "Edit_Purchase History",
    icon: <ShoppingBasketIcon />,
    component: Abc,
  },

  {
    name: "editOrder/:orderId",
    icon: <ShoppingBasketIcon />,
    component: EditOrder,
  },
  // {
  //   name: "Edit_Order Tracking",
  //   icon: <DocumentScannerIcon />,
  //   component: Abc,
  // },
  // { name: "Edit_E_Tag", icon: <QrCodeScannerIcon />, component: Abc },
];

export const Addroutes = [
  { name: "Add_Celebrity", icon: <PersonIcon />, component: AddCelebrity },

  { name: "add_faq", icon: <PersonIcon />, component: AddFAQs },
  {
    name: "add_recent_video/:celebrityId",
    icon: <PersonIcon />,
    component: AddRecentVideo,
  },
  { name: "Add_Nft", icon: <TokenIcon />, component: AddProduct },
  // { name: "Add_Offer", icon: <LocalOfferIcon />, component: Abc },
  { name: "Add_Sell Request", icon: <StorefrontIcon />, component: Abc },
  {
    name: "Add_Purchase History",
    icon: <ShoppingBasketIcon />,
    component: Abc,
  },
];
