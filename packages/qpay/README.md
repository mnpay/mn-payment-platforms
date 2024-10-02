# QPay API Integration

This package provides a simple interface to integrate with the QPay payment service for merchants. It allows handling payments, invoices, authentication, and more via the QPay API.

official documentation: https://developer.qpay.mn

## Features
- **Authentication**: Obtain and refresh access tokens.
- **Invoice Management**: Create, get, and cancel invoices.
- **Payment Management**: Check, get, and cancel payments, along with retrieving payment lists.

## Installation

To install this package, use npm or yarn:

```bash
npm install @mnpay/qpay
```
or

```bash
yarn add @mnpay/qpay
```

## Usage

### Importing the Package
```typescript
import { useQpay } from '@mnpay/qpay';
```

### Example: Initializing the QPay API

```typescript
const qpay = useQpay({
  baseUrl?: 'https://api.qpay.mn'
  version?: 'v2'
  accessToken?: 'access_token'
  refreshToken?: 'refresh_token'
  expiresIn?: new Date()
});
```

### Methods

`authenticate`
Obtain an access token using client_id and client_secret.

`refreshToken`
Refresh the access token using a refresh_token.

`createInvoice`
Create a new invoice for a payment.

`getInvoice`
Retrieve the details of a created invoice using invoice_id.

`cancelInvoice`
Cancel an existing invoice by sending the invoice_id.

`getPayment`
Retrieve the details of a payment using the payment_id.

`checkPayment`
Check if the payment was completed by providing the invoice_id and object_type.

`cancelPayment`
Cancel a payment by sending the payment_id.

`getPaymentList`
Retrieve a list of payments made by customers.

## License
MIT License





