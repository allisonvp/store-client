import BASE_URI from '../config.js';

/*Scalable generic function to obtain a response from the api*/
export default async function apiFetch(
  endPoint,
  { method, headers, body, params } = {}
) {
  if (body) {
    headers = {
      'Content-Type': 'application/json',
      ...headers
    };
  }
  const config = {
    method: method || (body ? 'POST' : 'GET'),
    headers: headers,
    body: body ? JSON.stringify(body) : null
  };
  const response = await fetch(
    BASE_URI + endPoint + '?' + new URLSearchParams(params),
    config
  );
  let data;
  if (!response.ok) {
    try {
      data = await response.json();
    } catch (error) {
      throw new Error(response.statusText);
    }
    throw new Error(data.errors.message);
  }

  try {
    data = await response.json();
  } catch (error) {
    data = response.statusText;
  }
  return data;
}
