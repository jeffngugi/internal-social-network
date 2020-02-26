import React, { useState } from "react";
import { postGif, getImages } from "../../actions/imageAction";
import { connect } from "react-redux";

const PostImg = ({ postGif }) => {
  const [image, setImage] = useState("");
  const [filename, setFilename] = useState("Choose a meme");
  const [title, setTitle] = useState("");

  const onFileChange = e => {
    setImage(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onChange = e => {
    setTitle(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    postGif(formData);
    // getImages();
  };
  return (
    <div className="row">
      <div className="col-sm-2 col-lg-2"> </div>
      <div className="col-sm-8 col-lg-8">
        <form className="form" noValidate onSubmit={onSubmit}>
          <fieldset>
            <legend> Upload a meme </legend>
            <p>{title}</p>
            <div className="form-group">
              <label htmlFor="inputArticle"> Article title </label>
              <input
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Say something about the meme"
                name="title"
                value={title}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleTextarea"> {filename} </label>
              <input
                type="file"
                className="form-control-file"
                id="exampleFormControlFile1"
                onChange={onFileChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </fieldset>
        </form>
      </div>
      <div className="col-sm-2 col-lg-2"> </div>
    </div>
  );
};

export default connect(null, { postGif, getImages })(PostImg);
