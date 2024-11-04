import React from "react";

interface CardProps {
  platform: {
    name: string;
    username: string;
    url: string;
  };
}

const Card: React.FC<CardProps> = (props) => {
  const { name, username, url } = props.platform;
  return (
    <div className="textEffect">
      <p>
        <i className={`fab fa-${name} icon`}></i>
      </p>
      <p>
        <a href={url} id="youtubeLink">
          {username}
        </a>
      </p>
    </div>
  );
};

export default Card;
