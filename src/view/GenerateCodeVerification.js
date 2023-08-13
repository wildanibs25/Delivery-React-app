/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useAuth } from "../service/auth";
import Cookies from "universal-cookie";
import Axios from "../service/axios";
import { useNavigate } from "react-router-dom";
import { Card } from "flowbite-react";
import logoAyam from "../storage/logoAyam.png";
import Nama from "../storage/nama";
import { SegmentErrorCom, TimerAlert } from "../component";

const GenerateCodeVerification = () => {
  const auth = useAuth();
  const nama = Nama();
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const cookies = new Cookies();

  const navigate = useNavigate();

  const reverification = async () => {
    setIsLoading(true);
    Axios.defaults.headers.common["Authorization"] = `Bearer ${cookies.get(
      "ACCESS_TOKEN"
    )}`;

    await Axios.get("regenerate-code")
      .then((response) => {
        setIsLoading(false);
        TimerAlert().Modal.fire({
          icon: "success",
          title: response.data.message,
          html: "<br />",
        });
      })
      .catch((error) => {
        setIsLoading(false);
        SegmentErrorCom(error.response.data.message);
        auth.logout();
      });
  };

  useEffect(() => {
    if (!auth.user) navigate("/login");
    if (auth.user?.email_verified_at) navigate("/");
    setUser(auth.user);
  }, [auth.user]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12 bg-white">
      <Card>
        <div className="flex-col items-center justify-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white mx-auto">
          <img className="w-20 h-20 mx-auto" src={logoAyam} alt={logoAyam} />
          {nama}
        </div>
        <div className="max-w-xl px-5 text-center">
          <h2 className="mb-2 text-[42px] font-bold text-zinc-800">
            Check your inbox
          </h2>
          <p className="mb-2 text-lg text-zinc-500">
            We are glad, that you’re with us ? We’ve sent you a verification
            link to the email address{" "}
            <span className="font-medium text-indigo-500">{user?.email}</span>.
          </p>
          <p className="mt-7 text-zinc-500 text-sm">
            If the email has not been sent, you can press the button below.
          </p>
          {isLoading ? (
            <div
              disabled
              type="button"
              className="cursor-pointer mt-3 inline-block w-96 rounded bg-current px-5 py-3 font-medium text-white shadow-md shadow-slate-500/20 bg-slate-400"
            >
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 mr-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Loading...
            </div>
          ) : (
            <div
              className="cursor-pointer mt-3 inline-block w-96 rounded bg-indigo-600 px-5 py-3 font-medium text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700"
              onClick={() => reverification()}
            >
              Send Code Again
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default GenerateCodeVerification;
