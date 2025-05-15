import type { AxiosError } from 'axios';

export const ErrorHelper = {
  getLsiCode: (error: AxiosError<{ errorCode?: string }>) => {
    if (error?.response?.data?.errorCode) {
      const { errorCode } = error.response.data;
      const errorSplit = errorCode.split('/');
      return errorSplit[errorSplit.length - 1];
    }
  },
};
