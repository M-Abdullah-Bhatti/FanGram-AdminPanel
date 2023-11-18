import TokenIcon from "@mui/icons-material/Token";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import PersonIcon from "@mui/icons-material/Person";
import Products from "../Pages/Products";
import Celebrities from "../Pages/Celebrities";
import AddProduct from "../Pages/AddProduct";
import EditProduct from "../Pages/EditProduct";
import EditUser from "../Pages/EditUser";
import AddCelebrity from "../Pages/AddCelebrity";
import PurchaseHistory from "../Pages/PurchaseHistroy";
import RefundRequests from "../Pages/RefundRequests";
import SingleRefund from "../Pages/singleRefund";
import SettingIcon from "../Assets/sidebarSettingsIcon.svg";
import SettingsPage from "../Pages/SettingsPage";
import EditOrder from "../Pages/editOrder";
import OrderTracking from "../Pages/OrderTracking";

const Abc = () => <></>;

export const routes = [
	{ title: "Celebrities", name: "Celebrities", icon: <PersonIcon />, component: Celebrities },
	{
		title: "NFTs",
		name: "NFTs",
		icon: <TokenIcon />,
		component: Products,
	},
	// { title: "Offers", name: "Offers", icon: <LocalOfferIcon />, component: Abc },
	{
		title: "Sale Requests",
		name: "Sale Requests",
		icon: <StorefrontIcon />,
		component: RefundRequests,
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
	// { name: "Edit_Admin", icon: <PersonIcon />, component: EditUser },
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
	{ name: "Add_Nft", icon: <TokenIcon />, component: AddProduct },
	// { name: "Add_Offer", icon: <LocalOfferIcon />, component: Abc },
	{ name: "Add_Sell Request", icon: <StorefrontIcon />, component: Abc },
	{
		name: "Add_Purchase History",
		icon: <ShoppingBasketIcon />,
		component: Abc,
	},
];
