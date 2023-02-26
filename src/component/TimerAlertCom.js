import Swal from "sweetalert2";

const TimerAlert = () => {
  const Modal = Swal.mixin({
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  return { Modal, Toast };
};

export default TimerAlert;
