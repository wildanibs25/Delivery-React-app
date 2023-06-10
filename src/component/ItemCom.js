import { Badge, Button } from "flowbite-react";
import React, { useState } from "react";
import { HiClock, HiShoppingCart } from "react-icons/hi";
import baseURL from "../service/baseURL";
import { FormatRupiah } from "./FormatRupiahCom";

const Item = (props) => {
  const url = baseURL();
  const [open, isOpen] = useState(false);
  const { menu, selectItem, matches } = props;
  const {
    kategori_menu,
    nama_menu,
    harga_menu,
    deskripsi_menu,
    gambar_menu,
    status_menu,
  } = menu;

  return (
    <div className="p-4 md:w-1/3">
      <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
        <img
          className="h-48 md:h-36 w-full object-cover object-center"
          src={url + gambar_menu}
          alt="blog"
        />
        <div className="p-6">
          <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
            {kategori_menu}
          </h2>
          <h1 className="title-font text-lg font-medium text-gray-900 mb-1">
            {nama_menu}
          </h1>
          <h1 className={`text-gray-900 mb-1 ${!matches && "hidden"}`}>
            {FormatRupiah(harga_menu)}
          </h1>
          <p
            className="leading-relaxed text-sm mb-3 cursor-pointer"
            onClick={() => isOpen(!open)}
          >
            {deskripsi_menu.length <= 80 ? (
              <span>{deskripsi_menu}</span>
            ) : open ? (
              <span>{deskripsi_menu}</span>
            ) : (
              <span>
                {deskripsi_menu.substring(0, 80) + "..."}
                <span className="text-blue-400"> More</span>
              </span>
            )}
          </p>
          <div className="flex items-center">
            {status_menu !== "Available" ? (
              <Badge className="px-3 my-2" color="indigo" icon={HiClock}>
                Not Available
              </Badge>
            ) : (
              <Button
                outline={true}
                gradientDuoTone="greenToBlue"
                onClick={() => selectItem(menu)}
              >
                <HiShoppingCart className="mr-2 h-5 w-5" />
                Order
              </Button>
            )}

            <span
              className={`text-gray-400 pl-2 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-base py-1 border-gray-200 ${
                matches && "hidden"
              }`}
            >
              {FormatRupiah(harga_menu)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
