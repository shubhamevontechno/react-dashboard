// swalUtils.js

import Swal from 'sweetalert2';

export const confirmDelete = async () => {
  return Swal.fire({
    title: "Are you sure want to delete this user?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });
};

export const showSuccessMessage = (message) => {
  return Swal.fire({
    title: "Success",
    text: message,
    icon: "success",
    showConfirmButton: false,
    timer: 1500,
  });
};
