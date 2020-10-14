# product-details

## CRUD Operations for product-details

### Get a product
* GET `/product/:pid`

**Success Status Code:** `201`

**Response Body:** Expects JSON with the following keys.

```
{
  "id": "Number",
  "name": "String",
  "product_line": "String",
  "tag": "Number",
  "price": "Number",
  "online_inventory": "Boolean",
  "rating": "Number",
  "review_count": "Number",
  "customer_limit": "Number",
  "liked": "Boolean",
  "category_1": "String",
  "category_2": "String",
  "category_3": "String"
}
```


### Create a product
* POST `/product`

**Success Status Code:** `201`

**Request Body:** Expects JSON with the following keys.

```
{
  "name": "String",
  "product_line": "String",
  "tag": "Number",
  "price": "Number",
  "online_inventory": "Boolean",
  "rating": "Number",
  "review_count": "Number",
  "customer_limit": "Number",
  "liked": "Boolean",
  "category_1": "String",
  "category_2": "String",
  "category_3": "String"
}
```



### Update a product
* PUT `/product/:pid`

**Success Status Code:** `201`

```
{
  "id": "Number",
  "name": "String",
  "product_line": "String",
  "tag": "Number",
  "price": "Number",
  "online_inventory": "Boolean",
  "rating": "Number",
  "review_count": "Number",
  "customer_limit": "Number",
  "liked": "Boolean",
  "category_1": "String",
  "category_2": "String",
  "category_3": "String"
}
```



### Remove a product
* DELETE `/product/:pid`

**Success Status Code:** `201`



### Get a store
* GET `/store/:sid`

**Success Status Code:** `201`

**Response Body:** Expects JSON with the following keys.

```
{
  "id": "Number",
  "name": "String",
  "address": "String",
  "city": "String",
  "state": "String",
  "zip": "Number",
  "phone": "Number",
  "details": ["String"]
}
```



### Create a store
* POST `/store`

**Success Status Code:** `201`

**Request Body:** Expects JSON with the following keys.

```
{
  "name": "String",
  "address": "String",
  "city": "String",
  "state": "String",
  "zip": "Number",
  "phone": "Number",
  "details": ["String"]
}
```



### Update a store
* PUT `/store/:sid`

**Success Status Code:** `201`

**Request Body:** Expects JSON with the following keys.

```
{
  "id": "Number",
  "name": "String",
  "address": "String",
  "city": "String",
  "state": "String",
  "zip": "Number",
  "phone": "Number",
  "details": ["String"]
}
```



### Delete a store
* DELETE `/store/:sid`

**Success Status Code:** `201`

**Request Body:** Expects JSON with the following keys.



### Get nearby stores
* GET `/nearbyStores/:zip`

**Success Status Code:** `201`

**Response Body:** Expects JSON with the following keys.

```
[{
  "id": "Number",
  "name": "String",
  "address": "String",
  "city": "String",
  "state": "String",
  "zip": "Number",
  "phone": "Number",
  "details": ["String"]
}]
```



### Get nearby stores that have inventory
* GET `/nearbyWithInventory/:pid/:zip`

**Success Status Code:** `201`

**Response Body:** Expects JSON with the following keys.

```
[{
  "id": "Number",
  "name": "String",
  "address": "String",
  "city": "String",
  "state": "String",
  "zip": "Number",
  "phone": "Number",
  "details": ["String"]
}]
```
