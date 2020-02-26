import React, { Fragment, useState } from "react";

const PostImg = () => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose file");
  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };
  return (
    <div className="container-fluid">
      <form>
        <div className="form-group mb-5 mt-5">
          <label htmlFor="exampleFormControlFile1">{filename}</label>
          <input
            type="file"
            className="form-control-file"
            id="exampleFormControlFile1"
            onChange={onChange}
          />
        </div>
        <input
          type="submit"
          value="submit"
          className="btn btn-primary btn-block mt-4"
        />
      </form>
    </div>
  );
};

export default PostImg;
