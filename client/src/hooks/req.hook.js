import { useState } from "react";

/**
 * Makes a request to api.
 * @returns {object} Object with helper hooks.
 */
const useReq = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  // TODO: Write about callback
  /**
   * Makes a response to api. Modulates Loading, Error and Response values.
   * @param {string} query
   * @param {string} url
   * @param {function} callback
   */
  const makeQuery = async (query, callback, url = "api") => {
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
      if (callback) callback(result);
      else setResponse(result);
    } catch (error) {
      setError("Что-то пошло не так, попробуйте позже!");
    }
    setLoading(false);
  };

  return [makeQuery, response, { loading, error, setLoading, setError }];
};

export default useReq;
