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
      const response = await fetch("http://localhost:9090/url/", {
        method: "POST",
        headers: {
          "token": `Bearer ${token}`,
          "Content-Type": "application/json", // specify the content 
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
