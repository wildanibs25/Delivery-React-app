import React, { useState } from "react";
import { CgArrowUpO } from "react-icons/cg";


const ButtonToTop = () => {

  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <div>
      <button
        className="bottom-5 right-3 fixed rounded-full bg-red-600"
        onClick={scrollToTop}
        style={{ display: visible ? "inline" : "none" }}
      >
        <CgArrowUpO className="h-7 w-7 text-white" />
      </button>
    </div>
  );
};

export default ButtonToTop;
