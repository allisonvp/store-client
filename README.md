
# Bsale Store

This project consists of building an online store, where the user can initially see all the products, can search for them, sort them in ascending or descending order and can also filter the products by category. In addition, the user can see the products with the discount applied in case they have a discount.

It is requested to build separately [backend](https://github.com/allisonvp/api-bsale-test) (REST API) and frontend (application that consumes it).

The Frontend is an online store (single-page application) developed with vanilla JavaScript that obtains data from the [Bsale Store API](https://api-bsaletest.herokuapp.com/api/products). 

## Built With

- HTML
- CSS
- JavaScript
- Bootstrap

## Features

- List all products by clicking the logo button
- Display the sidebar and filter products by selecting a category
- Search products (case-insensitive)
- Order products by ascending or descending

## Run Locally

Start a local server as Live Server with the project folder. You can change the BASE_URI variable in the config.js file.

```javascript
const BASE_URI = 'https://api-bsaletest.herokuapp.com/';
```
or
```javascript
const BASE_URI = 'http://localhost:3000/';
```

## Demo

### Responsive Design

Developed with a responsive design to work properly on different devices (cell phones, tablets, desktops and laptops).

- Mobile mode

  <img src="./assets/images/responsive-prod-order-category.png" width="350"><img src="./assets/images/responsive-prod-search.png" width="350">
  
- List of products

  <img src="./assets/images/all-products.png" width="950">

- Products filtered by category

  <img src="./assets/images/products-categories.JPG" width="950">

- Products ordered and filtered by category

  <img src="./assets/images/products-filter-ordering-category.JPG" width="950">

- Product search

  <img src="./assets/images/products-filter-search.JPG" width="950">
 



