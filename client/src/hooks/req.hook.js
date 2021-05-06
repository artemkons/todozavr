import React, { useState } from "react";

const useReq = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const makeQuery = async (query) => {
    setLoading(true);
    setError(null);
    try {
      let response = await fetch("api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: query }),
      });

      let result = await response.json();
      setResponse(result);
    } catch (error) {
      setError("Что-то пошло не так, попробуйте позже!");
    }
    setLoading(false);
  };

  return [loading, error, response, makeQuery, setError, setLoading];
};

export default useReq;
