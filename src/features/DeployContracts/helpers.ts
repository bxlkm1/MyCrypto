import { WALLET_STEPS } from '@components';
import { getAssetByUUID, hexToString, hexWeiToString } from '@services';
import { ITxConfig, ITxObject, NetworkId, StoreAccount } from '@types';

export const getAccountsInNetwork = (accounts: StoreAccount[], networkId: NetworkId) =>
  accounts.filter((acc) => acc.networkId === networkId && WALLET_STEPS[acc.wallet]);

export const makeDeployContractTxConfig = (
  rawTransaction: ITxObject,
  account: StoreAccount,
  amount: string
): ITxConfig => {
  const { gasPrice, gasLimit, nonce, data, to, value } = rawTransaction;
  const { address, network } = account;
  const baseAsset = getAssetByUUID(account.assets)(network.baseAsset)!;

  const txConfig: ITxConfig = {
    from: address,
    amount,
    receiverAddress: to,
    senderAccount: account,
    network,
    asset: baseAsset,
    baseAsset,
    gasPrice: hexToString(gasPrice),
    gasLimit,
    value: hexWeiToString(value),
    nonce,
    data,
    rawTransaction
  };

  return txConfig;
};

export const constructGasCallProps = (data: string, account: StoreAccount) => ({
  from: account.address,
  value: '0x0',
  data
});
