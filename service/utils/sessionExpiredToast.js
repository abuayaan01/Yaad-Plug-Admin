import Swal from "sweetalert2/dist/sweetalert2.js";

export const showSessionExpiredToast = () => {
  Swal.fire({
    icon: 'info',
    title: 'Session Expired',
    position: "top-right",
    showConfirmButton: false,
    timer: 2500,
    toast: true,
  });
};