Helper links:

- https://en.wikipedia.org/wiki/Domain_Name_System#Authoritative_name_server

# notes

The `verificationCode` is not encrypted not it is a [signed message via [an extension](https://polkadot.js.org/docs/extension/cookbook/#sign-a-message) that we might want to implement later. now it is just a concatenation of the `address||domain.tld`.
