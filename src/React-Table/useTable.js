import { useState } from "react";

export const useTable = ({ columns, records, perPage, stringURL, search, detail }) => {
  const [state, setState] = useState({
    columns: columns || [],
    records: records || [],
    perPage: perPage || 10,
    stringURL: stringURL || "",
    search: search || false,
    detail: detail || [],
  });

  const setRecords = (records) => {
    setState((state) => ({
      ...state,
      records,
    }));
  };

  const setStringURL = (stringURL) => {
    setState((state) => ({
      ...state,
      stringURL,
    }));
  };

  return { ...state, setRecords, setStringURL };
};
