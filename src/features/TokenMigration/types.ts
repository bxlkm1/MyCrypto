import { ISimpleTxFormFull, StoreAccount } from '@types';

import { ITokenMigrationConfig } from './config';

export interface TokenMigrationState {
  account?: StoreAccount;
}

export interface ITokenMigrationFormFull extends ISimpleTxFormFull {
  tokenConfig: ITokenMigrationConfig;
}
