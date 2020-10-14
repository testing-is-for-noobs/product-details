# product-details

## CRUD Operations for product-details

**Get a product**
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

**Create a product**
* Post `/product`
**Success Status Code:** `201`
