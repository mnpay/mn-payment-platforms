# Hi-Pay token service manual

# Information
Official Document: https://developers.hipay.mn/token

# Installation
```ts
yarn add -D @mnpay/hipay
```

# Usage
```ts
import { createHipay } from '@mnpay/hipay'

const hipay = createHipay({
  baseUrl: 'https://test.hipay.mn',
  version: 'v2'
  client_id: 'YOUR_CLIENT_ID',
  client_secret: 'YOUR_CLIENT_SECRET',
  code: 'YOUR_CODE',
})

const cardId = await hipay.getCard({ cardId: 'YOUR_CARD_ID' })
```

# Types
## HipayError

| Field | Type | Description |
|-------|------|-------------|
| field | `string` | Field name. |
| issue | `string` | Issue with the specific field. |

## Base Response
| Field | Type | Description |
|-------|------|-------------|
| code  | `Code` | 1 = success, 0 = fail |
| description | `string` | An error description if an error occurred in the request. |
| details | `HipayError[]` | A list containing error information if an error occurred in the request. |

# Functions

## getAuthToken

This function is used to get the authentication token. This is usually the first operation performed when interacting with the organization's system. The access token received in response to this request enables subsequent operations to be performed.

**Header:**
| Field           | Value                  |
|-----------------|------------------------|
| URL             | `https://test.hipay.mn/v2/auth/token` |
| Method          | `POST`                 |
| Authorization   | `No`                   |
| Content-Type    | `application/json`     |


**Request:** 

JSON Object with the following properties:

| Field         | Type     | Description                                      |
|---------------|----------|--------------------------------------------------|
| code          | `string` | The user's authorization_code from Hi-Pay.        |
| client_secret | `string` | The organization's token.                         |
| redirect_uri  | `string` | The URL to receive the response.                  |
| client_id     | `string` | The organization's code.                          |
| grant_type    | `"authorization_code"` | "authorization_code".                             |

**Response:** 

JSON Object with the following properties:


| Field         | Type     | Description                                      |
|---------------|----------|--------------------------------------------------|
| code          | `number` | Indicates whether the request was successful. 1 for success, 0 for failure. |
| description   | `string` | A description indicating whether the request was successful. |
| access_token  | `string` | The access token.                                |
| expires       | `number` | The expiration time of the token, expressed in seconds. |
| details       | `HipayError[]` | A list containing error information if an error occurred in the request. The Error object contains information according to the error information table. |

## checkout

This function is used to create a payment invoice (Checkout). It sends product information and purchase details from the organization's program to Hi-Pay. If the Checkout service is successfully called, it returns a unique checkoutId number. This number is used to send a payment transaction request.

**Header:**

| Field           | Value                  |
|-----------------|------------------------|
| URL             | `https://test.hipay.mn/checkout/` |
| Method          | `POST`                 |
| Authorization   | `Bearer {merchant token}` |
| Content-Type    | `application/json`     |

**Request:** 

JSON Object with the following properties:

| Field    | Type    | Description                                      |
|----------|---------|--------------------------------------------------|
| entityId | `string`  | User ID.                                         |
| amount   | `number`  | Payment amount.                                  |
| currency | `'MNT'\|'USD'`    | Payment currency (MNT\|USD).                     |
| item     | `Item[]`            | Additional fields for product analysis |

### Item

| Field              | Type    | Description                                      |
|--------------------|---------|--------------------------------------------------|
| itemno    | `string`  | Product ID.                                      |
| name      | `string`  | Product name.                                    |
| price     | `number`  | Unit price of the product.                       |
| quantity  | `number` | Quantity of the product.                         |
| brand     | `string`  | Product brand name.                              |
| measure   | `string`  | Measurement unit (piece, liter, kg).              |
| vat       | `number`  | VAT amount.                                      |
| citytax   | `number`  | City tax.                                        |

**Response:** 

JSON Object with the following properties:

