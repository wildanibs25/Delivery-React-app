/* eslint-disable react-hooks/exhaustive-deps */
import { Pagination } from "flowbite-react";
import React, { useEffect, useState } from "react";
import Item from "./ItemCom";

const CardCom = ({ menu, selectItem }) => {
  const isMobile = window.matchMedia("only screen and (max-width: 830px)");

  const [state, setState] = useState({
    records: [],
    perPage: 3,
    currentPage: 1,
    sizePage: 0,
  });

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

  useEffect(() => {
    let records = Array.from(menu);
    if (!isMobile.matches) {
      setState((state) => ({
        ...state,
        records,
      }));
    } else {
      pageCheck(records.length);
      records = records.splice(
        (state.currentPage - 1) * state.perPage,
        state.perPage
      );
      setState((state) => ({
        ...state,
        records,
      }));
    }
  }, [state.perPage, state.currentPage, menu, isMobile.matches]);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-3 mx-auto">
        <div className="flex flex-wrap -m-4">
          {state.records.map((menu) => (
            <Item
              key={menu.id_menu}
              menu={menu}
              selectItem={selectItem}
              matches={isMobile.matches}
            />
          ))}
        </div>
        {isMobile.matches && (
          <div className="mt-9 -mx-6">
            <Pagination
              className="mx-auto grid place-items-center"
              currentPage={state.currentPage}
              totalPages={state.sizePage}
              onPageChange={onPageChange}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default CardCom;
