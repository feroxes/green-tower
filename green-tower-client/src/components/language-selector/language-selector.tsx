import { SelectChangeEvent } from '@mui/material';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import React from 'react';

import { useLanguage } from '../../hooks/common/use-language';

import ukFlag from '../../assets/flags/ukraine.png';
import enFlag from '../../assets/flags/united-kingdom.png';
import { SupportedLanguages } from '../../types/types';
import { Constants } from '../../utils/constants';

const languageList = [
  { code: SupportedLanguages.EN, icon: enFlag, value: 'English' },
  { code: SupportedLanguages.UK, icon: ukFlag, value: 'Українська' },
];

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const handleChange = (e: SelectChangeEvent<string>) => {
    setLanguage(e.target.value as SupportedLanguages);
  };

  return (
    <Select
      value={language}
      onChange={handleChange}
      size="small"
      variant="standard"
      disableUnderline
      renderValue={(value) => {
        const sel = languageList.find((l) => l.code === value);
        if (!sel) return null;
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Box component="img" src={sel.icon} alt={sel.code} sx={{ width: 24, height: 24 }} />
            {Constants.space}
            <Typography variant="subtitle2">{sel.value}</Typography>
          </div>
        );
      }}
      sx={{
        height: 24,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& .MuiSelect-select': {
          display: 'flex',
        },
      }}
      IconComponent={() => null}
    >
      {languageList.map(({ code, icon, value }) => (
        <MenuItem dense key={code} value={code}>
          <Box component="img" src={icon} alt={code} sx={{ width: 24, height: 24 }} />
          {Constants.space}
          <Typography variant="subtitle2">{value}</Typography>
        </MenuItem>
      ))}
    </Select>
  );
};

export default LanguageSelector;
