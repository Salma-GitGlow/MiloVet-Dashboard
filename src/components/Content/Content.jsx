import React, { useState } from "react";
import ContentHeader from "./ContentHeader";
import HomeTab from "../tabs/HomeTab";
import OwnersTab from "../tabs/OwnersTab";
import VetsTab from "../tabs/VetsTab";
import AnimalsTab from "../tabs/AnimalsTab";
import ArticlesTab from "../tabs/ArticlesTab";
import DiseasesTab from "../tabs/DiseasesTab";
import ProductsTab from "../tabs/ProductsTab";
import OrdersTab from "../tabs/OrdersTab";
import "./content.css";

const tabTitles = {
  home: "Dashboard",
  owners: "Animal Owners",
  vets: "Veterinarians",
  animals: "Animals",
  articles: "Articles",
  diseases: "Diseases",
  products: "Products",
  orders: "Orders",
};

const Content = ({ activeTab }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const renderTabContent = () => {
    const commonProps = {
      searchTerm: activeTab !== "home" ? searchTerm : "",
      onSearch: handleSearch,
    };

    switch (activeTab) {
      case "home":
        return <HomeTab />;
      case "owners":
        return <OwnersTab {...commonProps} />;
      case "vets":
        return <VetsTab {...commonProps} />;
      case "animals":
        return <AnimalsTab {...commonProps} />;
      case "articles":
        return <ArticlesTab {...commonProps} />;
      case "diseases":
        return <DiseasesTab {...commonProps} />;
      case "products":
        return <ProductsTab {...commonProps} />;
      case "orders":
        return <OrdersTab {...commonProps} />;
      default:
        return <HomeTab />;
    }
  };

  return (
    <div className="content">
      <ContentHeader
        title={tabTitles[activeTab]}
        onSearch={handleSearch}
        showSearch={activeTab !== "home"}
      />
      {renderTabContent()}
    </div>
  );
};

export default Content;
