import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { getData } from "../api/productApi";
import Pagination from "../components/Pagination";
import Products from "../components/Products";
import Sorting from "../components/Sorting";
import { useMyContext } from "../context/store";

const Home = () => {
  const [limit, setLimit] = useState(5);
  const { page, sort } = useMyContext();
  const queryClient = useQueryClient();

  const key = `/products?limit=${limit}&page=${page}&sort=${sort}`;
  // const key1 = `/products?limit=${limit}&page=${page}&sort=${sort}`;
  queryClient.setQueryData("keys", { k1: key, k2: "" });

  const { data, error, refetch, isFetching, isPreviousData } = useQuery({
    queryKey: key,
    queryFn: getData,
    keepPreviousData: true,
  });

  const totalPages = useMemo(() => {
    if (!data) return 0;
    return Math.ceil(data.count / limit);
  }, [data?.count, limit]);

  // useEffect(
  //   () => async () => {
  //     await queryClient.prefetchQuery(key1, getData);
  //   },
  //   [key1]
  // );

  return (
    <div>
      <Sorting page={page} />
      <div className="products">
        {data && <Products products={data.products} />}
      </div>

      {isPreviousData && isFetching && <h2>Loading...</h2>}
      {error && (
        <p style={{ textAlign: "center", color: "red" }}>{error.message}</p>
      )}
      <Pagination totalPages={totalPages} />
    </div>
  );
};
export default Home;
