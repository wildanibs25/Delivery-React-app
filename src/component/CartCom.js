import React, { useState } from "react";
import { useAuth } from "../service/auth";

import ModalCom from "./ModalCom";

const CartItem = (props) => {
  const auth = useAuth();
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    auth.user && (
      <span style={{ display: visible ? "inline" : "none" }}>
        <ModalCom counter={props} />
      </span>
    )
  );
};

export default CartItem;
