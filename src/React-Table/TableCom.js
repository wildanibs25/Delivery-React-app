/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
import { resolveRecord } from "./resolveRecord";
import { Card, Pagination, TextInput } from "flowbite-react";
import { FaSearch, FaSortDown, FaSortUp } from "react-icons/fa";
import { FormatRupiah } from "../component/FormatRupiahCom";
import { FaTimes } from "react-icons/fa";

const TableCom = ({ model, isLoading, totalTable, keyword }) => {
  //state DataTable
  const [state, setState] = useState({
    records: [],
    keywords: keyword || "",
    perPage: model.perPage,
    sortField: "",
    sortOrder: "",
    currentPage: 1,
    sizePage: 0,
  });

  //Sort
  const onSort = (columns) => {
    if (!columns.sortable) return;
    const { field } = columns;
    const sortOrder = state.sortOrder
      ? field === state.sortField
        ? state.sortOrder === "asc"
          ? "desc"
          : ""
        : "asc"
      : "asc";

    const sortField = sortOrder === "" ? "" : field;
    setState((state) => ({
      ...state,
      sortOrder,
      sortField,
    }));
  };

  const sortRecords = (records) => {
    if (!state.sortField) return records;
    return records.sort((recordA, recordB) => {
      const valueA = resolveRecord(recordA, state.sortField) || "";
      const valueB = resolveRecord(recordB, state.sortField) || "";
      return valueA > valueB
        ? state.sortOrder === "desc"
          ? -1
          : +1
        : state.sortOrder === "desc"
        ? +1
        : -1;
    });
  };

  //Search
  const onSearch = (keywords) => {
    setState((state) => ({
      ...state,
      keywords,
    }));
  };

  const searchRecord = (records) => {
    if (!state.keywords) return records;
    return records.filter((record) => {
      let isMatch = false;
      model.columns.forEach((column) => {
        if (isMatch) return;
        let value = resolveRecord(record, column.field) || "";
        if (
          value.toString().toLowerCase().includes(state.keywords.toLowerCase())
        ) {
          isMatch = true;
        }
      });
      return isMatch;
    });
  };

  //Number of rows
  const onPerPage = (perPage) => {
    setState((state) => ({
      ...state,
      perPage,
    }));
  };

  //pagination
  const onPageChange = (currentPage) => {
    setState((state) => ({
      ...state,
      currentPage,
    }));
  };

  const pageCheck = (sizePage) => {
    if (sizePage % state.perPage === 0) {
      sizePage = sizePage / state.perPage;
      setState((state) => ({
        ...state,
        sizePage,
      }));
    } else {
      const range = sizePage % state.perPage;
      sizePage = (sizePage - range) / state.perPage + 1;
      setState((state) => ({
        ...state,
        sizePage,
      }));
    }
  };

  const renderContent = (rec, col) => {
    if (col.component) {
      return col.component(rec, col) || "-";
    } else {
      return resolveRecord(rec, col.field) || "-";
    }
  };

  useEffect(() => {
    let records = Array.from(model.records);
    records = searchRecord(records);
    records = sortRecords(records);
    pageCheck(records.length);
    records = records.splice(
      (state.currentPage - 1) * state.perPage,
      state.perPage
    );
    setState((state) => ({
      ...state,
      records,
    }));
  }, [
    state.keywords,
    state.perPage,
    state.sortField,
    state.sortOrder,
    state.currentPage,
    model.records,
  ]);

  return (
    <Card>
      {model.search && (
        <div className="relative">
          <TextInput
            className="mb-3 w-1/3 ml-auto"
            sizing="sm"
            value={state.keywords}
            type={"text"}
            icon={FaSearch}
            placeholder="Search..."
            onChange={(e) => onSearch(e.target.value)}
          />
          {state.keywords.length > 0 && (
            <div
              onClick={() => {
                setState((state) => ({
                  ...state,
                  keywords: "",
                }));
              }}
              className={`text-gray-400 absolute inset-y-0 -top-2.5 right-3 flex text-sm items-center pl-3 cursor-pointer`}
            >
              <FaTimes />
            </div>
          )}
        </div>
      )}
      <div className="overflow-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {(totalTable ? totalTable.matches : true) && (
                <th scope="col" className="py-3 px-3">
                  <div className="flex items-center">No</div>
                </th>
              )}

              {model.columns.map((col, index) => {
                return (
                  <th
                    scope="col"
                    className={`py-3 px-6 ${col.sortable && "cursor-pointer"}`}
                    key={index}
                    onClick={() => onSort(col)}
                  >
                    <div className="flex items-center">
                      {col.header}
                      <span className="ml-auto">
                        {col.field === state.sortField ? (
                          state.sortOrder === "asc" ? (
                            <FaSortUp />
                          ) : state.sortOrder === "desc" ? (
                            <FaSortDown />
                          ) : undefined
                        ) : undefined}
                      </span>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {isLoading < 1 ? (
              <tr>
                <td colSpan={model.columns.length + 1} className={"h-36"}>
                  <div className="grid place-items-center h-full w-full">
                    <div className="spinner"></div>
                  </div>
                </td>
              </tr>
            ) : state.records.length ? (
              <Fragment>
                {state.records.map((rec, indexJ) => {
                  return (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      key={indexJ}
                    >
                      {(totalTable ? totalTable.matches : true) && (
                        <td className="py-4 px-6 object-cover">
                          {(state.currentPage - 1) * state.perPage + indexJ + 1}
                        </td>
                      )}

                      {model.columns.map((col, indexK) => {
                        return (
                          <td
                            className={`${
                              (totalTable ? totalTable.matches : true)
                                ? "py-4 px-6"
                                : "px-1 text-center"
                            } ${
                              model.detail.length > 0
                                ? "cursor-pointer"
                                : undefined
                            } `}
                            key={indexK}
                            onClick={
                              model.detail.length > 0
                                ? () => model.detail(rec)
                                : undefined
                            }
                          >
                            {renderContent(rec, col)}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
                {totalTable && (
                  <Fragment>
                    <tr className="bg-white">
                      {(totalTable ? totalTable.matches : true) && (
                        <td colSpan={model.columns.length - 1}></td>
                      )}
                      <td className="pt-10 px-6 object-cover">SubTotal</td>
                      <td className="pt-10 px-6 object-cover">
                        {FormatRupiah(totalTable.subTotal)}
                      </td>
                    </tr>
                    <tr className="bg-white">
                      {(totalTable ? totalTable.matches : true) && (
                        <td colSpan={model.columns.length - 1}></td>
                      )}

                      <td className="py-4 px-6 object-cover border-b dark:bg-gray-600 dark:border-gray-700">
                        Delivery Cost
                      </td>
                      <td className="py-4 px-6 object-cover border-b dark:bg-gray-600 dark:border-gray-700 pl-7">
                        {FormatRupiah(totalTable.deliveryCost)}
                      </td>
                    </tr>
                    <tr className="bg-white">
                      {(totalTable ? totalTable.matches : true) && (
                        <td colSpan={model.columns.length - 1}></td>
                      )}

                      <td className="py-4 px-6 object-cover border-b dark:bg-gray-600 dark:border-gray-700">
                        Total
                      </td>
                      <td className="py-4 px-6 object-cover border-b dark:bg-gray-600 dark:border-gray-700">
                        {FormatRupiah(totalTable.total_harga)}
                      </td>
                    </tr>
                  </Fragment>
                )}
              </Fragment>
            ) : (
              <tr>
                <td
                  colSpan={model.columns.length + 1}
                  className="text-center text-2xl py-10"
                >
                  Data Not Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center">
        {model.records.length > 5 && (
          <select
            id="countries"
            className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-18 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={state.perPage}
            onChange={(e) => onPerPage(e.target.value)}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
          </select>
        )}
        {state.sizePage > 1 ? (
          <Pagination
            className="ml-auto"
            currentPage={state.currentPage}
            totalPages={state.sizePage}
            onPageChange={onPageChange}
          />
        ) : undefined}
      </div>
    </Card>
  );
};

export default TableCom;
