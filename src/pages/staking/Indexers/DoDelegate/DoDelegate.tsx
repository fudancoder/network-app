// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import assert from 'assert';
import { formatEther, parseEther } from '@ethersproject/units';
import { useTranslation } from 'react-i18next';
import { useContracts, useSQToken, useWeb3 } from '../../../../containers';
import { tokenApprovalModalText, ModalApproveToken } from '../../../../components';
import TransactionModal from '../../../../components/TransactionModal';
import { convertStringToNumber } from '../../../../utils';

interface DoDelegateProps {
  indexerAddress: string;
}

export const DoDelegate: React.VFC<DoDelegateProps> = ({ indexerAddress }) => {
  const { t } = useTranslation();
  const { account } = useWeb3();
  const pendingContracts = useContracts();
  const { balance, stakingAllowance } = useSQToken();
  const requireTokenApproval = stakingAllowance?.data?.isZero();

  //TODO: define the returnType wen tokenApproval UI confirm
  const modalText = requireTokenApproval
    ? tokenApprovalModalText
    : {
        title: t('delegate.title'),
        steps: [t('delegate.enterAmount'), t('indexer.confirmOnMetamask')],
        description: t('delegate.delegateValidNextEra'),
        inputTitle: t('delegate.delegateAmount'),
        submitText: t('delegate.confirmDelegate'),
        failureText: 'Sorry, delegation failed',
      };

  const handleClick = async (amount: string) => {
    const contracts = await pendingContracts;
    assert(contracts, 'Contracts not available');

    const delegateAmount = parseEther(amount.toString());
    return contracts.staking.delegate(indexerAddress, delegateAmount);
  }

  return <TransactionModal
    text={modalText}
    actions={[
      { label: t('delegate.title'), key: 'delegate', disabled: !stakingAllowance.data }
    ]}
    onClick={handleClick}
    inputParams={{
      showMaxButton: true,
      curAmount: account ? convertStringToNumber(formatEther(balance.data ?? 0)) : undefined
    }}
    renderContent={() => {
      return !!requireTokenApproval && <ModalApproveToken onSubmit={() => stakingAllowance.refetch()}/>
    }}
  />
};