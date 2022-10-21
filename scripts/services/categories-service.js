import apiFetch from './api-fetch.js';

export async function getCategories() {
  return await apiFetch('api/categories/');
}
