// https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/make-api-requests/dns-json/

/**
 * Default DoH url for cloudflare
 * @public
 */
export const defaultDohUrl: string = 'https://1.1.1.1/dns-query';

/**
 * DNS over HTTPs request. Use this as the interfaces for your url search params
 * @public
 */
export interface IDoHRequest {
  /**
   * Query name.
   *
   * Example: `woss.io`
   */
  name: string;
  /**
   * Query type (either a numeric value or text).
   *
   * Example: `AAAA`
   */
  type: string;
  /**
   * `DO` bit - set if client wants DNSSEC data (either boolean or numeric value).
   *
   * Example: `true`
   */
  do?: string;
  /**
   * `CD` bit - set to disable validation (either boolean or numeric value).
   *
   * Example: `false`
   */
  cd?: string;
}

/**
 * A response returned from the DoH query API
 * @public
 */
export interface IDoHResponse {
  /**
   * The Response Code of the DNS Query. These are defined here: https://www.iana.org/assignments/dns-parameters/dns-parameters.xhtml#dns-parameters-6.
   */
  Status: number;
  /**
   * If true, it means the truncated bit was set. This happens when the DNS answer is larger than a single UDP or TCP packet. TC will almost always be false with Cloudflare DNS over HTTPS because Cloudflare supports the maximum response size.
   */
  TC: boolean;
  /**
   * If true, it means the Recursive Desired bit was set. This is always set to true for Cloudflare DNS over HTTPS.
   */
  RD: boolean;
  /**
   * If true, it means the Recursion Available bit was set. This is always set to true for Cloudflare DNS over HTTPS.
   */
  RA: boolean;
  /**
   * If true, it means that every record in the answer was verified with DNSSEC.
   */
  AD: boolean;
  /**
   * If true, the client asked to disable DNSSEC validation. In this case, Cloudflare will still fetch the DNSSEC-related records, but it will not attempt to validate the records.
   */
  CD: boolean;
  Question: IDoHQuestion[];
  Answer: IDoHAnswer[];
}

export interface IDoHQuestion {
  /**
   * The record name requested.
   */
  name: string;
  /**
   * The type of DNS record requested. These are defined here: https://www.iana.org/assignments/dns-parameters/dns-parameters.xhtml#dns-parameters-4.
   */
  type: number;
}

export interface IDoHAnswer {
  /**
   * The record owner.
   */
  name: string;
  /**
   * The type of DNS record. These are defined here: https://www.iana.org/assignments/dns-parameters/dns-parameters.xhtml#dns-parameters-4.
   */
  type: number;
  /**
   * The number of seconds the answer can be stored in cache before it is considered stale.
   */
  TTL: number;
  /**
   * The value of the DNS record for the given name and type. The data will be in text for standardized record types and in hex for unknown types.
   */
  data: string;
}

/**
 * Get DoH TXT record
 * @param forDomain -
 * @param dohUrl -
 * @returns
 */
export async function txtRecords(forDomain: string, dohUrl: string = defaultDohUrl): Promise<IDoHResponse> {
  return callApi(
    {
      name: forDomain,
      type: 'txt'
    },
    dohUrl
  );
}

/**
 * Generic function for the calling the DoH api
 * @param params - An Object tat conforms with the {@link IDoHRequest} `name` and `value`
 * @param dohUrl - for overriding the defaults which is
 * @returns A DoH JSON response
 */
export async function callApi(
  params: Record<string, string>,
  dohUrl: string = defaultDohUrl
): Promise<IDoHResponse> {
  const url = new URL(dohUrl);
  for (const key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      const value = params[key];
      url.searchParams.set(key, value);
    }
  }

  const doh = await fetch(url, {
    method: 'GET',
    headers: {
      accept: 'application/dns-json'
    }
  });
  return doh.json();
}
