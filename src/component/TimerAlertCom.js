/* eslint-disable no-unused-vars */
import Swal from "sweetalert2";
import notif from "../storage/notif-1.wav";

const TimerAlert = () => {
  const audio = new Audio(notif);

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

  const ToastAudio = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      audio.play();
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  return { Modal, Toast, ToastAudio };
};

export default TimerAlert;
