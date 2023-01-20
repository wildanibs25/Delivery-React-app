import React, { useEffect, useState } from "react";
import {
  FaClipboardCheck,
  FaHotdog,
  FaTruck,
  FaRegKissWinkHeart,
} from "react-icons/fa";

const StepCom = ({ status }) => {
  const [status1, setStatus1] = useState(false);
  const [status2, setStatus2] = useState(false);
  const [status3, setStatus3] = useState(false);

  useEffect(() => {
    if (status === "Processed") {
      setStatus1(true);
    } else if (status === "Delivered") {
      setStatus1(true);
      setStatus2(true);
    } else if (status === "Finished") {
      setStatus1(true);
      setStatus2(true);
      setStatus3(true);
    } else {
      setStatus1(false);
      setStatus2(false);
      setStatus3(false);
    }
  }, [status]);

  return (
    <div className="w-full py-6">
      <div className="flex">
        <div className="w-1/4">
          <div className="relative mb-2">
            <div className="w-10 h-10 mx-auto bg-green-500 rounded-full text-lg text-white flex items-center">
              <span className="text-center text-white w-full">
                <FaClipboardCheck className="w-full fill-current" />
              </span>
            </div>
          </div>
          <div className="text-xs text-center md:text-base">Order</div>
        </div>
        <div className="w-1/4">
          <div className="relative mb-2">
            <div
              className="absolute flex align-center items-center align-middle content-center"
              style={{
                width: "calc(100% - 2.5rem - 1rem)",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                <div
                  className={`${
                    status1 ? "w-full" : "w-0"
                  } bg-green-300 py-1 rounded`}
                />
              </div>
            </div>
            <div
              className={`w-10 h-10 mx-auto ${
                status1 ? "bg-green-500" : "bg-white border-2 border-gray-200"
              }  rounded-full text-lg text-white flex items-center`}
            >
              <span
                className={`text-center ${
                  status1 ? "text-white" : "text-gray-600"
                }  w-full`}
              >
                <FaHotdog className="w-full fill-current" />
              </span>
            </div>
          </div>
          <div className="text-xs text-center md:text-base">Processed</div>
        </div>
        <div className="w-1/4">
          <div className="relative mb-2">
            <div
              className="absolute flex align-center items-center align-middle content-center"
              style={{
                width: "calc(100% - 2.5rem - 1rem)",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                <div
                  className={`${
                    status2 ? "w-full" : "w-0"
                  } bg-green-300 py-1 rounded`}
                />
              </div>
            </div>
            <div
              className={`w-10 h-10 mx-auto ${
                status2 ? "bg-green-500" : "bg-white border-2 border-gray-200"
              }  rounded-full text-lg text-white flex items-center`}
            >
              <span
                className={`text-center ${
                  status2 ? "text-white" : "text-gray-600"
                }  w-full`}
              >
                <FaTruck className="w-full fill-current" />
              </span>
            </div>
          </div>
          <div className="text-xs text-center md:text-base">Delivered</div>
        </div>
        <div className="w-1/4">
          <div className="relative mb-2">
            <div
              className="absolute flex align-center items-center align-middle content-center"
              style={{
                width: "calc(100% - 2.5rem - 1rem)",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                <div
                  className={`${
                    status3 ? "w-full" : "w-0"
                  } bg-green-300 py-1 rounded`}
                />
              </div>
            </div>
            <div
              className={`w-10 h-10 mx-auto ${
                status3 ? "bg-green-500" : "bg-white border-2 border-gray-200"
              }  rounded-full text-lg text-white flex items-center`}
            >
              <span
                className={`text-center ${
                  status3 ? "text-white" : "text-gray-600"
                }  w-full`}
              >
                <FaRegKissWinkHeart className="w-full fill-current" />
              </span>
            </div>
          </div>
          <div className="text-xs text-center md:text-base">Finished</div>
        </div>
      </div>
    </div>
  );
};

export default StepCom;
