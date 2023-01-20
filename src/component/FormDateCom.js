import React from "react";
import DatePicker from "react-datepicker";
import { getMonth, getYear } from "date-fns";
import { Select } from "flowbite-react";
import range from "lodash/range";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { HiCalendar } from "react-icons/hi";
import "react-datepicker/dist/react-datepicker.css";

const FormDateCom = ({ id, color, value, onChange }) => {
  const years = range(1990, getYear(new Date()) + 1, 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
      <div className="relative">
        <DatePicker
          id={id}
          className={
            color
              ? "bg-red-50 border border-red-300 placeholder-red-700 text-red-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full pl-10 p-2.5 dark:bg-red-700 dark:border-red-600 dark:placeholder-red-400 dark:text-red-900 dark:focus:ring-red-500 dark:focus:border-red-500"
              : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          }
          renderCustomHeader={({
            date,
            changeYear,
            changeMonth,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div
              style={{
                margin: 10,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button
                type="button"
                className="mr-2"
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
              >
                <BiLeftArrow />
              </button>
              <Select
                className="w-1/2"
                value={getYear(date)}
                onChange={({ target: { value } }) => changeYear(value)}
              >
                {years.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
              <Select
                className="w-1/2"
                value={months[getMonth(date)]}
                onChange={({ target: { value } }) =>
                  changeMonth(months.indexOf(value))
                }
              >
                {months.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
              <button
                type="button"
                className="ml-2"
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
              >
                <BiRightArrow />
              </button>
            </div>
          )}
          isClearable
          // withPortal
          dateFormat={"MMMM d, yyy"}
          selected={value ? new Date(value) : null }
          onChange={onChange}
          placeholderText="Select a date"
        />
        <div
          className={`${
            color ? "text-red-500" : "text-gray-400"
          } absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none`}
        >
          <HiCalendar />
        </div>
      </div>
  );
};

export default FormDateCom;
