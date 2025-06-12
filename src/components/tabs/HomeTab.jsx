// src/components/tabs/HomeTab.jsx
import React from "react";
import { BiUser, BiBook, BiCart } from "react-icons/bi";
import { FaDog } from "react-icons/fa";
import Card from "../Card/Card";

const HomeTab = () => {
  return (
    <div className="cards">
      <Card
        title="Vets"
        icon={BiUser}
        endpoint="https://milovetapi.onrender.com/api/vets/"
      />
      <Card
        title="Owners"
        icon={BiUser}
        endpoint="https://milovetapi.onrender.com/api/owners/"
      />
      <Card
        title="Articles"
        icon={BiBook}
        endpoint="https://milovetapi.onrender.com/api/articles/"
      />
      <Card
        title="Diseases"
        icon={BiBook}
        endpoint="https://milovetapi.onrender.com/api/diseases/"
      />
      <Card
        title="Animals"
        icon={FaDog}
        endpoint="https://milovetapi.onrender.com/api/animals/"
      />

      <Card
        title="Products"
        icon={BiCart}
        endpoint="https://milovetapi.onrender.com/api/products/"
      />
    </div>
  );
};

export default HomeTab;
