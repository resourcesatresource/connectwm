import React from "react";

import Card from "./Card";
import { Connection } from "../types";

interface CardListProps {
  list: Connection[];
}

const CardList: React.FC<CardListProps> = ({ list }) => {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {list.map((item) => {
          const platformDetails = {
            name: item.name,
            username: item.description,
            url: item.url,
            iconName: item.iconName,
          };

          return (
            <Card key={item._id} platform={platformDetails} />
          );
        })}
    </div>
  );
};

export default CardList;
