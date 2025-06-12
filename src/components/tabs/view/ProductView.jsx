import React from "react";
import GenericViewCard from "./GenericViewCard";

const ProductView = ({ product }) => {
  return (
    <div className="owner-view">
      <GenericViewCard data={product} type="product" />
    </div>
  );
};

export default ProductView;
