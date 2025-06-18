import React from 'react';

import { useLsi } from '../../hooks/common/use-lsi';

import Text from './text';

function Email({ ...props }) {
  const commonLsi = useLsi();
  return <Text fullWidth margin="dense" size="small" autoComplete="email" label={commonLsi.email} {...props} />;
}

export default Email;
