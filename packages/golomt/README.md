# Golomt Package

The Golomt package is a client library for interacting with Golomt's API. It provides a set of functions to handle various operations such as creating invoices, making inquiries, confirming tokens, and more.

## Installation

To install the package, use npm or yarn:

```bash
npm install @mnpay/golomt
```

or

```bash
yarn add @mnpay/golomt
```

## Usage

First, import the `useGolomt` function from the package:

```javascript
import { useGolomt } from '@mnpay/golomt';
```

### Configuration

To use the Golomt client, you need to provide a configuration object. The configuration should include your API endpoint and token:

```javascript
const config = {
  endpoint: 'https://api.golomt.com', // Optional, defaults to golomtDefaultBaseUrl
  token: 'your-access-token', // Required
  secret: 'your-secret'
};
```

### Initialize the Client

Create an instance of the Golomt client using the `useGolomt` function:

```javascript
const golomtClient = useGolomt(config);
```

### Available Methods

The Golomt client provides the following methods:

- **createInvoice**: Create a new invoice.
- **inquiry**: Make an inquiry request.
- **tokenConfirmation**: Confirm a token.
- **payTransaction**: Process a payment transaction.
- **checkTransaction**: Check the status of a transaction.
- **tokenCreation**: Create a new token.
- **getSettlementDetails**: Retrieve settlement details.
- **onNotification**: Handle notifications.

### Example

Here's an example of how to create an invoice:

```javascript
const invoiceData = {
  // Your invoice data here
};

golomtClient.createInvoice(invoiceData)
  .then(response => {
    console.log('Invoice created:', response);
  })
  .catch(error => {
    console.error('Error creating invoice:', error);
  });
```

### Inquiry Request Example

Here's how to make an inquiry request:

```javascript
const inquiryParams = {
  transactionId: 'unique-transaction-id',
  checksum: 'calculated-checksum',
};

golomtClient.inquiry(inquiryParams)
  .then(response => {
    console.log('Inquiry Response:', response);
  })
  .catch(error => {
    console.error('Error during inquiry:', error);
  });
```

### Invoice Request Example

Here's how to create an invoice:

```javascript
const invoiceParams = {
  amount: 1000,
  callback: 'https://your-callback-url.com',
  genToken: 'Y',
  returnType: 'POST',
  transactionId: 'unique-transaction-id',
  socialDeeplink: 'N',
};

golomtClient.createInvoice(invoiceParams)
  .then(response => {
    console.log('Invoice Created:', response);
  })
  .catch(error => {
    console.error('Error creating invoice:', error);
  });
```

### Notification Example

Handling a notification:

```javascript
const handleNotification = (notificationPayload) => {
  console.log('Notification received:', notificationPayload);
  // Process the notification payload
};

golomtClient.onNotification(handleNotification);
```

### Pay Transaction Request Example

Here's how to process a payment transaction:

```javascript
const payTransactionParams = {
  amount: '1000',
  checksum: 'calculated-checksum',
  transactionId: 'unique-transaction-id',
  lang: 'en',
  token: 'your-token',
};

golomtClient.payTransaction(payTransactionParams)
  .then(response => {
    console.log('Payment Transaction Response:', response);
  })
  .catch(error => {
    console.error('Error processing payment transaction:', error);
  });
```

### Token Creation Request Example

Here's how to create a token:

```javascript
const tokenCreationParams = {
  callback: 'https://your-callback-url.com',
  checksum: 'calculated-checksum',
  returnType: 'POST',
  transactionId: 'unique-transaction-id',
};

golomtClient.tokenCreation(tokenCreationParams)
  .then(response => {
    console.log('Token Created:', response);
  })
  .catch(error => {
    console.error('Error creating token:', error);
  });
```

### Check Transaction Request Example

Here's how to check a transaction:

```javascript
const checkTransactionParams = {
  checksum: 'calculated-checksum',
  transactionId: 'unique-transaction-id',
};

golomtClient.checkTransaction(checkTransactionParams)
  .then(response => {
    console.log('Check Transaction Response:', response);
  })
  .catch(error => {
    console.error('Error checking transaction:', error);
  });
```

## Request and Response Documentation

### Inquiry Request

**Request Parameters:**

- `transactionId` (string): Unique transaction ID provided by the organization.
- `checksum` (string): A checksum calculated as `transactionId + transactionId`.

**Response Parameters:**

- `status` (string): Status of the payment, either 'SENT' or 'PENDING'.
- `amount` (string): Amount deducted from the card.
- `bank` (string): Name of the card-issuing bank.
- `cardHolder` (string): Name of the cardholder.
- `cardNumber` (string): Card number used for the transaction.
- `errorDesc` (string): Description of the status code.
- `errorCode` (string): Status code of the transaction.
- `transactionId` (string): Merchant's transaction ID.
- `checksum` (string): Checksum calculated as `transactionId + errorCode + amount + token`.
- `token` (string, optional): Token number representing the card, present only if the token is created.

### Invoice Request

**Request Parameters:**

- `amount` (number): Amount to be deducted from the card.
- `callback` (string): Merchant's URL for callback or redirect.
- `checksum` (string, optional): Checksum calculated as `transactionId + amount + returnType + callback`.
- `genToken` (YesNo): 'Y' to generate a token after the transaction, 'N' otherwise.
- `returnType` (string): Method for redirecting to the merchant's URL, either 'POST', 'GET', or 'MOBILE'.
- `transactionId` (string): Merchant's transaction ID.
- `socialDeeplink` (YesNo): 'Y' to receive a social pay deeplink, 'N' otherwise.

**Response Parameters:**

- `checksum` (string): Checksum generated by the bank.
- `transactionId` (string): Merchant's transaction ID.
- `invoice` (string): Invoice number generated for the transaction.
- `socialDeeplink` (string): Social pay deeplink.

### Notification

**Payload Parameters:**

- `amount` (string): Amount involved in the transaction.
- `bank` (string): Name of the bank.
- `errorDesc` (string): Description of any error.
- `checksum` (string): Checksum for verification.
- `errorCode` (string): Error code if any.
- `cardHolder` (string): Name of the cardholder.
- `transactionId` (string): Transaction ID.
- `cardNumber` (string): Card number used.
- `token` (string, optional): Token number, if available.

### Pay Transaction Request

**Request Parameters:**

- `amount` (string): Amount to be paid.
- `checksum` (string): Checksum for verification.
- `transactionId` (string): Transaction ID.
- `lang` (string): Language code.
- `token` (string): Token for the transaction.

**Response Parameters:**

- `amount` (string): Amount involved in the transaction.
- `errorDesc` (string): Description of any error.
- `checksum` (string): Checksum for verification.
- `errorCode` (string): Error code if any.
- `cardNumber` (string): Card number used.
- `transactionId` (string): Transaction ID.

### Token Creation Request

**Request Parameters:**

- `callback` (string): Callback URL.
- `checksum` (string): Checksum for verification.
- `returnType` (string): Return type for the callback.
- `transactionId` (string): Transaction ID.

**Response Parameters:**

- `checksum` (string): Checksum for verification.
- `transactionId` (string): Transaction ID.
- `invoice` (string): Invoice number.

### Check Transaction Request

**Request Parameters:**

- `checksum` (string): Checksum for verification.
- `transactionId` (string): Transaction ID.

**Response Parameters:**

- `amount` (string): Amount involved in the transaction.
- `errorDesc` (string): Description of any error.
- `checksum` (string): Checksum for verification.
- `errorCode` (string): Error code if any.
- `transactionId` (string): Transaction ID.
- `cardNumber` (string): Card number used.
- `token` (string, optional): Token number, if available.
