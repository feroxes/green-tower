import Box from '@mui/material/Box';

import NoData from '../../../components/no-data/no-data';

import { useLsi } from '../../../hooks/hooks';

import { PlantDto, PlantListDto } from '../../../types/plants-types';
import { Lsi } from '../lsi';
import PlantCard from '../plant-card/plant-card';

interface PlantsListProps {
  plantsDataList: PlantListDto;
}

function PlantsList({ plantsDataList }: PlantsListProps) {
  const plantsLsi = useLsi(Lsi);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 2 }}>
      {plantsDataList.itemList.length ? (
        plantsDataList.itemList.map((plantDataObject: PlantDto, key) => (
          <Box key={key} sx={{ maxWidth: 320, mx: 'auto', width: '100%' }}>
            <PlantCard plantDataObject={plantDataObject} />
          </Box>
        ))
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <NoData header={plantsLsi.noPlantsAdded} subheader={plantsLsi.addNewPlant} />
        </Box>
      )}
    </Box>
  );
}

export default PlantsList;
