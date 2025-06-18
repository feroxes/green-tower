import ClearIcon from '@mui/icons-material/Clear';
import { Breakpoint, Dialog as Dialog_ } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ReactNode } from 'react';

import { useLsi } from '../../hooks/hooks';

import { Config } from '../../config/config';
import Elements from './elements';

type DialogProps = {
  children: ReactNode;
  title: string;
  open: boolean;
  onClose: () => void;
  maxWidth?: Breakpoint;
  actionButton?: ReactNode;
};

function Dialog({ open, onClose, children, title, actionButton, maxWidth = 'md' }: DialogProps) {
  const lsi = useLsi();

  return (
    <Dialog_
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={maxWidth}
      slotProps={{ paper: { sx: { borderRadius: Config.commonBorderRadius } } }}
    >
      <Elements.Card sx={{ flexDirection: 'column' }}>
        <DialogTitle sx={{ py: 1.5 }}>
          <Stack direction="row" sx={{ justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
            <Typography variant="h5">{title}</Typography>
            <IconButton size="small" onClick={onClose}>
              <ClearIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>{children}</DialogContent>
        {actionButton && (
          <DialogActions>
            {actionButton}
            <Elements.Button
              onClick={onClose}
              fullWidth={false}
              sx={{
                backgroundColor: Config.colors.sand,
                color: Config.colors.brown,
                border: '1ps solid #fff',
                ml: 1,
                '&:hover': {
                  backgroundColor: Config.colors.orange,
                },
              }}
            >
              {lsi.cancel}
            </Elements.Button>
          </DialogActions>
        )}
      </Elements.Card>
    </Dialog_>
  );
}

export default Dialog;
