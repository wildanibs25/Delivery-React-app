import { Button, Modal } from "flowbite-react";
import { HiShoppingCart } from "react-icons/hi";
import React, { useState } from "react";
import ItemOrder from "./ItemOrderCom";
import Axios from "../service/axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useAuth } from "../service/auth";
import SegmentErrorCom from "./SegmentErrorCom";
import { FormatRupiah } from "./FormatRupiahCom";

const ModalCom = ({ counter }) => {
  const auth = useAuth();
  const { countItem, countPrice } = counter;
  const [show, setShow] = useState(false);
  const [item, setItem] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const cookies = new Cookies();

  const showItem = async () => {
    setIsLoading(true);
    Axios.defaults.headers.common["Authorization"] = `Bearer ${cookies.get(
      "ACCESS_TOKEN"
    )}`;

    await Axios.get("item")
      .then((response) => {
        setItem(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        SegmentErrorCom(error.response.data.message);
        auth.logout();
        navigate("/login");
      });
  };

  const editItem = async (id, qty) => {
    const formData = new FormData();
    Axios.defaults.headers.common["Authorization"] = `Bearer ${cookies.get(
      "ACCESS_TOKEN"
    )}`;

    if (qty > 0) {
      formData.append("id_item", id);
      formData.append("qty", qty);
      await Axios.post("update-item", formData).catch((error) => {
        SegmentErrorCom(error.response.data.message);
        auth.logout();
        navigate("/login");
      });
    } else {
      if (countItem === 1) {
        setShow(false);
      }
      formData.append("id_item", id);
      await Axios.post("delete-item", formData).catch((error) => {
        SegmentErrorCom(error.response.data.message);
        auth.logout();
        navigate("/login");
      });
    }
  };

  return (
    <React.Fragment>
      <Button
        gradientDuoTone="pinkToOrange"
        className="bottom-56 left-1 fixed w-11"
        color="failure"
        onClick={() => {
          setShow(true);
          showItem();
        }}
      >
        <HiShoppingCart className="h-4 w-4 text-white" />
        {countItem > 0 && <sub className="-text-base">{countItem}</sub>}
      </Button>

      <Modal
        className="w-auto duration-1000"
        size="lg"
        style={{ zIndex: 10 }}
        show={show}
        onClose={() => setShow(false)}
      >
        <Modal.Header>Cart</Modal.Header>
        <Modal.Body>
          {countItem > 0 ? (
            <div className="overflow-x-auto relative">
              <table className="w-full text-sm text-gray-500 dark:text-gray-400 text-center">
                <thead className="text-xs text-gray-700 uppercase bg-white-100 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="py-3 px-4 rounded-l-lg">Menu</th>
                    <th className="py-3 px-4 w-1">Qty</th>
                    <th className="py-3 px-4 rounded-r-lg">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={3}>
                        <div className="grid place-items-center my-5">
                          <div className="spinner"></div>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    item.map((items) => (
                      <ItemOrder
                        editItem={editItem}
                        counter={counter}
                        items={items}
                        key={items.id_item}
                      />
                    ))
                  )}
                </tbody>
                <tfoot>
                  <tr className="font-semibold text-gray-900 dark:text-white">
                    <th
                      colSpan={4}
                      scope="row"
                      className="pt-12 px-6 text-base"
                    >
                      <Button
                        className="w-full"
                        gradientDuoTone="pinkToOrange"
                        pill={true}
                        onClick={() => {
                          !isLoading &&
                            navigate("checkout", {
                              state: {
                                totalPrice: countPrice,
                              },
                            });
                        }}
                      >
                        Checkout
                        {!isLoading ? (
                          <span className="ml-1">
                            - {FormatRupiah(countPrice)}
                          </span>
                        ) : (
                          <div className="ml-2 flex items-center justify-center space-x-2">
                            <div className="w-1 h-1 rounded-full animate-pulse bg-white"></div>
                            <div className="w-1 h-1 rounded-full animate-pulse bg-white"></div>
                            <div className="w-1 h-1 rounded-full animate-pulse bg-white"></div>
                          </div>
                        )}
                      </Button>
                    </th>
                  </tr>
                </tfoot>
              </table>
            </div>
          ) : (
            <h1>You have not selected Orders</h1>
          )}
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default ModalCom;
