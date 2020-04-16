# Welcome

## NOTES

We are not ready to handle the type based inserts:

`RPC-CORE: submitExtrinsic(extrinsic: Extrinsic): Hash:: 1010: Invalid Transaction: BadProof Something went wrong with the connection or something else Error: 1010: Invalid Transaction: BadProof`

For now ALL of the inserts and saves use `JSON.stringify` and after retrieving the record `JSON.parse`

check the CID https://cid.ipfs.io/
