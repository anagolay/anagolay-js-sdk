import { Injected } from '@polkadot/extension-inject/types';

export {};

declare global {
  interface Window {
    send: (path: string, data: any) => void;
    walletExtension: {
      onAppResponse: (msgType: string, response: any, error: Error) => void;
      onAppSubscription: (requestId: string, subscriptionString: string) => void;
      isAnagolayWallet: bool;
    };
    injectedWeb3: {
      'polkadot-js': {
        version: string;
        enable(originName: string): Promise<Injected>;
      };
    };
  }
}
