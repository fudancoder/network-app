// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { FC } from 'react';
import { Typography } from '@subql/components';
import { Tooltip } from 'antd';

export const EstimatedNextEraLayout: FC<{ value: React.ReactNode; size?: 'normal' | 'small' }> = ({
  value,
  size = 'normal',
}) => {
  return (
    <Tooltip title="Estimated for next Era">
      <Typography
        variant="small"
        type="secondary"
        style={{ transform: size === 'small' ? 'scale(0.83333) translateX(7px)' : '' }}
      >
        {value}
      </Typography>
    </Tooltip>
  );
};
