import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Elements from '../../../components/elements/elements';
import FormElements from '../../../components/form-elements/form-elements';

import { useLsi } from '../../../hooks/hooks';

import { PlantDto } from '../../../types/plants-types';
import { ColorScheme } from '../../../types/types';
import { NumberHelper } from '../../../utils/number-helper';
import { Lsi } from '../lsi';
import PlantCardImage from '../plant-card/plant-card-image';
import PlantDetailRowItem from './plant-detail-row-item';

interface PlantDetailViewProps {
  plantDataObject: PlantDto;
}

function PlantDetailView({ plantDataObject }: PlantDetailViewProps) {
  const lsi = useLsi();
  const plantsLsi = useLsi(Lsi);

  return (
    <Stack sx={{ alignItems: 'center' }}>
      <Stack direction="row" spacing={1} alignItems="center">
        <PlantCardImage imageUrl={plantDataObject.imageUrl} size={120} />
        <div>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
            {plantDataObject.name}
          </Typography>
          <Elements.Label colorScheme={ColorScheme.SUCCESS}>{lsi[plantDataObject.type]}</Elements.Label>
        </div>
      </Stack>
      <Stack sx={{ display: 'flex', gap: 2, width: '100%', mt: 2, flexWrap: 'wrap' }} direction="row">
        <div>
          <PlantDetailRowItem
            label={plantsLsi.seedsGramPerPlate}
            value={plantDataObject.seedsGramPerPlate}
            unit={lsi.g}
          />
          <PlantDetailRowItem
            label={plantsLsi.expectedHoursToHarvest}
            value={plantDataObject.expectedHoursToHarvest}
            unit={lsi.h}
          />
          <PlantDetailRowItem
            label={plantsLsi.expectedDaysToHarvest}
            value={NumberHelper.roundToTwoDigits(plantDataObject.expectedHoursToHarvest / 24)}
            unit={lsi.days.toLowerCase()}
          />
          {plantDataObject.hoursToSoak && (
            <PlantDetailRowItem label={plantsLsi.hoursToSoak} value={plantDataObject.hoursToSoak} unit={lsi.h} />
          )}
          {plantDataObject.hoursToMoveToLight && (
            <PlantDetailRowItem
              label={plantsLsi.hoursToMoveToLight}
              value={plantDataObject.hoursToMoveToLight}
              unit={lsi.h}
            />
          )}
          {Object.hasOwn(plantDataObject, 'shouldBePressed') && (
            <PlantDetailRowItem
              label={plantsLsi.shouldBePressed}
              value={plantDataObject.shouldBePressed ? lsi.yes : lsi.no}
              unit={' '}
            />
          )}
        </div>
        <div>
          <PlantDetailRowItem
            label={plantsLsi.expectedHarvestGramsPerPlate}
            value={plantDataObject.expectedHarvestGramsPerPlate}
            unit={lsi.g}
          />
          <PlantDetailRowItem
            label={plantsLsi.expectedHarvestGramsPerHundredGrams}
            value={NumberHelper.roundToTwoDigits(plantDataObject.expectedHarvestGramsPerGramOfSeeds * 100)}
            unit={lsi.g}
          />
          <PlantDetailRowItem
            label={plantsLsi.sellPricePerPlate}
            value={NumberHelper.roundToTwoDigits(plantDataObject.sellPricePerPlate)}
            unit={lsi.uah}
          />
          <PlantDetailRowItem
            label={plantsLsi.sellPricePerHundredGrams}
            value={NumberHelper.roundToTwoDigits(plantDataObject.sellPricePerGram * 100)}
            unit={lsi.uah}
          />
        </div>
      </Stack>
      {plantDataObject.notes && <FormElements.Text readOnly value={plantDataObject.notes} multiline rows={3} />}
    </Stack>
  );
}

export default PlantDetailView;
