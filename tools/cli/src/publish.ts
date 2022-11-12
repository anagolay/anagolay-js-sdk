import axios from 'axios';
import { Agent } from 'node:http';
// http Agent for the Axios
const httpAgent: Agent = new Agent({ keepAlive: true });
import { isFalse, isTrue } from '@anagolay/util';
import clui from 'clui';
import { isEmpty, isNil } from 'ramda';
import signale from 'signale';

import { publishServiceURL } from './config';
import { Logger } from './logger';

// eslint-disable-next-line @rushstack/typedef-var
const Spinner = clui.Spinner;

/**
 * Publish service successful response
 */
export interface ISuccessfulResponse<T> {
  _id: string;
  repository: string;
  job_id: string;
  revision: string;
  artifacts: {
    performance: {
      execInSec: number;
    };
    items: T[];
  };
}

interface IPollingResponse<T> {
  done: boolean;
  version: ISuccessfulResponse<T>;
}

/**
 * This calls the API and returns the correct payload.
 * @param log - The logger where to append
 * @param payloadData - The payload of the call
 * @returns The publish service successful response at the end of the job
 */
export async function callPublishService<T, U extends ISuccessfulResponse<T>>(
  log: Logger,
  payloadData: { context: string }
): Promise<U> {
  const spinPublishOperation = new Spinner('');
  spinPublishOperation.message('Collecting information.');
  spinPublishOperation.start();
  const { apiKey, baseUrl } = await getPublishApiInfo(log);

  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const { data, status } = await axios.post(
        `${baseUrl}/v1/q?context=${payloadData.context}`,
        payloadData,
        {
          headers: {
            'x-api-key': apiKey,
            'User-Agent': `Anagolay CLI v${7}`,
            'Content-Type': 'application/json'
          },
          httpAgent
        }
      );

      // Q job is created and we need to poll it
      if (status === 201) {
        spinPublishOperation.message('Checking if the remote job is done. This can take a while.');
        const jobPollingInterval = setInterval(async () => {
          try {
            const response = await axios.get<IPollingResponse<T>>([baseUrl, data.job.api].join(''), {
              headers: {
                'x-api-key': apiKey,
                'User-Agent': `Anagolay CLI v${7}`,
                'Content-Type': 'application/json'
              },
              httpAgent
            });

            const {
              data: { done: jobDone, version: responseData }
            } = response;

            if (jobDone) {
              clearInterval(jobPollingInterval);
              spinPublishOperation.stop();

              resolve(responseData as U);
            }
          } catch (error) {
            spinPublishOperation.stop();

            if (axios.isAxiosError(error)) {
              // log.error(error.response?.data);
              // signale.error(error.response?.data);
              // reject(error.response?.data);
              console.error(error.message);
              process.exit(1);
            } else {
              console.error('Not axios error', (error as Error).message);
              // log.error(error);
              // signale.error(error);
              reject((error as Error).message);
              process.exit(1);
            }
          }
        }, 2000);
      }
      // this means the operation is already published under this revision
      else if (status === 200) {
        spinPublishOperation.stop();
        resolve(data);
      } else {
        const msg: string = `Unsupported status = ${status} for the Q request`;
        log.error(msg, data, status);
        throw new Error(msg);
      }
    } catch (error) {
      spinPublishOperation.stop();

      if (axios.isAxiosError(error)) {
        // log.error(error.response?.data);
        // signale.error(error.response?.data);
        // reject(error.response?.data);
        console.error(error.message);
        process.exit(1);
      } else {
        console.error('Not axios error', (error as Error).message);
        // log.error(error);
        // signale.error(error);
        reject((error as Error).message);
        process.exit(1);
      }
    }
  });
}

/**
 * Return the Publish service endpoint and the api key. If the api is not enabled it will be empty.
 *
 * The mocked api and has priority, so be careful with the settings
 * @returns
 */
async function getPublishApiInfo(log: Logger): Promise<{ apiKey: string; baseUrl: string }> {
  const {
    MOCK_API,
    POSTMAN_MOCK_API_KEY,
    ANAGOLAY_PUBLISH_SERVICE_API_KEY,
    POSTMAN_MOCK_API_URL,
    ENABLE_API_KEY_SUPPORT
  } = process.env;

  let apiKey: string = '';
  let baseUrl: string = '';

  if (
    !isNil(MOCK_API) &&
    isTrue(MOCK_API) &&
    !isNil(POSTMAN_MOCK_API_KEY) &&
    !isEmpty(POSTMAN_MOCK_API_KEY) &&
    !isNil(POSTMAN_MOCK_API_URL) &&
    !isEmpty(POSTMAN_MOCK_API_URL)
  ) {
    apiKey = POSTMAN_MOCK_API_KEY;
    baseUrl = POSTMAN_MOCK_API_URL;
    signale.info('Using mocked api');
    log.info('Using mocked api');
  } else {
    if (!isNil(ENABLE_API_KEY_SUPPORT) && isFalse(ENABLE_API_KEY_SUPPORT)) {
      if (
        !isNil(publishServiceURL) &&
        !isEmpty(publishServiceURL) &&
        !isNil(ANAGOLAY_PUBLISH_SERVICE_API_KEY) &&
        !isEmpty(ANAGOLAY_PUBLISH_SERVICE_API_KEY)
      ) {
        log.info('Found api key in the env variable, using that.');
        apiKey = ANAGOLAY_PUBLISH_SERVICE_API_KEY;
        baseUrl = publishServiceURL;
      } else {
        throw new Error('Cannot find the api key and url in the env');
      }
    } else {
      if (!isNil(publishServiceURL) && !isEmpty(publishServiceURL)) {
        baseUrl = publishServiceURL;
      }
    }
  }

  return {
    apiKey,
    baseUrl
  };
}
