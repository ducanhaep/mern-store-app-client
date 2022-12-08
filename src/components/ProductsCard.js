import { useState } from "react";
import { Link } from "react-router-dom";
import { deleteProduct, handleError } from "../api/productApi";
import useLazyLoadImage from "../hooks/useLazyLoadImage";
import { useMutation, useQueryClient } from "react-query";
import Modal from "./Modal";
import ProductForm from "./ProductForm";
import { toast } from "react-toastify";
const ProductsCard = ({ product }) => {
  const [openProduct, setOpenProduct] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(deleteProduct, {
    onSuccess: () => toast.success("Delete the product successfully!"),
    onError: (err) => handleError(err),
    onSettled: () =>
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.startsWith("/products"),
      }),
  });

  const { ref } = useLazyLoadImage();
  const handleDeleteProduct = (id) => {
    if (window.confirm("Do you want to delete this item?")) {
      mutate(id);
    }
  };

  return (
    <div className="card">
      <img alt={product.image} ref={ref} className="lazy-load" />

      <div className="box">
        <h3>
          <Link to={`/products/${product._id}`}>
            <span />
            {product.title}
          </Link>
        </h3>
        <h4>${product.price}</h4>

        <div className="btn_div">
          <button className="btn_edit" onClick={() => setOpenProduct(true)}>
            Edit
          </button>
          <button
            className="btn_delete"
            onClick={() => handleDeleteProduct(product._id)}
            disabled={isLoading}
          >
            {isLoading ? "Loading" : "Delete"}
          </button>
        </div>
      </div>

      <div>
        {openProduct && (
          <Modal titleTxt="Update Product" setOpen={setOpenProduct}>
            <ProductForm btnTxt="Update" data={product} />
          </Modal>
        )}
      </div>
    </div>
  );
};
export default ProductsCard;
