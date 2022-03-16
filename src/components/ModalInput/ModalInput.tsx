// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import { InputNumber, Button } from 'antd';
import { Typography } from '@subql/react-ui';
import { useFormik, useFormikContext } from 'formik';
import styles from './ModalInput.module.css';
import { parseError } from '../../utils/parseError';

/**
 * NOTE:
 * Using antd: Input/Button
 * Waiting for SubQuery components lib(also based on antD) release and replace
 */

// TODO: percentage input
// TODO: input validation

interface Props {
  inputTitle?: string;
  submitText?: string;
  curAmount?: number;
  showMaxButton?: boolean;
  inputBottomText?: string;
  unit?: string;
  isLoading?: boolean;
  max?: number;
  min?: number;
  onSubmit: (value: any) => void;
  onError?: () => void;
}

export const ModalInput: React.FC<Props> = ({
  inputTitle,
  submitText,
  onSubmit,
  onError,
  unit = 'SQT',
  isLoading,
  curAmount,
  showMaxButton,
  inputBottomText,
  min,
  max,
}) => {
  const formik = useFormik({
    initialValues: {
      input: 0,
    },
    // TODO:validate,
    onSubmit: async (values, { resetForm, setErrors }) => {
      const { input } = values;
      try {
        await onSubmit(input);
        resetForm();
      } catch (error: any) {
        console.error('Submit ModalInput', error);
        setErrors({ input: parseError(error) });
        onError && onError();
      }
    },
  });

  const Prefix = () => (
    <div className={styles.prefix}>
      {unit && <Typography className={styles.unit}>{unit}</Typography>}
      {showMaxButton && (
        <Button
          shape="round"
          size="large"
          onClick={() => {
            formik.setFieldValue('input', curAmount);
          }}
        >
          Max
        </Button>
      )}
    </div>
  );

  return (
    <form onSubmit={formik.handleSubmit}>
      {inputTitle && <Typography variant="medium">{inputTitle}</Typography>}
      <div className={styles.input}>
        <InputNumber
          name="input"
          id="input"
          className={styles.inputNumber}
          onChange={(value) => {
            formik.setErrors({ input: undefined });
            formik.setFieldValue('input', value);
          }}
          value={formik.values.input}
          addonAfter={<Prefix />}
          disabled={isLoading}
          max={max}
          min={min}
        />
      </div>
      {(inputBottomText || curAmount) && (
        <Typography className={styles.inputBottomText} variant="medium">
          {inputBottomText || `Current: ${curAmount} ${unit}`}
        </Typography>
      )}
      <Typography className={styles.inputError} variant="medium">
        {formik.errors?.input}
      </Typography>
      <div className={styles.btnContainer}>
        <Button
          onSubmit={formik.handleSubmit}
          htmlType="submit"
          shape="round"
          size="large"
          className={styles.submitBtn}
          loading={isLoading}
        >
          {submitText || 'Submit'}
        </Button>
      </div>
    </form>
  );
};