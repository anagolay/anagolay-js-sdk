// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Bytes, Enum, Option, Struct } from '@polkadot/types-codec';
import type { ITuple } from '@polkadot/types-codec/types';
import type { AccountId } from '@polkadot/types/interfaces/runtime';

/** @name VerificationAction */
export interface VerificationAction extends Enum {
  readonly isDnsTxtRecord: boolean;
  readonly type: 'DnsTxtRecord';
}

/** @name VerificationContext */
export interface VerificationContext extends Enum {
  readonly isUnbounded: boolean;
  readonly isUrlForDomain: boolean;
  readonly asUrlForDomain: ITuple<[Bytes, Bytes]>;
  readonly isUrlForDomainWithUsername: boolean;
  readonly asUrlForDomainWithUsername: ITuple<[Bytes, Bytes, Bytes]>;
  readonly isUrlForDomainWithSubdomain: boolean;
  readonly asUrlForDomainWithSubdomain: ITuple<[Bytes, Bytes, Bytes]>;
  readonly isUrlForDomainWithUsernameAndRepository: boolean;
  readonly asUrlForDomainWithUsernameAndRepository: ITuple<[Bytes, Bytes, Bytes, Bytes]>;
  readonly type:
    | 'Unbounded'
    | 'UrlForDomain'
    | 'UrlForDomainWithUsername'
    | 'UrlForDomainWithSubdomain'
    | 'UrlForDomainWithUsernameAndRepository';
}

/** @name VerificationRequest */
export interface VerificationRequest extends Struct {
  readonly context: VerificationContext;
  readonly action: VerificationAction;
  readonly status: VerificationStatus;
  readonly holder: AccountId;
  readonly key: Bytes;
  readonly id: Option<Bytes>;
}

/** @name VerificationStatus */
export interface VerificationStatus extends Enum {
  readonly isWaiting: boolean;
  readonly isPending: boolean;
  readonly isFailure: boolean;
  readonly asFailure: Bytes;
  readonly isSuccess: boolean;
  readonly type: 'Waiting' | 'Pending' | 'Failure' | 'Success';
}

export type PHANTOM_VERIFICATION = 'verification';
