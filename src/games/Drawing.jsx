import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function Drawing(props) {
  const location = useLocation();
  const imageURL = new URLSearchParams(location.search).get("imageURL");

  if (!imageURL) {
    return <div>No image URL provided</div>;
  }
  return (
    <div>
      <Link to="/canvas">
        <button>Let'Draw</button>
      </Link>
      <div>
        <img src={imageURL} alt="Drawn Image" />
      </div>
    </div>
  );
}

export default Drawing;
