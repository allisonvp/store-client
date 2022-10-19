import apiFetch from './api-fetch.js';

export async function getProducts(params) {
  return await apiFetch('api/products/', { params });
}
