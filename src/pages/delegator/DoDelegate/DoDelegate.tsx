// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  claimIndexerRewardsModalText,
  ModalApproveToken,
  ModalClaimIndexerRewards,
  tokenApprovalModalText,
  WalletRoute,
} from '@components';
import TransactionModal from '@components/TransactionModal';
import { idleText } from '@components/TransactionModal/TransactionModal';
import { useSQToken, useWeb3 } from '@containers';
import { formatEther, parseEther } from '@ethersproject/units';
import { useEra } from '@hooks';
import { mapEraValue, parseRawEraValue } from '@hooks/useEraValue';
import { useIsLogin } from '@hooks/useIsLogin';
import { useRewardCollectStatus } from '@hooks/useRewardCollectStatus';
import { Spinner, Typography } from '@subql/components';
import { DelegationFieldsFragment, IndexerFieldsFragment } from '@subql/network-query';
import { convertStringToNumber, renderAsync } from '@utils';
import { Button } from 'antd';
import assert from 'assert';
import { BigNumber } from 'ethers';
import { TFunction } from 'i18next';

import { useWeb3Store } from 'src/stores';

import { DelegateForm } from './DelegateFrom';

const getModalText = (requireClaimIndexerRewards = false, requireTokenApproval = false, t: TFunction) => {
  if (requireClaimIndexerRewards) return claimIndexerRewardsModalText;

  if (requireTokenApproval) return tokenApprovalModalText;

  return {
    title: t('delegate.title'),
    steps: [t('delegate.enterAmount'), t('indexer.confirmOnMetamask')],
    inputTitle: t('delegate.delegateAmount'),
    submitText: t('delegate.confirmDelegate'),
    failureText: t('delegate.delegateFailure'),
    successText: t('delegate.delegateSuccess'),
  };
};

interface DoDelegateProps {
  indexerAddress: string;
  variant?: 'button' | 'textBtn' | 'errTextBtn' | 'errButton';
  delegation?: DelegationFieldsFragment | null;
  indexer?: IndexerFieldsFragment | null;
}

export const DoDelegate: React.FC<DoDelegateProps> = ({ indexerAddress, variant, delegation, indexer }) => {
  const { t } = useTranslation();
  const { currentEra, refetch } = useEra();
  const { account } = useWeb3();
  const { contracts } = useWeb3Store();
  const { stakingAllowance } = useSQToken();
  const requireTokenApproval = stakingAllowance?.data?.isZero();
  const rewardClaimStatus = useRewardCollectStatus(indexerAddress);
  const [requireClaimIndexerRewards, setRequireClaimIndexerRewards] = React.useState(true);
  const [fetchRequireClaimIndexerRewardsLoading, setFetchRequireClaimIndexerRewardsLoading] = React.useState(false);
  const isLogin = useIsLogin();

  const modalText = useMemo(() => {
    return isLogin ? getModalText(requireClaimIndexerRewards, requireTokenApproval, t) : idleText;
  }, [isLogin, requireClaimIndexerRewards, requireTokenApproval]);

  const afterDelegatedAmount = useMemo(() => {
    let afterDelegatedAmount = 0;
    if (delegation?.amount) {
      const rawDelegate = parseRawEraValue(delegation?.amount, currentEra.data?.index);
      const delegate = mapEraValue(rawDelegate, (v) => convertStringToNumber(formatEther(v ?? 0)));
      afterDelegatedAmount = delegate.after ?? 0;
    }
    return afterDelegatedAmount;
  }, [currentEra, delegation]);

  const indexerCapacity = useMemo(() => {
    let indexerCapacity = BigNumber.from(0);

    if (indexer?.capacity) {
      const rawCapacity = parseRawEraValue(indexer?.capacity, currentEra.data?.index);

      indexerCapacity = rawCapacity.after ?? BigNumber.from(0);
    }

    return indexerCapacity;
  }, [indexer, currentEra]);

  const handleClick = async ({ input, delegator }: { input: number; delegator?: string }) => {
    assert(contracts, 'Contracts not available');

    const delegateAmount = parseEther(input.toString());
    if (delegator && delegator !== account) {
      return contracts.stakingManager.redelegate(delegator, indexerAddress, delegateAmount);
    }

    return contracts.stakingManager.delegate(indexerAddress, delegateAmount);
  };

  if (!account) {
    return (
      <Button disabled type="text">
        {t('delegate.title')}
      </Button>
    );
  }

  return renderAsync(currentEra, {
    error: (error) => (
      <Typography>
        {`Error: Click to `}
        <span
          onClick={() => {
            refetch();
          }}
          style={{ color: 'var(--sq-blue600)', cursor: 'pointer' }}
        >
          retry
        </span>
      </Typography>
    ),
    loading: () => <Spinner />,
    data: (era) => {
      // const requireClaimIndexerRewards = !r?.hasClaimedRewards;
      // if doesn't login will enter wallerRoute logical code process
      const isActionDisabled = isLogin ? !stakingAllowance.data : false;

      return (
        <TransactionModal
          text={modalText}
          actions={[
            {
              label: t('delegate.title'),
              key: 'delegate',
              disabled: fetchRequireClaimIndexerRewardsLoading || isActionDisabled,
              rightItem: fetchRequireClaimIndexerRewardsLoading ? (
                <Spinner size={10} color="var(--sq-gray500)" />
              ) : undefined,
              onClick: async () => {
                try {
                  setFetchRequireClaimIndexerRewardsLoading(true);
                  const res = await rewardClaimStatus.refetch();
                  setRequireClaimIndexerRewards(!res);
                } finally {
                  setFetchRequireClaimIndexerRewardsLoading(false);
                }
              },
            },
          ]}
          onClick={handleClick}
          renderContent={(onSubmit, onCancel, _, error) => {
            if (!isLogin) {
              return <WalletRoute componentMode element={<></>}></WalletRoute>;
            }
            if (requireClaimIndexerRewards) {
              return (
                <ModalClaimIndexerRewards
                  onSuccess={async () => {
                    const res = await rewardClaimStatus.refetch();
                    setRequireClaimIndexerRewards(!res);
                  }}
                  indexer={indexerAddress ?? ''}
                />
              );
            }

            if (requireTokenApproval && !requireClaimIndexerRewards) {
              return <ModalApproveToken onSubmit={() => stakingAllowance.refetch()} />;
            }

            return (
              <DelegateForm
                onSubmit={onSubmit}
                onCancel={onCancel}
                indexerAddress={indexerAddress}
                delegatedAmount={afterDelegatedAmount}
                indexerCapacity={indexerCapacity}
                indexerMetadataCid={indexer?.metadata}
                error={error}
                curEra={era?.index}
              />
            );
          }}
          variant={isActionDisabled ? 'disabledTextBtn' : variant}
          width="540px"
        />
      );
    },
  });
};
