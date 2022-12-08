import { useRef } from "react";
import { createProduct, handleError, updateProduct } from "../api/productApi";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
const ProductForm = ({ btnTxt, data }) => {
  const formRef = useRef();
  const queryClient = useQueryClient();
  const keys = queryClient.getQueryData("keys");
  const create = useMutation(createProduct, {
    onSuccess: () => toast.success("Create new product successfully!"),
    onError: (err) => handleError(err),
    onSettled: () =>
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.startsWith("/products"),
      }),
  });
  const update = useMutation(updateProduct, {
    onMutate: (data) => {
      if (!keys.k1) return;
      queryClient.setQueryData(keys?.k1, (oldData) => {
        const products = oldData?.products.map((product) =>
          product._id === data.id ? { ...product, ...data.newData } : product
        );
        console.log({ oldData });
        return { ...oldData, products };
      });
    },
    onSuccess: () => toast.success("Update the product successfully!"),
    onError: (err) => handleError(err),
    onSettled: () => queryClient.invalidateQueries(keys?.k2),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const children = formRef.current.children;
    const newData = [...children].reduce((obj, child) => {
      if (!child.name) return obj;
      return { ...obj, [child.name]: child.value };
    }, {});

    function shallowCompare(obj1, obj2) {
      const keys = Object.keys(obj1);
      for (let key of keys) {
        if (obj1[key] !== obj2[key]) {
          return false;
        }
        return true;
      }
    }

    if (data) {
      shallowCompare(newData, data);
      const noChange = shallowCompare(newData, data);
      if (noChange) return;
      update.mutate({ id: data._id, newData });
    } else {
      create.mutate(newData);
    }
  };
  return (
    <div className="product_form">
      <form onSubmit={handleSubmit} ref={formRef}>
        <input
          type="text"
          placeholder="Product title"
          required
          name="title"
          defaultValue={data?.title}
        />
        <input
          type="text"
          placeholder="Product description"
          required
          name="description"
          defaultValue={data?.description}
        />
        <input
          type="text"
          placeholder="Product price"
          required
          name="price"
          defaultValue={data?.price}
        />
        <input
          type="text"
          placeholder="Product category"
          required
          name="category"
          defaultValue={data?.category}
        />
        <input
          type="text"
          placeholder="Product image"
          required
          name="image"
          defaultValue={data?.image}
        />

        <button disabled={create.isLoading || update.isLoading}>
          {create.isLoading || update.isLoading ? "Loading..." : btnTxt}
        </button>
      </form>
    </div>
  );
};
export default ProductForm;
