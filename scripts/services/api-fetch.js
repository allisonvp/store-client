import BASE_URI from '../config.js';

/*Scalable generic function to obtain a response from the api*/
export default async function apiFetch(
  endPoint,
  { method, headers, body, params } = {}
) {
  //If the request contains a body, the headers will include the content type + the configuration of the headers that the user passes as an argument.
  if (body) {
    headers = {
      'Content-Type': 'application/json',
      ...headers
    };
  }
  const config = {
    //The method is what the user passes as an argument, otherwise, if there is a body, the method defaults to POST, otherwise, the method defaults to GET.
    method: method || (body ? 'POST' : 'GET'),
    headers: headers,
    //If there is a body, JSON.stringify converts its argument to a JSON string.
    body: body ? JSON.stringify(body) : null
  };
  //Uses the fetch method which has as argument the BASE_URI/endPoint?queryparams and the config object. It returns a promise.
  const response = await fetch(
    BASE_URI + endPoint + '?' + new URLSearchParams(params),
    config
  );
  let data;
  //if the response is not ok, try to parse the body response as JSON and throw an Error object with the errors message, but if there is no body in the response, throw an Error object with the statusText of the response.
  if (!response.ok) {
    try {
      //json() returns a promise which resolves with the result of parsing the body response as JSON
      data = await response.json();
    } catch (error) {
      throw new Error(response.statusText);
    }
    throw new Error(data.errors.message);
  }
  //if the response is ok, try to parse the body response as JSON, but if there is no body in the response, returns the statusText of the response, that would be "OK" if the response returned successfully.
  try {
    data = await response.json();
  } catch (error) {
    data = response.statusText;
  }
  return data;
}
