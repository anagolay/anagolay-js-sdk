import type { ITipExtrinsic } from '@anagolay/api/src/pallets/tipping/api';
import type { AnVerificationContext, AnVerificationRequest } from '@anagolay/types';
import type { TippingEvent } from '@polkadot/types/lookup';
import type { KeypairType } from '@polkadot/util-crypto/types';

/**
 * Key-value pairs where the key is the message type and the value is its signature.
 * `[MessageType]: [RequestType, ResponseType, SubscriptionMessageType?]`
 */
export interface RequestSignatures {
  'pri(accounts.getFundsForAccount)': [Address, ResponseFundsAvailable];
  'pri(accounts.getAccountSelected)': [null, RequestAccountCreateSuri];
  'pri(accounts.setAccountSelected)': [Address, RequestAccountCreateSuri];
  'pri(accounts.create.suri)': [RequestAccountCreateSuri, boolean];
  'pri(accounts.update.single)': [Partial<RequestAccountCreateSuri>, boolean];
  'pri(accounts.update)': [Record<Address, Partial<RequestAccountCreateSuri>>, RequestAccountCreateSuri[]];
  'pri(accounts.delete)': [Address, boolean];
  'pri(accounts.get)': [Address[], RequestAccountCreateSuri[] | Record<Address, RequestAccountCreateSuri>];
  'pri(seed.create)': [RequestSeedCreate, ResponseSeedCreate];
  'pri(chain.verification.getRequest)': [AnVerificationContext[], AnVerificationRequest[]];
  'pri(chain.tipping.enabledForContext)': [RequestTippingEnabled, boolean];
  'pri(chain.tipping.tip.paymentInfo)': [RequestTippingMakeTip, string];
  'pri(chain.tx.tipping.tip)': [MakeExtrinsicTip, void, SubscriptionsResponseTip];
  'pri(config.setConnectedChain)': [string, void];
  'pri(config.getConnectedChain)': [string, string];
}

type KeysWithDefinedValues<T> = {
  [K in keyof T]: T[K] extends undefined ? never : K;
}[keyof T];

type NoUndefinedValues<T> = {
  [K in KeysWithDefinedValues<T>]: T[K];
};

type IsNull<T, K extends keyof T> = { [K1 in Exclude<keyof T, K>]: T[K1] } & T[K] extends null ? K : never;

type NullKeys<T> = { [K in keyof T]: IsNull<T, K> }[keyof T];

/**
 * This is the public address string. This type is more for convenience and readability than anything else
 * @public
 */
export type Address = string;

export type SeedLengths = 12 | 24;

/**
 * Generic message type, useful when you use types in the SW or CS
 * @public
 */
export interface Message extends MessageEvent {
  data: {
    error?: string;
    id: string;
    origin: string;
    response?: string;
    subscription?: string;
  };
}

export interface ResponseFundsAvailable {
  formatted: string;
  asString: string;
}

export interface MakeExtrinsicTip {
  params: ITipExtrinsic;
  sender: Address;
}

/**
 * The most used interface, this is the account interface for saving, reading, updating ...
 * @public
 */
export interface RequestAccountCreateSuri extends Record<string, unknown> {
  address: string;
  seed: string;
  name: string;
  password: string;
  keyType?: KeypairType;
}

/**
 * Provide the needed info to unlock the keypair
 */
export interface RequestUnlockKeypair {
  address: Address;
  password?: string;
  savePass: boolean;
}

/**
 * Needed stuff for send a tip
 */
export interface RequestTippingMakeTip {
  amount: string;
  context: AnVerificationContext;
  sender: Address;
}
/**
 * Needed stuff to check is tipping enabled
 */
export interface RequestTippingEnabled {
  address: Address;
  context: AnVerificationContext;
}

/**
 * Create seed
 */
export interface RequestSeedCreate {
  length?: SeedLengths;
  seed?: string;
  type?: KeypairType;
}

export type MessageTypes = keyof RequestSignatures;

/**
 * When we use the sendMessage we can see what is the request type based on the key and value of the {@link RequestSignatures}
 */
export type RequestTypes = {
  [MessageType in keyof RequestSignatures]: RequestSignatures[MessageType][0];
};

/**
 * Internal requests transfer. From SW to extension
 * @internal
 */
export interface TransportRequestMessage<TMessageType extends MessageTypes> {
  id: string;
  message: TMessageType;
  origin: string;
  request: RequestTypes[TMessageType];
}

/// RESPONSES

interface TransportResponseMessageNoSub<TMessageType extends MessageTypesWithNoSubscriptions> {
  error?: string;
  id: string;
  response?: ResponseTypes[TMessageType];
}

export type TransportResponseMessage<TMessageType extends MessageTypes> =
  TMessageType extends MessageTypesWithNoSubscriptions
    ? TransportResponseMessageNoSub<TMessageType>
    : TMessageType extends MessageTypesWithSubscriptions
    ? TransportResponseMessageSub<TMessageType>
    : never;

export interface ResponseSeedCreate {
  address: string;
  seed: string;
}

export type ResponseTypes = {
  [MessageType in keyof RequestSignatures]: RequestSignatures[MessageType][1];
};

export type ResponseType<TMessageType extends keyof RequestSignatures> = RequestSignatures[TMessageType][1];

// SUBSCRIPTIONS

export type MessageTypesWithNoSubscriptions = Exclude<MessageTypes, keyof SubscriptionMessageTypes>;

export type SubscriptionMessageTypes = NoUndefinedValues<{
  [MessageType in keyof RequestSignatures]: RequestSignatures[MessageType][2];
}>;

export type MessageTypesWithSubscriptions = keyof SubscriptionMessageTypes;

interface TransportResponseMessageSub<TMessageType extends MessageTypesWithSubscriptions> {
  error?: string;
  id: string;
  response?: ResponseTypes[TMessageType];
  subscription?: SubscriptionMessageTypes[TMessageType];
}

export interface SubscriptionsResponseTip {
  finalized?: boolean;
  error?: any;
  data?: TippingEvent;
}
