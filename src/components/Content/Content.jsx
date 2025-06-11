// src/components/Content.jsx
import React from "react";
import ContentHeader from "./ContentHeader";
import HomeTab from "../tabs/HomeTab";
import OwnersTab from "../tabs/OwnersTab";
import VetsTab from "../tabs/VetsTab";
import AnimalsTab from "../tabs/AnimalsTab";
import ArticlesTab from "../tabs/ArticlesTab";
import DiseasesTab from "../tabs/DiseasesTab";
import ProductsTab from "../tabs/ProductsTab";
import "./content.css";

const tabTitles = {
  home: "Dashboard",
  owners: "Animal Owners",
  vets: "Veterinarians",
  animals: "Animals",
  articles: "Articles",
  diseases: "Diseases",
  products: "Products",
};

const Content = ({ activeTab }) => {
  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return <HomeTab />;
      case "owners":
        return <OwnersTab />;
      case "vets":
        return <VetsTab />;
      case "animals":
        return <AnimalsTab />;
      case "articles":
        return <ArticlesTab />;
      case "diseases":
        return <DiseasesTab />;
      case "products":
        return <ProductsTab />;

      default:
        return <HomeTab />;
    }
  };

  return (
    <div className="content">
      <ContentHeader title={tabTitles[activeTab]} />
      {renderTabContent()}
    </div>
  );
};

export default Content;
