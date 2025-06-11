import React from "react";
import { BiSearch } from "react-icons/bi";
import "./content.css";

const ContentHeader = ({ title }) => {
  return (
    <div className="content--header">
      <h1 className="header--title">{title}</h1>
      <div className="search-box">
        <input type="text" placeholder="Search anything here..." />
        <BiSearch className="icon-search" />
      </div>
    </div>
  );
};

export default ContentHeader;
