import axios from "axios";
import { GET_ALL_IMAGES, IMAGES_LOADING } from "./types";

export const getImages = () => async dispatch => {
  dispatch(imagesLoading());
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  await axios
    .get("/gifs", config)
    // .then(res => console.log(res.data.data))
    .then(res =>
      dispatch({
        type: GET_ALL_IMAGES,
        payload: res.data.data
      })
    )
    .catch(err => console.log(err));
  console.log("Action to get images");
};

export const postGif = formData => async dispatch => {
  console.log(formData);
  const config = {
    headers: {
      "content-type": "multipart/form-data"
    }
  };
  await axios
    .post("/gifs", formData, config)
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

export const imagesLoading = () => {
  return {
    type: IMAGES_LOADING
  };
};
