import apiFetch from './api-fetch.js';

//This function calls the apiFetch method and only needs to pass the endpoint as argument because the apiFetch method is a generic and scalable function that already sets by default the other parameters such as method, body and headers if needed.
export async function getCategories() {
  return await apiFetch('api/categories/');
}
