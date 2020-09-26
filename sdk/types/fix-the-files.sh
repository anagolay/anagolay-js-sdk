#!/usr/bin/env bash

echo "Fixing ..."
echo "adding @ts-nocheck to the src/interfaces/augment-api-tx.ts"
sed -i '3i/* @ts-nocheck */' src/interfaces/augment-api-tx.ts
