import axios from "axios";
import { API_URL } from "../constants/data";

/**
 * Create an Axios Client with defaults
 */

/**
 * Request Wrapper with default success/error actions
 */
const request = async (config: any) => {
  const client = axios.create({
    baseURL: API_URL,
    timeout: 60000,
    headers: {
      "Content-Type": "application/json"
    },
  });

  const onSuccess = (response: any) => {
    //console.log("Request Successful!", response.data);
    return Promise.resolve(response.data);
  };

  const onError = (error: any) => {
    //console.log("Request Failed:", error);

    if (error.response) {
      // Request was made but server responded with something
      // other than 2xx
      //console.log("Data:", error.response.data);
      return Promise.reject(error.response.data);
    } else {
      // Something else happened while setting up the request
      // triggered the error
      //console.log("Error Message:", error.message);
      return Promise.reject(error.message);
    }
  };

  //console.log("Request Configurations!", config);

  return client(config).then(onSuccess).catch(onError);
};

export default request;
