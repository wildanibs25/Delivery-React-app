import { Badge, Button } from "flowbite-react";
import React from "react";
import { HiClock, HiShoppingCart } from "react-icons/hi";
import { FormatRupiah } from "./FormatRupiah";

const Item = (props) => {
  const { menu, selectItem } = props;
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
          className="lg:h-48 md:h-36 w-full object-cover object-center"
          src={gambar_menu}
          alt="blog"
        />
        <div className="p-6">
          <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
            {kategori_menu}
          </h2>
          <h1 className="title-font text-lg font-medium text-gray-900 mb-1">
            {nama_menu}
          </h1>
          <h1 className="text-gray-900 mb-1">{FormatRupiah(harga_menu)}</h1>
          <p className="leading-relaxed text-sm mb-3">{deskripsi_menu}</p>
          <div className="flex items-center flex-nowrap ">
            {status_menu !== "Tersedia" ? (
              <Badge className="px-3" color="indigo" icon={HiClock}>
                Sedang Tidak Tersedia
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

            <span className="text-gray-400 pl-2 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm py-1 border-gray-200">
              <HiShoppingCart
                className="w-4 h-4 mr-1"
                stroke="currentColor"
                strokeWidth={2}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              />
              1.2K
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
