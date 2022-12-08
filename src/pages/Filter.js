import { useEffect, useState } from "react";
import { useInfiniteQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { getInfiniteData } from "../api/productApi";
import Products from "../components/Products";
import Sorting from "../components/Sorting";
import { useMyContext } from "../context/store";
import useInView from "../hooks/useInView";
const Filter = () => {
  const { option, value } = useParams();
  const [limit, setLimit] = useState(5);
  const { sort } = useMyContext();
  const queryClient = useQueryClient();
  const key = `products?price[${option}]=${value}&sort=${sort}&limit=${limit}`;
  queryClient.setQueryData("keys", { k1: "", k2: key });

  const { ref, inView } = useInView();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: key,
    queryFn: getInfiniteData,
    getNextPageParam: (lastPage, pages) => {
      const { products } = lastPage;
      if (products.length >= limit) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, fetchNextPage]);

  return (
    <>
      <Sorting />
      <div className="products">
        {data?.pages.map((page, index) => (
          <Products key={index} products={page.products} />
        ))}
      </div>
      {isFetching && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}
      <button
        className="btn-load_more"
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
        ref={ref}
        style={{ display: data && hasNextPage ? "block" : "none" }}
      >
        Load more
      </button>
    </>
  );
};
export default Filter;
