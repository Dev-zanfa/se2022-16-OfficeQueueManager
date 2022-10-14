# List of API

## INDEX

[GET next customer](#get-next-customer)

## GET next customer

**GET** `/api/counter/:userid`
  - get ticket number of the next customer to serve
  - Request body: _None_
  - Response: `200 OK` (success) or `500 Internal Server Error` (generic error).
  - Response body: 
    ```
    {
        "ticket" : "A02"
    }
    ```

