import TokenIcon from "@mui/icons-material/Token";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import PersonIcon from "@mui/icons-material/Person";
import Products from "../Pages/Products";
import Celebrities from "../Pages/Celebrities";
import AddProduct from "../Pages/AddProduct";
import EditProduct from "../Pages/EditProduct";
import EditCelebrity from "../Pages/EditCelebrity";
import AddCelebrity from "../Pages/AddCelebrity";
import PurchaseHistory from "../Pages/PurchaseHistroy";
import OrderRequests from "../Pages/OrderRequests";
import SingleRefund from "../Pages/singleRefund";
import SettingIcon from "../Assets/sidebarSettingsIcon.svg";
import SettingsPage from "../Pages/SettingsPage";
import EditOrder from "../Pages/editOrder";
import OrderTracking from "../Pages/OrderTracking";
import AddRecentVideo from "../Pages/AddRecentVideo";
import EditRecentVideo from "../Pages/EditRecentVideo";

const Abc = () => <></>;

export const routes = [
  {
    title: "Celebrities",
    name: "Celebrities",
    icon: <PersonIcon />,
    component: Celebrities,
  },
  {
    title: "NFTs",
    name: "NFTs",
    icon: <TokenIcon />,
    component: Products,
  },
  // { title: "Offers", name: "Offers", icon: <LocalOfferIcon />, component: Abc },
  {
    title: "Order Requests",
    name: "orders",
    icon: <StorefrontIcon />,
    component: OrderRequests,
  },
  {
    title: "Purchase History",
    name: "Purchase History",
    icon: <ShoppingBasketIcon />,
    component: PurchaseHistory,
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
  // { name: "Edit_Product", icon: <TokenIcon />, component: EditProduct },
  // { name: "Edit_Offer", icon: <LocalOfferIcon />, component: Abc },
  {
    name: "Edit_Sell_Request",
    icon: <StorefrontIcon />,
    component: SingleRefund,
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
