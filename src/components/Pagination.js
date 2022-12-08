import React from "react";
import { useMyContext } from "../context/store";
import usePagination from "../hooks/usePagination";

const Pagination = React.memo(({ totalPages }) => {
  const { firstArr, lastArr, isActive, prev, next, jump } =
    usePagination(totalPages);
  return (
    <div className="pagination">
      <button onClick={prev}>&laquo;</button>
      {firstArr.map((num) => (
        <button
          key={num}
          className={`${isActive(num)}`}
          onClick={() => {
            jump(num);
          }}
        >
          {num}
        </button>
      ))}
      {lastArr.length > 0 && <button>...</button>}
      {lastArr.map((num) => (
        <button
          key={num}
          className={`${isActive(num)}`}
          onClick={() => {
            jump(num);
          }}
        >
          {num}
        </button>
      ))}
      <button onClick={next}>&raquo;</button>
    </div>
  );
});
export default Pagination;
