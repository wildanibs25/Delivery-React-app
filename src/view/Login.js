/* eslint-disable react-hooks/exhaustive-deps */
import Axios from "../service/axios";
import { Button, Card, Label, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Cookies from "universal-cookie";
import { useAuth } from "../service/auth";
import logoAyam from "../storage/logoAyam.png";
import Nama from "../storage/nama";
import { TimerAlert, AlertCom, FormPasswordCom } from "../component";

const Login = () => {
  const auth = useAuth();
  const nama = Nama();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sat, setSat] = useState(false);

  const [validation, setValidation] = useState([]);
  const cookies = new Cookies();

  const login = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", b64EncodeUnicode(password));

    Axios.defaults.headers.common["Authorization"] = `Bearer ${cookies.get(
      "ACCESS_TOKEN"
    )}`;

    await Axios.post("login", formData)
      .then((response) => {
        TimerAlert().Toast.fire({
          icon: "success",
          title: "Signed in successfully",
        });
        cookies.set("ACCESS_TOKEN", response.data.token, {
          path: "/",
          maxAge: 3600 * 4,
        });
        auth.login();
      })
      .catch((error) => {
        TimerAlert().Toast.fire({
          icon: "error",
          title: "Signed in Unsuccessfully",
        });
        if (error.response.status === 401) {
          if (error.response.data.error.toLowerCase().includes("email")) {
            setValidation({ email: [error.response.data.error] });
          } else {
            setValidation({ password: [error.response.data.error] });
          }
        } else if (error.response.status === 422) {
          setValidation(error.response.data.error);
        }
      });
  };

  const b64EncodeUnicode = (str) => {
    return btoa(encodeURIComponent(str));
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <Card>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 mb-28 mt-16">
          <NavLink
            to="/"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img className="w-20 h-20 mr-2" src={logoAyam} alt={"Flowbite"} />
            {nama}
          </NavLink>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form className="space-y-5 md:space-y-7" onSubmit={login}>
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="email"
                      color={validation.email ? "failure" : undefined}
                      value="Your email"
                    />
                  </div>
                  <TextInput
                    color={validation.email ? "failure" : undefined}
                    id="email"
                    type="email"
                    placeholder="name@gmail.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      Object.keys(validation).length < 2 && validation.email
                        ? setValidation([])
                        : delete validation.email;
                    }}
                  />
                  {validation.email && AlertCom().Danger(validation.email[0])}
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="password"
                      color={validation.password ? "failure" : undefined}
                      value="Your password"
                    />
                  </div>
                  <FormPasswordCom
                    color={validation.password ? "failure" : undefined}
                    id="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      Object.keys(validation).length < 2 && validation.password
                        ? setValidation([])
                        : delete validation.password;
                    }}
                  />
                  {validation.password &&
                    AlertCom().Danger(validation.password[0])}
                </div>

                <div className="w-full pt-2">
                  <Button
                    onClick={() => validation.length !== 0 && setSat(!sat)}
                    onMouseEnter={() => validation.length !== 0 && setSat(!sat)}
                    gradientDuoTone={
                      validation.length !== 0 ? "pinkToOrange" : "cyanToBlue"
                    }
                    className={`w-24 ml-auto duration-500  ${
                      sat && "md:-translate-x-72 duration-500"
                    }`}
                    type={validation.length !== 0 ? "button" : "submit"}
                  >
                    {validation.length !== 0 ? "No!" : "Sign In"}
                  </Button>
                </div>

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <NavLink
                    to={"/register"}
                    className="font-medium text-blue-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </NavLink>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Card>
  );
};

export default Login;
