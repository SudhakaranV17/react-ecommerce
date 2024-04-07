import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function SearchProduct() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const searchHandler = () => {
    navigate("/search?keyword=" + keyword);
  };
  return (
    <>
      <div className="input-group">
        <input
          type="text"
          onChange={(e) => setKeyword(e.target.value)}
          onBlur={searchHandler}
          id="search_field"
          className="form-control"
          placeholder="Enter Product Name ..."
        />
        <div className="input-group-append">
          <button onClick={searchHandler} id="search_btn" className="btn">
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </>
  );
}

export default SearchProduct;
