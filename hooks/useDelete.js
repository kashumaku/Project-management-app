import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

const useDelete = () => {
  const baseUrl = "https://task-management-opll.onrender.com";
  const { accessToken } = useSelector((state) => state.user.profile);
  const deleteHandler = async (endPoint) => {
    try {
      const res = await axios.delete(`${baseUrl}/${endPoint}`, {
        headers: { Authorization: `bearer ${accessToken}` },
      });
      alert("Deleted successfully");
    } catch (err) {
      alert("Unable to delete");
      console.log("error while deleting ", err.message, err.response?.data);
    }
  };
  return { deleteHandler };
};

export default useDelete;
