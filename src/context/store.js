import React, { useContext, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
export const Store = React.createContext();

export const ContextProvider = ({ children }) => {
  const { search } = useLocation();
  const { page, sort } = useMemo(() => {
    const page = new URLSearchParams(search).get("page") || 1;
    const sort = new URLSearchParams(search).get("sort") || "-createdAt";
    return { page: Number(page), sort };
  }, [search]);
  const value = { page, sort };
  return <Store.Provider value={value}>{children}</Store.Provider>;
};

export const useMyContext = () => useContext(Store);
