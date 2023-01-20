import React from "react";
import Item from "./Item";

const CardCom = ({ menu, selectItem }) => {
  
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-3 mx-auto">
        <div className="flex flex-wrap -m-4">
          {menu.map((menu) => (
            <Item key={menu.id_menu} menu={menu} selectItem={selectItem} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CardCom;
