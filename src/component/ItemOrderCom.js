import { Avatar } from "flowbite-react";
import React, { useEffect, useState } from "react";
import Counter from "./CounterCom";
import baseURL from "../service/baseURL";

const ItemOrder = (props) => {
  const {
    items: { id_item, qty, menu },
    counter,
    editItem,
  } = props;

  const url = baseURL();
  const { nama_menu, harga_menu, gambar_menu } = menu;

  const [itemQty, setItemQty] = useState(0);

  const changeEditItem = (qty) => {
    editItem(id_item, qty);
    setItemQty(qty);
  };

  const breakPoint = (nama) => {
    var arrayNama = nama.split(" ");
    if (arrayNama.length > 2) {
      arrayNama.splice(2, 0, "<br />");
      arrayNama = arrayNama.join(" ");
      return arrayNama;
    } else {
      return nama;
    }
  };

  useEffect(() => {
    setItemQty(qty);
  }, [qty]);

  return (
    itemQty > 0 && (
      <tr className="bg-white dark:bg-gray-800">
        <th
          scope="row"
          className="font-medium text-gray-900 whitespace-nowrap dark:text-white py-1.5"
        >
          <Avatar img={url + gambar_menu} />
          <span
            dangerouslySetInnerHTML={{ __html: `${breakPoint(nama_menu)}` }}
          ></span>
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
