import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { getData } from "../api/productApi";
import ProductInfo from "../components/ProductInfo";

const ProductDetail = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const key = `/products/${id}`;

  const keys = queryClient.getQueryData("keys");

  const {
    data: product,
    isLoading,
    error,
  } = useQuery(key, getData, {
    enabled: !!id,
    cacheTime: 0,
    initialData: () => {
      if (keys?.k1) {
        const data = queryClient.getQueryData(keys.k1);
        return data?.products.find((d) => d._id === id);
      }
      if (keys?.k2) {
        const pages = queryClient.getQueryData(keys.k2)?.pages;
        const products = pages.reduce(
          (acc, item) => [acc, ...item.products],
          []
        );
        return products.find((d) => d._id === id);
      }
    },
  });

  return (
    <main>
      {product && <ProductInfo product={product} />}
      {isLoading && <h2>Loading...</h2>}
      {error && (
        <p style={{ textAlign: "center", color: "red" }}>{error.message}</p>
      )}
    </main>
  );
};
export default ProductDetail;
