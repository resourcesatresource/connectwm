import React from "react";
import platforms from "../dist/myLinks.json";
import Card from "./Card";

function CardList() {
  const list = platforms.map((platform, id) => {
    return (
      <div className="col" key={id}>
        <Card platform={platform} />
      </div>
    );
  });
  return (
    <div className="container">
      <div className="row row-cols-md-2 row-cols-sm-1 gy-md-2 gy-sm-4">
        {list}
      </div>
    </div>
  );
}

export default CardList;
