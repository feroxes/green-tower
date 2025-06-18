import Typography from '@mui/material/Typography';
import { JSX } from 'react';

import { Constants } from '../../../utils/constants';

interface PlantDetailRowItemProps {
  label: string;
  value: string | number | JSX.Element;
  unit: string;
}

function PlantDetailRowItem({ label, value, unit }: PlantDetailRowItemProps) {
  return (
    <div style={{ marginBottom: '12px', fontSize: '18px' }}>
      <Typography sx={{ fontWeight: 600, display: 'inline', fontSize: '18px' }}>{label}:</Typography>
      {Constants.space}
      {value}
      {Constants.space}
      {unit}
    </div>
  );
}

export default PlantDetailRowItem;
