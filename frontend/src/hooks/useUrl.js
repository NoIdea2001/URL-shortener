import { useState } from "react";
export const useUrl = () => {
  const [id, setId] = useState("");

  const urlPostReq = async (link) => {
    try {
      const response = await fetch("http://localhost:8001/url/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // specify the content type
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
