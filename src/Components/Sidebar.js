import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Tooltip from "@material-ui/core/Tooltip";

import {
  KeyboardBackspace,
  Fastfood,
  SupervisorAccount,
} from "@material-ui/icons";

import BookmarksIcon from "@material-ui/icons/Bookmarks";
import AssignmentIcon from "@material-ui/icons/Assignment";
import CommentIcon from "@material-ui/icons/Comment";
import uni_icon from "../Assets/uni.png";
import admin from "../Assets/admin.svg";
import { getAuth, signOut } from "firebase/auth";
import { logout } from "../utils/auth";
import { routes } from "../Routes/RoutesName";
import logo from '../Assets/riwa-admin-logo.svg'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  listItemText: {
    fontFamily: "Poppins",
  },
}));

export default function Sidebar({ Loading, Permissions }) {


  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();


  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  let newRoutes;
  if (routes) {
    // console.log(Permissions, routes)
    // newRoutes = routes.filter(item => Permissions.includes(item.title) && item)
    // // console.log(a)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        elevation={0}
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}>
        <Toolbar>
          <IconButton
            // color='#fff'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}>
            <MenuIcon style={{ color: "black" }} />
          </IconButton>
          <div className='sidebar-head'>
            <img src={logo} style={{ width: '70px' }} />
          </div>
        </Toolbar>
      </AppBar>
      {!Loading && (
        <Drawer
          variant='permanent'
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}>
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose} sx={{
              "& .MuiIconButton-edgeStart": {
                marginLeft: '-30px'
              },
              "& .MuiSvgIcon-root": {
                width: '100px',
              }

            }}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />

          <List style={{ minHeight: "90vh" }}>
            {routes.map((route, ind) => {
              return (
                <Link
                  // Permissions.includes("Admins") && (
                  onClick={handleDrawerClose}
                  className='links'
                  to={"/dashboard/" + route.name.toLowerCase()}>
                  <Tooltip
                    title={route.title}
                    disableHoverListener={open}
                    placement='bottom-end'>
                    <ListItem style={{ marginTop: "15px" }} button>
                      <ListItemIcon>{route.icon}</ListItemIcon>
                      <p className='list-item'>{route.name}</p>
                    </ListItem>
                  </Tooltip>
                </Link>
              );
              // )
            })}

            {/* {Permissions.includes("Admins") && (
              <Link
                onClick={handleDrawerClose}
                className='links'
                to='/dashboard/users'>
                <Tooltip title='Admins' disableHoverListener={open}>
                  <ListItem style={{ marginTop: "15px" }} button>
                    <ListItemIcon>
                      <img src={admin} />
                    </ListItemIcon>
                    <p className='list-item'>Admins</p>
                  </ListItem>
                </Tooltip>
              </Link>
            )}
            {Permissions.includes("FAQ’s") && (
              <Link
                onClick={handleDrawerClose}
                className='links'
                to='/dashboard/FAQ’s'>
                <Tooltip title='FAQs' disableHoverListener={open}>
                  <ListItem style={{ marginTop: "15px" }} button>
                    <ListItemIcon>
                      <CommentIcon />
                    </ListItemIcon>
                    <p className='list-item'>FAQs</p>
                  </ListItem>
                </Tooltip>
              </Link>
            )}{" "}

            {Permissions.includes("Blogs") && (
              <Link
                onClick={handleDrawerClose}
                className='links'
                to='/dashboard/blogs'>
                <Tooltip title='Blogs' disableHoverListener={open}>
                  <ListItem style={{ marginTop: "15px" }} button>
                    <ListItemIcon>
                      <AssignmentIcon />
                    </ListItemIcon>
                    <p className='list-item'>Blogs</p>
                  </ListItem>
                </Tooltip>
              </Link>
            )}
            {Permissions.includes("Suggestions") && (
              <Link
                onClick={handleDrawerClose}
                className='links'
                to='/dashboard/suggestions'>
                <Tooltip title='Suggestions' disableHoverListener={open}>
                  <ListItem style={{ marginTop: "15px" }} button>
                    <ListItemIcon>
                      <BookmarksIcon />
                    </ListItemIcon>
                    <p className='list-item'>Suggestions</p>
                  </ListItem>
                </Tooltip>
              </Link>
            )}
            {Permissions.includes("Universities") && (
              <Link
                onClick={handleDrawerClose}
                className='links'
                to='/dashboard/universities'>
                <Tooltip title='Universities' disableHoverListener={open}>
                  <ListItem style={{ marginTop: "15px" }} button>
                    <ListItemIcon>
                      <img src={uni_icon} style={{ width: "24px" }} />
                    </ListItemIcon>
                    <p className='list-item'>Universities</p>
                  </ListItem>
                </Tooltip>
              </Link>
            )} */}
            <div className='links logout'>
              <Tooltip title='Logout' disableHoverListener={open}>
                <ListItem
                  onClick={() => logout(history)}
                  style={{ marginTop: "15px" }}
                  button>
                  <ListItemIcon>
                    <KeyboardBackspace />
                  </ListItemIcon>
                  <p className='list-item'>Logout</p>
                </ListItem>
              </Tooltip>
            </div>
          </List>
        </Drawer>
      )}
    </div>
  );
}
