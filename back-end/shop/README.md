Coding Exercise for Backend Web Developers
We have a store where we list our products and we want to expose APIs to get details and manage those products. A product is identified by sku, has a name, description and price.
Tasks:
0 - find and complete the missing implementation of this API: /product/{sku}
1 - add an endpoint to get list of product details by list of SKUs: /products?skus=123,4567,8901,2345,67789
2 - we want to add stock information to the product, for that we want to extend the database schema (check flyway) and get the information in this API: /product/{sku}
3 - Add an endpoint to add product.
4 - add an endpoint to partially update a product (updating name, description and price).
5 - add unit test to the controller API you exposed in 1 and 4
6 - [optional] document with swagger the endpoints
7 - put your Java application into Docker container and document in README file how to use it.
8 - CI/CD: add GitLab CI configuration to build and run unit tests of your application.
Important:
- Please keep code quality standards in mind, while working on your tasks
- Your approach toward the problem is also important for us
- Please use this example https://gitlab.com/abdelwahed.abbad/imedia24-coding-challenge to get started and submit your code in a separate repository (via GIT)
    