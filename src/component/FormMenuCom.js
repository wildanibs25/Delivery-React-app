/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
import {
  Button,
  Card,
  Label,
  Select,
  Textarea,
  TextInput,
} from "flowbite-react";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useAuth } from "../service/auth";
import Axios from "../service/axios";
import { AlertCom, SegmentErrorCom, TimerAlert } from ".";
import { HiCloudUpload } from "react-icons/hi";
import baseURL from "../service/baseURL";

const FormMenuCom = ({
  fetchDataMenu,
  setShowForm,
  showForm,
  setRecords,
  records,
}) => {
  const auth = useAuth();
  const url = baseURL();
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [imageDisplay, setImageDisplay] = useState("");
  const [validation, setValidation] = useState([]);
  const cookies = new Cookies();

  const fetchRecordMenu = () => {
    setId(records.id_menu);
    setName(records.nama_menu);
    setPrice(records.harga_menu);
    setCategory(records.kategori_menu);
    setDescription(records.deskripsi_menu);
    setImageDisplay(url+records.gambar_menu);
  };

  const clearRecordsMenu = () => {
    setId("");
    setName("");
    setPrice("");
    setImage("");
    setCategory("");
    setImageDisplay("");
    setDescription("");
  };

  const onChangeImage = (file) => {
    setImageDisplay(URL.createObjectURL(file[0]));
    setImage(file[0]);
  };

  const onMenu = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Axios.defaults.headers.common["Authorization"] = `Bearer ${cookies.get(
      "ACCESS_TOKEN"
    )}`;

    formData.append("name", name);
    formData.append("price", price);
    formData.append("image", image);
    formData.append("category", category);
    formData.append("description", description);

    await Axios.post(
      `${id === "" ? "add-menu" : "update-menu/" + id} `,
      formData
    )
      .then(() => {
        clearRecordsMenu();
        TimerAlert().Toast.fire({
          icon: "success",
          title: `${
            id === "" ? "Add Menu Successfully!" : "Update Menu Successfully!"
          }`,
        });
        fetchDataMenu();
        setShowForm(false);
      })
      .catch((error) => {
        if (error.response.status === 412) {
          SegmentErrorCom(error.response.data.message);
          auth.logout();
        } else {
          TimerAlert().Toast.fire({
            icon: "error",
            title: `${
              id === ""
                ? "Add Menu Unsuccessfully!"
                : "Update Menu Unsuccessfully!"
            }`,
          });
          setValidation(error.response.data.error);
        }
      });
  };

  useEffect(() => {
    if (!showForm) {
      clearRecordsMenu();
      setRecords([]);
      setValidation([]);
    }

    if (Object.keys(records).length > 0) {
      fetchRecordMenu();
    } else {
      clearRecordsMenu();
    }
  }, [showForm]);

  return (
    <Card className="w-full">
      <form onSubmit={onMenu}>
        <div className="grid gap-6 mb-6 md:grid-cols-2 w-full">
          <div>
            <TextInput
              id="id"
              type="hidden"
              value={id}
              disabled={true}
              onChange={(e) => setId(e.target.value)}
            />
            <div className="mb-6">
              <Label
                htmlFor="Name"
                color={validation.name ? "failure" : undefined}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name Menu
              </Label>
              <TextInput
                id="name"
                type="text"
                placeholder="Name"
                color={validation.name ? "failure" : undefined}
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
            <div className="mb-6">
              <Label
                htmlFor="category"
                color={validation.category ? "failure" : undefined}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Category
              </Label>
              <Select
                id="category"
                color={validation.category ? "failure" : undefined}
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  Object.keys(validation).length === 1 && validation.category
                    ? setValidation([])
                    : delete validation.category;
                }}
              >
                <option value={""}>Selected Category</option>
                <option value={"Makanan"}>Makanan</option>
                <option value={"Minuman"}>Minuman</option>
              </Select>
              {validation.category && AlertCom().Danger(validation.category[0])}
            </div>
            <div>
              <Label
                htmlFor="description"
                color={validation.description ? "failure" : undefined}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Descriptions"
                rows={4}
                color={validation.description ? "failure" : undefined}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  Object.keys(validation).length === 1 && validation.description
                    ? setValidation([])
                    : delete validation.description;
                }}
              />
              {validation.description &&
                AlertCom().Danger(validation.description[0])}
            </div>
          </div>
          <div>
            <div className="mb-6">
              <Label
                htmlFor="price"
                color={validation.price ? "failure" : undefined}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Price
              </Label>
              <TextInput
                id="price"
                type="number"
                placeholder="Price"
                color={validation.price ? "failure" : undefined}
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                  Object.keys(validation).length === 1 && validation.price
                    ? setValidation([])
                    : delete validation.price;
                }}
              />
              {validation.price && AlertCom().Danger(validation.price[0])}
            </div>
            <div className="mb-6">
              <Label
                htmlFor="image"
                color={validation.image ? "failure" : undefined}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Image
              </Label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className={`${
                    validation.image
                      ? "bg-red-50 w-full h-52 border-2 border-red-500 text-red-900 placeholder-red-700 border-dashed rounded-lg cursor-pointer focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                      : "flex flex-col items-center justify-center w-full h-52 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  } `}
                >
                  {imageDisplay ? (
                    <img
                      className="w-full h-full object-cover rounded-lg"
                      src={imageDisplay}
                      alt="image description"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <HiCloudUpload
                        className={
                          validation.image
                            ? `w-24 h-24 text-red-500 mb-5`
                            : `w-24 h-24 text-gray-400 mb-5`
                        }
                      />
                      <p
                        className={`${
                          validation.image
                            ? "mb-2 text-sm text-red-500 dark:text-red-400"
                            : "mb-2 text-sm text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p
                        className={`${
                          validation.image
                            ? "text-xs text-red-500 dark:text-red-400"
                            : "text-xs text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        PNG, JPG
                      </p>
                    </div>
                  )}
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      onChangeImage(e.target.files);
                      Object.keys(validation).length === 1 && validation.image
                        ? setValidation([])
                        : delete validation.image;
                    }}
                  />
                </label>
              </div>
              {validation.image && AlertCom().Danger(validation.image[0])}
            </div>
          </div>
        </div>
        <Button
          gradientDuoTone={
            validation.length === 0 ? "cyanToBlue" : "pinkToOrange"
          }
          outline={true}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Card>
  );
};

export default FormMenuCom;
