import React, { useEffect, useState } from "react";
import { TextInput } from "flowbite-react";
// import { HiPlusCircle, HiMinusCircle, HiXCircle } from "react-icons/hi";
import { FaTrashAlt, FaPlus, FaMinus } from "react-icons/fa";

const Counter = (props) => {
  const { defaultValue, defaultPrice, changeEditItem, counter } = props;

  const { countItem, countPrice, setCountItem, setCountPrice } = counter;

  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);

  const addItemQty = () => {
    setCountItem(countItem + 1);
    setCountPrice(countPrice + price);
    setQty(qty + 1);
    changeEditItem(qty + 1);
  };

  const minItemQty = () => {
    setCountItem(countItem - 1);
    setCountPrice(countPrice - price);
    setQty(qty > 0 ? qty - 1 : qty);
    changeEditItem(qty > 0 ? qty - 1 : qty);
  };

  useEffect(() => {
    setQty(defaultValue);
    setPrice(defaultPrice);
  }, [defaultValue, defaultPrice]);

  return (
    <div className="flex items-center">
      <button className="rounded-full bg-white" onClick={minItemQty}>
        {qty < 2 ? (
          <FaTrashAlt className="h-5 w-5 mx-1 text-red-600" />
        ) : (
          <FaMinus className="h-5 w-5 mx-1 text-red-600" />
        )}
      </button>

      <TextInput
        className="w-10 mx-1 text-center"
        id="qty"
        value={qty}
        style={{ textAlign: "center" }}
        readOnly
      />
      <button className="rounded-full bg-white" onClick={addItemQty}>
        <FaPlus className="h-5 w-5 mx-1 text-red-600" />
      </button>
    </div>
  );
};

export default Counter;
