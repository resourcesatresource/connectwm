import React from "react";

import { getIconForPlatform } from "../utils";

interface CardProps {
  platform: {
    name: string;
    username: string;
    url: string;
  };
}

const Card: React.FC<CardProps> = ({ platform }) => {
  const { name, username, url } = platform;

  return (
    <div className="textEffect">
      <p>
        <i className={`${getIconForPlatform(url)} icon`}></i>
      </p>
      <div>
        <p>{name}</p>
        <p>{username}</p>
        <a href={url}>
          <strong className="visit-link">Visit</strong>
          <i className="fas fa-external-link-alt"></i>
        </a>
      </div>
    </div>
  );
};

export default Card;
