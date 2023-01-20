import { Alert } from "flowbite-react";
import React from "react";
import { HiInformationCircle } from "react-icons/hi";

const AlertCom = () => {
  const Danger = (arr) => {
    return (
      <small className="flex mb-2 font-small text-red-600 items-center space-x-2">
        <HiInformationCircle className="w-4 h-4" /> {arr}
      </small>
    );
  };

  const Accent = () => {
    return (
      <Alert color="warning" rounded={false}>
        <span className="font-medium">
          You do not agree to these terms and conditions!
        </span>
      </Alert>
    );
  };

  return { Danger, Accent };
};

export default AlertCom;
