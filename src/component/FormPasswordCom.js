import { TextInput } from "flowbite-react";
import React, { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
const FormPasswordCom = ({ id, color, value, onChange, disabled }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <TextInput
        color={color}
        id={id}
        type={show ? "text" : "password"}
        placeholder="••••••"
        autoComplete={"on"}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {value.length > 0 && (
        <div
          onClick={() => setShow(!show)}
          className={`${
            color ? "text-red-500" : "text-gray-400"
          } absolute inset-y-0 right-4 flex text-xl items-center pl-3 cursor-pointer`}
        >
          {show ? <FaEyeSlash /> : <FaEye />}
        </div>
      )}
    </div>
  );
};

export default FormPasswordCom;
