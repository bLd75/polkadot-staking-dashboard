// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AnyMetaBatch } from 'types';

export interface AccountContextInterface {
  fetchAccountMetaBatch: (k: string, v: string[], r?: boolean) => void;
  meta: AnyMetaBatch;
}
