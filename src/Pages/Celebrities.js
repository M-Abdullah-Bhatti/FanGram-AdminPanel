import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@mui/material/Button";

// import { Helmet } from "react-helmet-async";


import {
  Box,
  Chip as MuiChip,
  Divider as MuiDivider,
  Grid,
  IconButton,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
  Typography,
  CircularProgress,
} from "@material-ui/core";

import { green, orange, red } from "@material-ui/core/colors";

import {
  RemoveRedEye as RemoveRedEyeIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Fastfood,
  Delete,
} from "@material-ui/icons";

import { spacing } from "@material-ui/system";
import DeleteUser from "../Components/modals/DeleteUser";
import { DeleteSingleData, GetAllData } from "../NetworkCalls/Admin/ServerReq";
import ButtonComponent from "../Components/buttton";
import ButtonIconComponent from "../Components/ButtonIcons";
import SearchBar from "../Components/SearchBar";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Divider = styled(MuiDivider)(spacing);

const Paper = styled(MuiPaper)(spacing);

const Chip = styled(MuiChip)`
  ${spacing};
  background: ${(props) => props.shipped && green[500]};
  background: ${(props) => props.processing && orange[700]};
  background: ${(props) => props.cancelled && red[500]};
  color: #fff;
`;

const Spacer = styled.div`
  flex: 1 1 100%;
`;

const ToolbarTitle = styled.div`
  min-width: 150px;
`;

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "id", alignment: "left", label: "S.No" },
  { id: "Celebrity Name", alignment: "left", label: "Celebrity Name" },
  { id: "Video Price", alignment: "left", label: "Video Price" },
  { id: "Meet and Greet Price", alignment: "left", label: "Meet and Greet Price" },
  { id: "Responds In Days?", alignment: "left", label: "Responds In Days?" },
  { id: "Ratings", alignment: "left", label: "Ratings" },
  { id: "isFeatured?", alignment: "left", label: "isFeatured?" },
  { id: "actions", alignment: "right", label: "Actions" },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignment}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <Box>
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
                style={{ color: "#969696", fontWeight: 600 }}
              >
                {headCell.label}
              </TableSortLabel>
            </Box>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

let EnhancedTableToolbar = (props) => {
  const { numSelected } = props;
  const [searched, setSearched] = React.useState("");

  return (
    <Box>
      

         <Box
            style={{
              display: "flex",
              width: "100%",
             
              justifyContent:"space-between",
              alignItems: "center",
             
            }}
          >
            <div style={{ marginLeft:"10px" }}>
              <Typography variant="h4" id="tableTitle">
                Celebrities
              </Typography>
            </div>
            <div style={{  marginRight:"15px", }}>

              <div style={{
                width:"300px"
              }}>
              <SearchBar
                label="Search Name"
                value={searched}
                onChange={(val) => {
                  setSearched(val);
                  props.onSearch(val);
                }}
              />
              </div>
            </div>
          </Box>
       
     
      <Spacer />
      
    </Box>
  );
};

function EnhancedTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("customer");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loader, setLoader] = React.useState(false);
  let [data, setData] = React.useState([]);
  const [fixedData, setFixedData] = React.useState([]);
  const [Refresh, setRefresh] = React.useState(false);
  const [currentCelebrityId, setCurrentCelebrityId] = useState("");
  const [currentCelebrity, setCurrentCelebrity] = useState({});

  useEffect(() => {
   
    getData();
    //     }
    // });
  }, [Refresh]);

  const getData = async () => {
    try {
      setLoader(true);
      const response = await GetAllData("api/celebrity/getAllCelebrities");
      setData(response);
      setFixedData(response);
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  };


 

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  const handleSearch = (val) => {
    console.log(val);
    if (!val) {
      setData(fixedData);
      return;
    }
    const filteredRows = fixedData.filter((row) => {
      return row.name?.toLowerCase().includes(val?.toLowerCase());
    });
    console.log(filteredRows);
    setData(filteredRows);
  };
  const history = useHistory();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(!open);
  };

  const filterItem = (item) => {
    return item === "FAQ’s"
      ? "Products"
      : item === "Blogs"
      ? "Offers"
      : item === "Suggestions"
      ? "Refund Requests"
      : item === "Universities"
      ? "Purchase History"
      : item;
  };

  return (
    <div>
      {loader ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <Paper
            style={{
              boxShadow: "none !important",
              border: "1px solid rgba(76, 78, 100, 0.25)",
              borderRadius: "10px",
            }}
          >
            <EnhancedTableToolbar
              onSearch={(val) => handleSearch(val)}
              numSelected={selected.length}
            />

            <TableContainer style={{ height: "47vh" }}>
              <Table
                aria-labelledby="tableTitle"
                size={"medium"}
                aria-label="enhanced table"
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={data?.length}
                />
                <TableBody>
                  {stableSort(data, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.id);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={`${row.id}-${index}`}
                          selected={isItemSelected}
                        >
                          <TableCell align="left">
                            <Typography
                              style={{ fontWeight: "600", fontSize: "16px" }}
                            >
                              {index + 1}.
                            </Typography>{" "}
                          </TableCell>
                          <TableCell align="left">
                            <Typography
                              style={{ fontWeight: "600", fontSize: "16px" }}
                            >
                              {row?.name}
                            </Typography>{" "}
                          </TableCell>
                          <TableCell align="left">
                            <Typography
                              style={{ fontWeight: "600", fontSize: "16px" }}
                            >
                              {row?.videoPrice}
                            </Typography>{" "}
                          </TableCell>


                          <TableCell align="left">
                            <Typography
                              style={{ fontWeight: "600", fontSize: "16px" }}
                            >
                              {row?.meetAndGreetPrice}
                            </Typography>{" "}
                          </TableCell>

                          <TableCell align="left">
                            <Typography
                              style={{ fontWeight: "600", fontSize: "16px" }}
                            >
                              {row?.responseInDays}
                            </Typography>{" "}
                          </TableCell>
                          

                          <TableCell align="left">
                            <Typography
                              style={{ fontWeight: "600", fontSize: "16px" }}
                            >
                              {row?.ratings}
                            </Typography>{" "}
                          </TableCell>


                          <TableCell align="left">
                            <Typography
                              style={{ fontWeight: "600", fontSize: "16px" }}
                            >
                              {row?.isFeatured ? "Yes" : "No"}
                            </Typography>{" "}
                          </TableCell>
                          



                          <TableCell padding="none" align="right">
                            <Box mr={2}>
                              <Link
                                to={{
                                  pathname: `/dashboard/edit_celebrity/${row?._id}`,
                                  state: row,
                                }}
                              >
                                <Tooltip title="Edit Celebrity">
                                  <IconButton>
                                    <EditIcon />
                                  </IconButton>
                                </Tooltip>
                              </Link>

                               <Link
                                                                to={{
                                                                    pathname: `/dashboard/add_recent_video/${row?._id}`,
                                                                    state: row,
                                                                }}>
                                                                <Tooltip title='Add Recent Video'>
                                                                    <IconButton>

                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m18 15l-.001 3H21v2h-3.001L18 23h-2l-.001-3H13v-2h2.999L16 15h2Zm-7 3v2H3v-2h8Zm10-7v2H3v-2h18Zm0-7v2H3V4h18Z" /></svg>
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </Link>
                              
                            </Box>

                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {/* {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={8} />
                                        </TableRow>
                                    )} */}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={data?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>

          {/* <DeleteUser
            open={open}
            currentCelebrityId={currentCelebrityId}
            handleOpen={handleOpen}
            setRefresh={setRefresh}
            handleClose={handleClose}
          /> */}
        </>
      )}
    </div>
  );
}

const Celebrities = () => {
  const history = useHistory();

  return (
    <React.Fragment>
      {/* <Helmet title="Orders" /> */}

      <Grid
        style={{ marginBottom: "10px", alignItems: "center" }}
        justify="space-between"
        container
        spacing={24}
      >
        <Grid item>
          <Typography
            gutterBottom
            variant="h3"
            display="inline"
            style={{
              fontWeight: "700",
              letteSpacing: "0.2px",
              fontSize: "25px",
            }}
          >
            Dashboard
          </Typography>
        </Grid>

        <Grid item>
          <ButtonIconComponent
            loader={false}
            imageBool={true}
            name="Create New Celebrity"
            onClick={() => history.push("/dashboard/add_celebrity")}
          />
        </Grid>
      </Grid>

      <Divider
        my={6}
        style={{
          marginTop: "20px",
          marginBottom: "20px",
          backgroundColor: "#fafafa",
        }}
      />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <EnhancedTable />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Celebrities;
