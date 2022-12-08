import React from "react";
import ProductsCard from "./ProductsCard";

const Products = React.memo(({ products }) => {
  return (
    <>
      {products.map((product) => (
        <ProductsCard key={product._id} product={product} />
      ))}
    </>
  );
});
export default Products;
