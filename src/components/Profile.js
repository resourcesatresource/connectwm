import React from "react";
import img from "../assets/images/official.jpg";

function Profile() {
  return (
    <div className="container-fluid">
      <div className="row row-cols-1 gy-4">
        <div className="col profile">
          <a href="#">
            <img src={img} alt="profilePicture" width="175px" height="175px" />
          </a>
        </div>
        <div className="col">
          <div className="nameBackground">
            <p>Saurav Sanjay</p>
          </div>
        </div>
      </div>
      <div className="row"></div>
    </div>
  );
}

export default Profile;
