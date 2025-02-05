import React from "react";

import Card from "./Card";
import { Connection } from "../types";
import { getIconForPlatform } from "../utils";

interface CardListProps {
  list: Connection[];
}

const CardList: React.FC<CardListProps> = ({ list }) => {
  return (
    <div className="container">
      <div className="row row-cols-md-2 row-cols-sm-1 gy-md-2 gy-sm-4">
        {list.map((item) => {
          const platformDetails = {
            name: item.name,
            username: item.description,
            url: item.url,
          };

          getIconForPlatform(platformDetails.url);

          return (
            <div className="col" key={item._id}>
              <Card platform={platformDetails}></Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardList;
