import { Box, Typography } from "@mui/material";
import updloadIcon from "../Assets/upload-vector.svg";
import defaultImage from "../Assets/default-img-vector.svg";
import crossIcon from "../Assets/cross-vector-rounded.svg";
import { useEffect, useState } from "react";
import ButtonIconComponent from "../Components/ButtonIcons";
import {
  AddCategory,
  GetAllCategories,
  RemoveCategory,
} from "../NetworkCalls/ServerReq";
import Drag from "../Components/draganddrop";
import { uploadImage } from "../NetworkCalls/firebaseCalls";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { CircularProgress } from "@material-ui/core";

const SettingsPage = () => {
  const [Category, setCategory] = useState([]);
  const [open, setOpen] = useState(false);
  const [mainLoader, setMainLoader] = useState("");
  const { setDragOver, onDragOver, onDragLeave, setFileDropError } = Drag();

  let Antique = Category.filter((item) => item.Type === "Antique");
  let Artwork = Category.filter((item) => item.Type === "Artwork");
  let Collection = Category.filter((item) => item.Type === "Collection");
  let Digital_Work = Category.filter((item) => item.Type === "Digital_Artist");

  const history = useHistory();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSliderChange = (e) => {
    const selectedFile = e?.target?.files[0];
    let totalSliderImages = 0;
    setMainLoader("Slider");
    console.log({ totalSliderImages });
    if (e.target.name == "Slider") {
      Category.forEach((item) =>
        item.Type === "Slider" ? (totalSliderImages += 1) : ""
      );

      if (totalSliderImages < 3) {
        if (e.target.name === "Slider") {
          setMainLoader("Slider");
          uploadImage(selectedFile)
            .then(async (url) => {
              const Product = await AddCategory({
                Type: e.target.name,
                Image: url,
              });
              if (Product.status === 400) {
                console.log("In if errors");
                toast.error(`Something went wrong!`);
                setMainLoader(false);
              } else {
                toast.success(`Image upload successfully!`);
                getCategories();
                setMainLoader(false);
              }
              // Use the URL value in your code
            })
            .catch((error) => {
              console.log("Error:", error);
              toast.error(`Something went wrong!`);
              setMainLoader(false);
              // Handle the error if necessary
            });
        }
        totalSliderImages = 0;
      } else {
        totalSliderImages = 0;
        toast.error(`Cannot upload more than 3 images for slider!`);
        setMainLoader(false);
      }
    }

    if (e.target.name !== "Slider") {
      setMainLoader("Slider");
      uploadImage(selectedFile)
        .then(async (url) => {
          const Product = await AddCategory({
            Type: e.target.name,
            Image: url,
          });
          if (Product.code === 400) {
            console.log("In if errors");
            toast.error(`Something went wrong!`);
            setMainLoader(false);
          } else {
            toast.success(`Image upload successfully!`);
            getCategories();
            setMainLoader(false);
          }
          // Use the URL value in your code
        })
        .catch((error) => {
          console.log("Error:", error);
          toast.error(`Something went wrong!`);
          // Handle the error if necessary
          setMainLoader(false);
        });
    }
  };

  const getCategories = async () => {
    try {
      const categories = await GetAllCategories();
      setCategory(categories);
      setMainLoader(false);
    } catch (error) {
      console.log({ error });
      toast.error(`Something went wrong! ${error}`);
      setMainLoader(false);
    }
  };

  const onDrop = (e, name) => {
    e.preventDefault();
    setMainLoader("Slider");

    setDragOver(false);

    const selectedFile = e?.dataTransfer?.files[0];

    if (selectedFile.type.split("/")[0] !== "image") {
      return setFileDropError("Please provide an image file to upload!");
    }

    let totalSliderImages = 0;

    Category.forEach((item) =>
      item.Type === "Slider" ? (totalSliderImages += 1) : ""
    );

    if (totalSliderImages < 3 && name === "Slider") {
      uploadImage(selectedFile)
        .then(async (url) => {
          const Product = await AddCategory({
            Type: name,
            Image: url,
          });
          if (Product.code === 400) {
            console.log("In if errors");
            toast.error(`Something went wrong!`);
            setMainLoader(false);
          } else {
            toast.success(`Image upload successfully!`);
            getCategories();
            setMainLoader(false);
          }
          // Use the URL value in your code
        })
        .catch((error) => {
          console.log("Error:", error);
          toast.error(`Something went wrong!`);
          setMainLoader(false);
          // Handle the error if necessary
        });
    }

    if (name !== "Slider") {
      setMainLoader("notSlider");
      uploadImage(selectedFile)
        .then(async (url) => {
          const Product = await AddCategory({
            Type: name,
            Image: url,
          });
          if (Product.code === 400) {
            console.log("In if errors");
            toast.error(`Something went wrong!`);
            setMainLoader(false);
          } else {
            toast.success(`Image upload successfully!`);
            getCategories();
            setMainLoader(false);
          }
          // Use the URL value in your code
        })
        .catch((error) => {
          console.log("Error:", error);
          toast.error(`Something went wrong!`);
          setMainLoader(false);
          // Handle the error if necessary
        });
    }
  };

  const handleRemove = async (id) => {
    const res = await RemoveCategory(id);

    if (res.status === 200) {
      toast.success("Image deleted successfully!");
      getCategories();
    }
  };

  useEffect(() => {
    setMainLoader(true);
    getCategories();
  }, []);

  return (
    <div>
      <h1>Settings</h1>

      {/* Upload Slider Images */}
      <Box
        style={{
          background: "#fff",
          marginTop: "40px",
          padding: "30px",
          borderRadius: "8px",
          minHeight: "373px",
          border: "1px solid rgba(76, 78, 100, 0.25)",
        }}
      >
        <Typography variant="h5" id="tableTitle" color={"#4E4E4E"}>
          Upload Slider Images
        </Typography>
        {mainLoader ? (
          <CircularProgress color="#000" />
        ) : (
          <>
            <Box>
              <label
                htmlFor="my_file"
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={(e) => onDrop(e, "Slider")}
              >
                <Box
                  style={{
                    marginTop: "30px",
                    background: "#FAFAFA",
                    borderRadius: "10px",
                    border: "1px solid rgba(0, 0, 0, 0.20)",
                    minHeight: "373px",

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    width: "80%",
                    cursor: "pointer",
                  }}
                >
                  {mainLoader === "Slider" ? (
                    <CircularProgress color="#000" />
                  ) : (
                    <>
                      <input
                        type="file"
                        id="my_file"
                        style={{ display: "none" }}
                        name="Slider"
                        onChange={handleSliderChange}
                      />

                      <Box
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                          gap: "2rem",
                        }}
                      >
                        <img src={updloadIcon} alt="updloadIcon" />

                        <Typography
                          variant="p"
                          id="tableTitle"
                          fontSize={"15px"}
                          color={"#4E4E4E"}
                          textAlign={"center"}
                        >
                          Drag and drop an image, or
                          <p style={{ color: "#000" }}>
                            Browse 1024x1024 size Recommended.
                          </p>
                        </Typography>
                      </Box>
                    </>
                  )}
                </Box>
              </label>

              <Box
                display={"flex"}
                flexWrap={"wrap"}
                style={{
                  marginTop: "2.5rem",
                }}
                width={"100%"}
                gap={"2rem"}
              >
                {Category?.map((item, index) => {
                  if (item.Type === "Slider")
                    return (
                      <Box
                        style={{
                          width: "20%",
                          height: "150px",
                          display: "flex",
                          flexWrap: "wrap",
                        }}
                        key={index}
                      >
                        {/* Image Card */}

                        <Box
                          style={{
                            background: "#eee",
                            borderRadius: "5px",
                            border: "1px solid rgba(0, 0, 0, 0.20)",
                            height: "100%",
                            width: "100%",

                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",

                            gap: "0.75rem",

                            position: "relative",
                          }}
                        >
                          {mainLoader ? (
                            <CircularProgress color="#000" />
                          ) : (
                            <>
                              <img
                                src={item.Image}
                                alt=""
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                  borderRadius: "5px",
                                }}
                              />
                              <img
                                src={crossIcon}
                                alt="crossIcon"
                                style={{
                                  position: "absolute",
                                  top: "-10px",
                                  right: "-10px",
                                  background: "#fff",
                                  borderRadius: "50%",
                                  cursor: "pointer",
                                }}
                                onClick={() => handleRemove(item._id)}
                              />
                            </>
                          )}
                        </Box>
                      </Box>
                    );
                })}
              </Box>
            </Box>
          </>
        )}
      </Box>

      {/* Update Category Images */}
      <Box
        style={{
          background: "#fff",
          marginTop: "40px",
          padding: "30px",
          minHeight: "244px",
          borderRadius: "8px",
          border: "1px solid rgba(76, 78, 100, 0.25)",
        }}
      >
        <Typography variant="h5" id="tableTitle" color={"#4E4E4E"}>
          Update Category Images
        </Typography>

        {mainLoader ? (
          <CircularProgress color="#000" />
        ) : (
          <Box style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
            <Box style={{ width: "30%", marginTop: "30px" }}>
              <Typography
                variant="h5"
                id="tableTitle"
                color={"#000"}
                style={{ fontSize: "20px" }}
              >
                Antique
              </Typography>
              <Box
                style={{
                  marginTop: "20px",
                  width: "100%",
                  height: "244px",
                  background: "#FAFAFA",
                  borderRadius: "10px",
                  border: "1px solid rgba(0, 0, 0, 0.20)",
                  position: "relative",
                }}
              >
                {mainLoader !== "Slider" && Antique.length > 0 ? (
                  <>
                    <img
                      src={Antique[0].Image}
                      alt="Antique"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "5px",
                      }}
                    />
                    <img
                      src={crossIcon}
                      alt="crossIcon"
                      style={{
                        position: "absolute",
                        top: "-10px",
                        right: "-10px",
                        background: "#fff",
                        borderRadius: "50%",
                        cursor: "pointer",
                      }}
                      onClick={() => handleRemove(Antique[0]._id)}
                    />
                  </>
                ) : (
                  <label
                    htmlFor="my_file_Antique"
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={(e) => onDrop(e, "Antique")}
                  >
                    <Box
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        height: "100%",
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="file"
                        id="my_file_Antique"
                        style={{ display: "none" }}
                        name="Antique"
                        onChange={handleSliderChange}
                      />

                      <Box
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                          gap: "2rem",
                        }}
                      >
                        <img src={updloadIcon} alt="updloadIcon" />

                        <Typography
                          variant="p"
                          id="tableTitle"
                          fontSize={"15px"}
                          color={"#4E4E4E"}
                          textAlign={"center"}
                        >
                          Drag and drop an image, or
                          <p style={{ color: "#000" }}>
                            Browse 1024x1024 size Recommended.
                          </p>
                        </Typography>
                      </Box>
                    </Box>
                  </label>
                )}
              </Box>
            </Box>
            <Box style={{ width: "30%", marginTop: "30px" }}>
              <Typography
                variant="h5"
                id="tableTitle"
                color={"#000"}
                style={{ fontSize: "20px" }}
              >
                Artwork
              </Typography>
              <Box
                style={{
                  marginTop: "20px",
                  width: "100%",
                  height: "244px",
                  background: "#FAFAFA",
                  borderRadius: "10px",
                  border: "1px solid rgba(0, 0, 0, 0.20)",
                  position: "relative",
                }}
              >
                {mainLoader !== "Slider" && Artwork.length > 0 ? (
                  <>
                    <img
                      src={Artwork[0].Image}
                      alt="Artwork"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "5px",
                      }}
                    />
                    <img
                      src={crossIcon}
                      alt="crossIcon"
                      style={{
                        position: "absolute",
                        top: "-10px",
                        right: "-10px",
                        background: "#fff",
                        borderRadius: "50%",
                        cursor: "pointer",
                      }}
                      onClick={() => handleRemove(Artwork[0]._id)}
                    />
                  </>
                ) : (
                  <label
                    htmlFor="my_file_Artwork"
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={(e) => onDrop(e, "Artwork")}
                  >
                    <Box
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        height: "100%",
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="file"
                        id="my_file_Artwork"
                        style={{ display: "none" }}
                        name="Artwork"
                        onChange={handleSliderChange}
                      />

                      <Box
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                          gap: "2rem",
                        }}
                      >
                        <img src={updloadIcon} alt="updloadIcon" />

                        <Typography
                          variant="p"
                          id="tableTitle"
                          fontSize={"15px"}
                          color={"#4E4E4E"}
                          textAlign={"center"}
                        >
                          Drag and drop an image, or
                          <p style={{ color: "#000" }}>
                            Browse 1024x1024 size Recommended.
                          </p>
                        </Typography>
                      </Box>
                    </Box>
                  </label>
                )}
              </Box>
            </Box>
            <Box style={{ width: "30%", marginTop: "30px" }}>
              <Typography
                variant="h5"
                id="tableTitle"
                color={"#000"}
                style={{ fontSize: "20px" }}
              >
                Collection
              </Typography>
              <Box
                style={{
                  marginTop: "20px",
                  width: "100%",
                  height: "244px",
                  background: "#FAFAFA",
                  borderRadius: "10px",
                  border: "1px solid rgba(0, 0, 0, 0.20)",
                  position: "relative",
                }}
              >
                {mainLoader !== "Slider" && Collection.length > 0 ? (
                  <>
                    <img
                      src={Collection[0].Image}
                      alt="Collection"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "5px",
                      }}
                    />
                    <img
                      src={crossIcon}
                      alt="crossIcon"
                      style={{
                        position: "absolute",
                        top: "-10px",
                        right: "-10px",
                        background: "#fff",
                        borderRadius: "50%",
                        cursor: "pointer",
                      }}
                      onClick={() => handleRemove(Collection[0]._id)}
                    />
                  </>
                ) : (
                  <label
                    htmlFor="my_file_Collection"
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={(e) => onDrop(e, "Collection")}
                  >
                    <Box
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        height: "100%",
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="file"
                        id="my_file_Collection"
                        style={{ display: "none" }}
                        name="Collection"
                        onChange={handleSliderChange}
                      />

                      <Box
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                          gap: "2rem",
                        }}
                      >
                        <img src={updloadIcon} alt="updloadIcon" />

                        <Typography
                          variant="p"
                          id="tableTitle"
                          fontSize={"15px"}
                          color={"#4E4E4E"}
                          textAlign={"center"}
                        >
                          Drag and drop an image, or
                          <p style={{ color: "#000" }}>
                            Browse 1024x1024 size Recommended.
                          </p>
                        </Typography>
                      </Box>
                    </Box>
                  </label>
                )}
              </Box>
            </Box>
            <Box style={{ width: "30%", marginTop: "30px" }}>
              <Typography
                variant="h5"
                id="tableTitle"
                color={"#000"}
                style={{ fontSize: "20px" }}
              >
                Digital Artist
              </Typography>
              <Box
                style={{
                  marginTop: "20px",
                  width: "100%",
                  height: "244px",
                  background: "#FAFAFA",
                  borderRadius: "10px",
                  border: "1px solid rgba(0, 0, 0, 0.20)",
                  position: "relative",
                }}
              >
                {Digital_Work.length > 0 ? (
                  <>
                    <img
                      src={Digital_Work[0].Image}
                      alt="Digital_Artist"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "5px",
                      }}
                    />
                    <img
                      src={crossIcon}
                      alt="crossIcon"
                      style={{
                        position: "absolute",
                        top: "-10px",
                        right: "-10px",
                        background: "#fff",
                        borderRadius: "50%",
                        cursor: "pointer",
                      }}
                      onClick={() => handleRemove(Digital_Work[0]._id)}
                    />
                  </>
                ) : (
                  <label
                    htmlFor="my_file_Digital_Artist"
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={(e) => onDrop(e, "Digital_Artist")}
                  >
                    <Box
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        height: "100%",
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="file"
                        id="my_file_Digital_Artist"
                        style={{ display: "none" }}
                        name="Digital_Artist"
                        onChange={handleSliderChange}
                      />

                      <Box
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                          gap: "2rem",
                        }}
                      >
                        <img src={updloadIcon} alt="updloadIcon" />

                        <Typography
                          variant="p"
                          id="tableTitle"
                          fontSize={"15px"}
                          color={"#4E4E4E"}
                          textAlign={"center"}
                        >
                          Drag and drop an image, or
                          <p style={{ color: "#000" }}>
                            Browse 1024x1024 size Recommended.
                          </p>
                        </Typography>
                      </Box>
                    </Box>
                  </label>
                )}
              </Box>
            </Box>
          </Box>
        )}
      </Box>

      <ButtonIconComponent
        loader={false}
        name="Save"
        imageBool={false}
        styles={{ width: "20%", margin: "2rem auto 1rem auto" }}
        onClick={() => history.push({ pathname: "/dashboard/admins" })}
      />
    </div>
  );
};

export default SettingsPage;
