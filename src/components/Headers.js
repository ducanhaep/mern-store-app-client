import { useState } from "react";
import { Link } from "react-router-dom";
import FilterForm from "./FilterForm";
import Modal from "./Modal";
import ProductForm from "./ProductForm";
import SearchForm from "./SearchForm";

const Headers = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <header>
      <nav>
        <p>
          <Link to="/">Home</Link>
        </p>
        <p onClick={() => setOpenProduct(true)}>Create Product</p>
        <p onClick={() => setOpenSearch(true)}>Search</p>
        <p onClick={() => setOpenFilter(true)}>Filter</p>
      </nav>

      {/* Modal Search */}
      {openSearch && (
        <Modal titleTxt="Search" setOpen={setOpenSearch}>
          <SearchForm />
        </Modal>
      )}

      {/* Modal Filter */}
      {openFilter && (
        <Modal titleTxt="Filter Price" setOpen={setOpenFilter}>
          <FilterForm />
        </Modal>
      )}
      {/* Modal Product */}
      {openProduct && (
        <Modal titleTxt="Create Product" setOpen={setOpenProduct}>
          <ProductForm btnTxt="Add" />
        </Modal>
      )}
    </header>
  );
};
export default Headers;