| Field       | Type   | Description                                      |
|-------------|--------|--------------------------------------------------|
| requestId   | `string` | Request ID.                                      |
| checkoutId  | `string` | Checkout ID (Generated if successful).            |
| code        | `Code` | Status of the request.                            |
| description | `string` | Status of the request.                            |
| details     | `HipayError[]`   | A list containing error information if an error occurred in the request. The Error object contains information according to the error information table. |

## getCheckout

This function is used to check whether a payment has been made using the invoice number.

**Header:**
| Field           | Value                           |
|-----------------|---------------------------------|
| URL             | `https://test.hipay.mn/checkout/get/{checkoutId}` |
| Method          | `GET`                           |
| Authorization   | `Bearer {merchant token}`       |
| Content-Type    | `application/json`              |

**Request:**

JSON Object with the following properties:

| Field        | Type     | Description                                      |
|--------------|----------|--------------------------------------------------|
| checkoutId   | `string` | The checkout ID of the previously created payment invoice. |

**Response:**

JSON Object with the following properties:

| Field        | Type     | Description                                      |
|--------------|----------|--------------------------------------------------|
| code         | `integer`| Indicates whether the request was successful. 1 for success, 0 for failure. |
| description  | `string` | A description indicating whether the request was successful. |
| amount       | `double` | The payment amount.                              |
| currency     | `string` | The payment currency.                            |
| status       | `string` | The status of the payment (new, canceled, paid, expired, invalid). |
| status_date  | `datetime`| The date when the status was changed.             |
| paymentId    | `string` | The payment transaction ID when the payment is paid. |
| details      | `Error[]` | A list containing error information if an error occurred in the request. The Error object contains information according to the error information table. |

## payment

This function is used to make a payment transaction. The payment transaction request uses the previously created payment invoice (checkout).

**Header:**
| Field           | Value                          |
|-----------------|--------------------------------|
| URL             | `https://test.hipay.mn/v2/payment` |
| Method          | `POST`                         |
| Authorization   | `Bearer {merchant token}`      |
| Content-Type    | `application/json`             |


**Request:** 

JSON Object with the following properties:

| Field        | Type     | Description                                      |
|--------------|----------|--------------------------------------------------|
| entityId     | `string` | The organization's code.                         |
| tokenId      | `string` | The card token.                                  |
| access_token | `string` | The access token.                                |
| checkoutId   | `string` | The checkout ID of the previously created payment invoice. |
| ipaddress    | `string` | The IPv4 address of the device making the payment. |

**Response:** 

JSON Object with the following properties:

| Field        | Type     | Description                                      |
|--------------|----------|--------------------------------------------------|
| code         | `Code` | Indicates whether the request was successful. 1 for success, 0 for failure. |
| description  | `string` | A description indicating whether the request was successful. |
| requestId    | `string` | The request ID of the payment request.           |
| checkoutId   | `string` | The checkout ID of the completed payment invoice. |
| id           | `string` | The ID of the payment transaction.                |
| initId       | `string` | The ID of the payment request.                    |
| amount       | `number` | The amount of the payment transaction.            |
| currency     | `string` | The currency of the payment transaction.          |
| entityId     | `string` | The organization's code.                         |
| paymentType  | `string` | The type of payment transaction (ltxn, wtxn, db). ltxn: Paid by card, wtxn: Paid by wallet, db: Paid by direct debit. |
| paymentDate  | `string` | The date of the payment transaction.              |
| desc_en      | `string` | The description of the payment transaction in English. |
| desc_mn      | `string` | The description of the payment transaction in Mongolian. |
| details      | `HipayError[]` | A list containing error information if an error occurred in the request. The Error object contains information according to the error information table. |

## getCardAddFormUrl

This function is used to get the Hi-Pay card addition form.

## resetToken

This function is used to reset the token.

Please refer to the source code for more detailed information on the parameters and return values of these functions.
