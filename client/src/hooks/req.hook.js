import { useState } from "react";

/**
 * Makes a request to api.
 * @returns {object} Object with helper hooks.
 */
const useReq = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  /**
   * Makes a response to api. Modulates Loading, Error and Response values.
   * @param {string} query
   * @param {string} url
   */
  const makeQuery = async (query, url = "api") => {
    setLoading(true);
    setError(null);
    try {
      let response = await fetch(url, {
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

  return { loading, error, response, makeQuery, setError, setLoading };
};

export default useReq;
