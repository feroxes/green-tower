import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { FormEventHandler, useEffect, useRef, useState } from 'react';
import { type FieldErrors, useFormContext, type UseFormRegister, useWatch } from 'react-hook-form';

import Elements from '../../../components/elements/elements';
import FormElements from '../../../components/form-elements/form-elements';

import { useLsi } from '../../../hooks/hooks';
import { plantImageMap, useAutoPlantImage } from '../../../hooks/plants/use-auto-plant-image';

import { Config } from '../../../config/config';
import { PlantCreateDto, PlantDto, PlantType } from '../../../types/plants-types';
import { Constants } from '../../../utils/constants';
import { Lsi } from '../lsi';

interface PlantFormViewProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
  errors: FieldErrors<PlantCreateDto>;
  register: UseFormRegister<PlantCreateDto>;
  isPending: boolean;
  plantDataObject?: PlantDto;
  onClose: () => void;
}

const gridItem = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
  gap: 2,
};

function PlantFormView({ onSubmit, errors, register, isPending, plantDataObject, onClose }: PlantFormViewProps) {
  const lsi = useLsi();
  const plantLsi = useLsi(Lsi);
  const { setValue } = useFormContext<PlantCreateDto>();
  const name = useWatch({ name: 'name' });

  const [isManualImageSet, setIsManualImageSet] = useState(false);
  const [imageUrl, setImageUrl] = useState(plantImageMap.general);
  const autoImageUrl = useAutoPlantImage(name);

  const previousImageRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (!isManualImageSet && autoImageUrl !== previousImageRef.current) {
      setValue('imageUrl', autoImageUrl);
      previousImageRef.current = autoImageUrl;
      setImageUrl(autoImageUrl);
    }
  }, [autoImageUrl, isManualImageSet, setValue]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsManualImageSet(!!e.target.value);
    setImageUrl(e.target.value);
  };

  const getImageSelectOptions = () => {
    return Object.keys(plantImageMap).map((key) => {
      const typedKey = key as keyof typeof plantLsi;
      return {
        value: plantImageMap[key],
        label: (
          <Box sx={{ display: 'grid', gridTemplateColumns: '40px auto', alignItems: 'center' }}>
            <img src={plantImageMap[key]} alt={key} height={30} style={{ margin: 'auto' }} />
            {Constants.space}
            {plantLsi[typedKey]}
          </Box>
        ),
      };
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <Box sx={gridItem}>
        <FormElements.Text
          {...register('name')}
          error={Boolean(errors.name)}
          helperText={errors.name?.message ?? ''}
          disabled={isPending}
          placeholder={plantLsi.name}
          label={plantLsi.name}
          autoFocus
          required
        />
        <FormElements.Select
          {...register('imageUrl')}
          error={Boolean(errors.imageUrl)}
          helperText={errors.imageUrl?.message ?? ''}
          disabled={isPending}
          placeholder={plantLsi.imageUrl}
          label={plantLsi.imageUrl}
          value={imageUrl}
          onChange={handleImageChange}
          options={getImageSelectOptions()}
        />
        <FormElements.Select
          {...register('type')}
          error={Boolean(errors.type)}
          helperText={errors.type?.message ?? ''}
          placeholder={plantLsi.type}
          label={plantLsi.type}
          defaultValue={PlantType.MICROGREEN}
          disabled
          options={[
            { value: PlantType.MICROGREEN, label: lsi.microgreen },
            { value: PlantType.COMMON, label: lsi.common },
          ]}
        />
        <Box sx={gridItem}>
          <FormElements.Text
            {...register('seedsGramPerPlate')}
            error={Boolean(errors.seedsGramPerPlate)}
            helperText={errors.seedsGramPerPlate?.message ?? ''}
            disabled={isPending}
            placeholder={plantLsi.seedsGramPerPlateG}
            label={plantLsi.seedsGramPerPlateG}
            type="number"
            inputProps={{ min: 1 }}
            required
          />
          <FormElements.Text
            {...register('expectedHarvestGramsPerPlate')}
            error={Boolean(errors.expectedHarvestGramsPerPlate)}
            helperText={errors.expectedHarvestGramsPerPlate?.message ?? ''}
            disabled={isPending}
            placeholder={plantLsi.expectedHarvestGramsPerPlateG}
            label={plantLsi.expectedHarvestGramsPerPlateG}
            type="number"
            inputProps={{ min: 1 }}
            required
          />
        </Box>
        <FormElements.Text
          {...register('notes')}
          error={Boolean(errors.notes)}
          helperText={errors.notes?.message ?? ''}
          disabled={isPending}
          placeholder={plantLsi.notes}
          label={plantLsi.notes}
          multiline
          rows={4}
        />
        <div>
          <Box sx={gridItem}>
            <FormElements.Text
              {...register('expectedHoursToHarvest')}
              error={Boolean(errors.expectedHoursToHarvest)}
              helperText={errors.expectedHoursToHarvest?.message ?? ''}
              disabled={isPending}
              placeholder={plantLsi.expectedHoursToHarvestH}
              label={plantLsi.expectedHoursToHarvestH}
              type="number"
              inputProps={{ min: 1 }}
              required
            />
            <FormElements.Text
              {...register('sellPricePerPlate')}
              error={Boolean(errors.sellPricePerPlate)}
              helperText={errors.sellPricePerPlate?.message ?? ''}
              disabled={isPending}
              placeholder={plantLsi.sellPricePerPlate}
              label={plantLsi.sellPricePerPlate}
              type="number"
              inputProps={{ min: 1 }}
              required
            />
          </Box>
          <Box sx={gridItem}>
            <FormElements.Text
              {...register('hoursToSoak')}
              error={Boolean(errors.hoursToSoak)}
              helperText={errors.hoursToSoak?.message ?? ''}
              disabled={isPending}
              placeholder={plantLsi.hoursToSoakH}
              label={plantLsi.hoursToSoakH}
              type="number"
              inputProps={{ min: 1 }}
            />
            <FormElements.Text
              {...register('hoursToMoveToLight')}
              error={Boolean(errors.hoursToMoveToLight)}
              helperText={errors.hoursToMoveToLight?.message ?? ''}
              disabled={isPending}
              placeholder={plantLsi.hoursToMoveToLightH}
              label={plantLsi.hoursToMoveToLightH}
              type="number"
              inputProps={{ min: 1 }}
            />
          </Box>
        </div>

        <Stack direction="row" sx={{ alignItems: 'center' }}>
          <Checkbox {...register('shouldBePressed')} disabled={isPending} />
          {Constants.space}
          <Typography variant="body2">{plantLsi.shouldBePressed}</Typography>
        </Stack>
      </Box>
      <Stack direction="row" sx={{ justifyContent: 'flex-end' }}>
        <Elements.Button loading={isPending} type="submit" fullWidth={false} onClick={onSubmit}>
          {plantDataObject ? lsi.update : lsi.create}
        </Elements.Button>
        <Elements.Button
          fullWidth={false}
          onClick={onClose}
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
      </Stack>
    </form>
  );
}

export default PlantFormView;
