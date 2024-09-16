import { useState } from "react";
import { handleError } from "../pages/util";


export const useUrl = () => {
  const [id, setId] = useState("");

  const urlPostReq = async (link) => {
    try {
      const token = localStorage.getItem("token")
      if (!token){
        handleError("Login Required")
      }
      console.log(`${import.meta.env.VITE_BACKEND_LINK}url/`);
      
      const response = await fetch(`${import.meta.env.VITE_BACKEND_LINK}url/`, {
        method: "POST",
        headers: {
          "token": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: link }),
      });
      if (!response) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setId(data.id);
    } catch (error) {
      console.error("Error Posting URL", error);
    }
  };

  return { id, urlPostReq };
};
