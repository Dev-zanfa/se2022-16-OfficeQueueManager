# List of API

## INDEX

[GET next customer](#get-next-customer)

## GET next customer

**GET** `/api/counter/:userid/nextcustomer`
  - get ticket number of the next customer to serve
  - Request body: _None_
  - Response: `200 OK` (success), `404 Not Found` (no user associated to userid) or `500 Internal Server Error` (generic error).
  - Response body: 
    ```
    {
        "service" : "S1",
        "ticket" : 2
    }
    ```

