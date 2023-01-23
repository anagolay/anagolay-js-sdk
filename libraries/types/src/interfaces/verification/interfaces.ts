import { AnAccountId } from '../anagolaySupport/interfaces';

export interface AnVerificationStatus {
  Waiting?: undefined;
  Pending?: undefined;
  Failure?: string;
  Success?: undefined;
}

/**
 * ONLY ONE OF THEM
 */
export interface AnVerificationContext {
  Unbounded?: [];
  UrlForDomain?: [string, string];
  UrlForDomainWithUsername?: [string, string, string];
  UrlForDomainWithSubdomain?: [string, string, string];
  UrlForDomainWithUsernameAndRepository?: [string, string, string, string];
}

export enum AnVerificationAction {
  DnsTxtRecord = 'DnsTxtRecord'
}

export interface AnVerificationRequest {
  context: AnVerificationContext;
  action: AnVerificationAction;
  status: keyof AnVerificationStatus | AnVerificationStatus;
  holder: AnAccountId;
  key: string;
  id?: string;
}
