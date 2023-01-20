import Swal from "sweetalert2";
import TimerAlert from "./TimerAlert";

const ConfirmLogout = (auth) => {
  return Swal.fire({
    title: "Are you sure?",
    text: "You will exit the application",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes!",
    cancelButtonText: "No!",
    customClass: {
      confirmButton:
        "text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2",
      cancelButton:
        "text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2",
    },
    buttonsStyling: false,
  }).then((result) => {
    if (result.isConfirmed) {
      TimerAlert().Modal.fire({
        icon: "success",
        title: "Signed out successfully",
        html: "<br />",
      });
      auth.logout();
    }
  });
};

export default ConfirmLogout;
