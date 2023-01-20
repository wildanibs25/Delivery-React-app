import { Avatar } from "flowbite-react";
import React, { useEffect, useState } from "react";
import Counter from "./Counter";

const ItemOrder = (props) => {
  const {
    items: { id_item, qty, menu },
    counter,
    editItem,
  } = props;

  const { nama_menu, harga_menu, gambar_menu } = menu;

  const [itemQty, setItemQty] = useState(0);

  const changeEditItem = (qty) => {
    editItem(id_item, qty);
    setItemQty(qty);
  };

  useEffect(() => {
    setItemQty(qty);
  }, [qty]);

  return (
    itemQty > 0 && (
      <tr className="bg-white dark:bg-gray-800">
        <th
          scope="row"
          className="font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          <Avatar img={gambar_menu} />
          {nama_menu}
        </th>
        <td>
          <Counter
            defaultValue={itemQty}
            changeEditItem={changeEditItem}
            defaultPrice={harga_menu}
            counter={counter}
          />
        </td>
        <td>{itemQty * harga_menu}</td>
      </tr>
    )
  );
};

export default ItemOrder;
