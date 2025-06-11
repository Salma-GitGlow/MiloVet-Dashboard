import React from "react";
import { BiHome, BiUser, BiBook, BiCart } from "react-icons/bi";
import { FaDog } from "react-icons/fa";
import logo from "../../assets/imgs/logo.svg";
import TabLink from "./TabLink";
import "./sidebar.css";

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="menu">
      <img className="logo" src={logo} alt="Logo" />
      <hr />

      <div className="menu-list">
        <TabLink
          isSelected={activeTab === "home"}
          onClick={() => setActiveTab("home")}
          icon={BiHome}
          label="Home"
        />
        <TabLink
          isSelected={activeTab === "vets"}
          onClick={() => setActiveTab("vets")}
          icon={BiUser}
          label="Veterinarians"
        />
        <TabLink
          isSelected={activeTab === "owners"}
          onClick={() => setActiveTab("owners")}
          icon={BiUser}
          label="Animal Owners"
        />
        <TabLink
          isSelected={activeTab === "animals"}
          onClick={() => setActiveTab("animals")}
          icon={FaDog}
          label="Animals"
        />
        <TabLink
          isSelected={activeTab === "articles"}
          onClick={() => setActiveTab("articles")}
          icon={BiBook}
          label="Articles"
        />
        <TabLink
          isSelected={activeTab === "diseases"}
          onClick={() => setActiveTab("diseases")}
          icon={BiBook}
          label="Diseases"
        />
        <TabLink
          isSelected={activeTab === "products"}
          onClick={() => setActiveTab("products")}
          icon={BiCart}
          label="Products"
        />
      </div>
    </div>
  );
};

export default Sidebar;
