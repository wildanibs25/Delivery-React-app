import Axios from "../service/axios";
import { Button, Card, Label, Radio, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logoAyam from "../storage/logoAyam.png";
import Nama from "../storage/nama";
import {
  TimerAlert,
  AlertCom,
  FormPasswordCom,
  FormDateCom,
} from "../component";

const Register = () => {
  const nama = Nama();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState("");
  const [lahir, setLahir] = useState("");
  const [jk, setJK] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [acc, setAcc] = useState(false);

  const [validation, setValidation] = useState([]);

  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("number_phone", hp);
    formData.append(
      "date",
      lahir === ""
        ? ""
        : lahir === null
        ? ""
        : lahir.toISOString().slice(0, 19).replace("T", " ")
    );
    formData.append("gender", jk);
    formData.append("password", password);
    formData.append("password_confirmation", passwordConfirm);

    if (acc) {
      formData.append("accept", "accept");
    } else {
      formData.append("accept", "");
    }

    await Axios.post("register", formData)
      .then(() => {
        TimerAlert().Modal.fire({
          icon: "success",
          title: "Signed up successfully",
          html: "<br />",
        });
        navigate("/login");
      })
      .catch((error) => {
        TimerAlert().Toast.fire({
          icon: "error",
          title: "Signed up Unsuccessfully",
        });
        setValidation(error.response.data.error);
      });
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);
  // ;
  return (
    <Card>
      <section className="bg-gray-50 dark:bg-gray-900 md:m-0 -m-6">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 my-8">
          <NavLink
            to="/"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img className="w-20 h-20 mr-2" src={logoAyam} alt={"Flowbite"} />
            {nama}
          </NavLink>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-3 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white my-6">
                Create your Free Account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={register}>
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="email"
                      color={validation.email && "failure"}
                      value="Your Email"
                    />
                  </div>
                  <TextInput
                    color={validation.email && "failure"}
                    id="email"
                    type="email"
                    placeholder="name@gmail.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      Object.keys(validation).length === 1 && validation.email
                        ? setValidation([])
                        : delete validation.email;
                    }}
                  />
                  {validation.email && AlertCom().Danger(validation.email[0])}
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="name"
                      color={validation.name && "failure"}
                      value="Your Name"
                    />
                  </div>
                  <TextInput
                    color={validation.name && "failure"}
                    id="name"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      Object.keys(validation).length === 1 && validation.name
                        ? setValidation([])
                        : delete validation.name;
                    }}
                  />
                  {validation.name && AlertCom().Danger(validation.name[0])}
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="hp"
                      color={validation.number_phone && "failure"}
                      value="Your Phone Number"
                    />
                  </div>
                  <TextInput
                    color={validation.number_phone && "failure"}
                    id="hp"
                    type="tel"
                    placeholder="0862-1234-5678"
                    min={0}
                    pattern="[0-9]{4}-[0-9]{4}-[0-9]{4}"
                    value={hp}
                    onChange={(e) => {
                      setHp(e.target.value);
                      Object.keys(validation).length === 1 &&
                      validation.number_phone
                        ? setValidation([])
                        : delete validation.number_phone;
                    }}
                  />
                  {validation.number_phone &&
                    AlertCom().Danger(validation.number_phone[0])}
                </div>
                <div className="relative">
                  <div className="mb-2 block">
                    <Label
                      htmlFor="Date_of_Birth"
                      color={validation.date && "failure"}
                      value="Your Date of Birth"
                    />
                  </div>
                  <FormDateCom
                    id="date"
                    color={validation.date && "failure"}
                    value={lahir}
                    onChange={(e) => {
                      setLahir(e);
                      Object.keys(validation).length === 1 && validation.date
                        ? setValidation([])
                        : delete validation.date;
                    }}
                  />
                  {validation.date && AlertCom().Danger(validation.date[0])}
                </div>
                <div>
                  <fieldset className="flex flex-col gap-2" id="radio">
                    <Label
                      htmlFor="Date_of_Birth"
                      color={validation.gender && "failure"}
                      value="Choose your Gender"
                    />
                    <div className="flex gap-4 pt-2">
                      <div className="flex items-center gap-2 ml-2">
                        <Radio
                          className={
                            validation.gender &&
                            "bg-red-50 mb-3 border-2 border-solid border-red-600 text-red-900 text-sm rounded-full focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                          }
                          id="male"
                          name="genre"
                          value="L"
                          checked={jk === "L"}
                          onChange={(e) => {
                            setJK(e.target.value);
                            Object.keys(validation).length === 1 &&
                            validation.gender
                              ? setValidation([])
                              : delete validation.gender;
                          }}
                        />
                        <Label
                          color={validation.gender && "failure"}
                          htmlFor="male"
                        >
                          Male
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Radio
                          className={
                            validation.gender &&
                            "bg-red-50 mb-3 border-2 border-solid border-red-600 text-red-900 text-sm rounded-full focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                          }
                          id="female"
                          name="genre"
                          value="P"
                          checked={jk === "P"}
                          onChange={(e) => {
                            setJK(e.target.value);
                            Object.keys(validation).length === 1 &&
                            validation.gender
                              ? setValidation([])
                              : delete validation.gender;
                          }}
                        />
                        <Label
                          color={validation.gender && "failure"}
                          htmlFor="female"
                        >
                          Female
                        </Label>
                      </div>
                    </div>
                  </fieldset>
                  {validation.gender && AlertCom().Danger(validation.gender[0])}
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="password"
                      color={validation.password && "failure"}
                      value="Your Password"
                    />
                  </div>
                  <FormPasswordCom
                    color={validation.password && "failure"}
                    id="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      Object.keys(validation).length === 1 &&
                      validation.password
                        ? setValidation([])
                        : delete validation.password;
                    }}
                  />
                  {validation.password ? (
                    AlertCom().Danger(validation.password[0])
                  ) : (
                    <Label
                      htmlFor="password"
                      className="text-xs"
                      value="Password more 6 character"
                    />
                  )}
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="password_confirmation"
                      color={validation.password && "failure"}
                      value="Your Password Confirmation"
                    />
                  </div>
                  <FormPasswordCom
                    color={validation.password && "failure"}
                    id="password_confirmation"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    disabled={password.length < 6}
                  />
                </div>
                <div className="flex flex-col gap-4 pt-5" id="checkbox">
                  {validation.accept && AlertCom().Accent()}
                  <div className="flex items-center gap-2">
                    <input
                      id="checkbox-1"
                      type="checkbox"
                      style={{ content: "X", color: "#fff" }}
                      value={acc}
                      className={
                        validation.accept
                          ? "w-4 h-4 text-blue-600 bg-red-300 border-2 border-solid border-red-600 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          : !acc
                          ? "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          : "w-4 h-4 text-blue-600 bg-blue-500 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      }
                      onClick={() => {
                        setAcc(!acc);
                        Object.keys(validation).length === 1 &&
                        validation.accept
                          ? setValidation([])
                          : delete validation.accept;
                      }}
                    />
                    <Label
                      color={validation.accept && "failure"}
                      htmlFor="accept"
                    >
                      I agree to the{" "}
                      <NavLink
                        to="/information/terms"
                        className="text-blue-600 hover:underline dark:text-blue-500"
                      >
                        terms and conditions
                      </NavLink>
                    </Label>
                  </div>
                </div>
                <Button
                  gradientDuoTone={
                    validation.length !== 0 ? "pinkToOrange" : "cyanToBlue"
                  }
                  className="w-full"
                  type="submit"
                >
                  Sign in
                </Button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <NavLink
                    to={"/login"}
                    className="font-medium text-blue-600 hover:underline dark:text-primary-500"
                  >
                    Login here
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

export default Register;
