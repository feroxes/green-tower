import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import React, { useCallback, useState } from 'react';

import Elements from '../../../components/elements/elements';

import { useLsi } from '../../../hooks/hooks';
import { usePlants } from '../../../hooks/plants/use-plants';

import { PlantDto } from '../../../types/plants-types';
import { Constants } from '../../../utils/constants';
import { Lsi } from '../lsi';
import PlantDetailView from '../plant-detail/plant-detail-view';
import PlantForm from '../plant-form/plant-form';
import PlantCardContent from './plant-card-content';
import PlantCardImage from './plant-card-image';

interface PlantCardProps {
  plantDataObject: PlantDto;
}

function PlantCard({ plantDataObject }: PlantCardProps) {
  const lsi = useLsi();
  const { deletePlant } = usePlants();
  const plantsLsi = useLsi(Lsi);
  const [updateFormOpen, setUpdateFormOpen] = useState(false);
  const [deleteFormOpen, setDeleteFormOpen] = useState(false);
  const [plantDetailOpen, setPlantDetailOpen] = useState(false);

  async function handleOnPlantDelete() {
    await deletePlant({ id: plantDataObject.id })
      .then(() => setDeleteFormOpen(false))
      .catch((e) => console.error(e));
  }

  const getMenuOptions = useCallback(() => {
    return [
      { label: lsi.edit, onClick: () => setUpdateFormOpen(true) },
      { label: lsi.delete, onClick: () => setDeleteFormOpen(true) },
    ];
  }, [lsi]);

  return (
    <Box sx={{ maxWidth: '320px', position: 'relative' }}>
      <Elements.Card onClick={() => setPlantDetailOpen(true)} menuOptions={getMenuOptions()}>
        <Stack direction="row" sx={{ py: 1, pl: 1, pr: 2 }}>
          <Box sx={{ mr: 2 }}>
            <PlantCardImage imageUrl={plantDataObject.imageUrl} />
          </Box>
          <PlantCardContent plantDataObject={plantDataObject} />
        </Stack>
      </Elements.Card>

      {updateFormOpen && (
        <Elements.Dialog open onClose={() => setUpdateFormOpen(false)} title={plantsLsi.updatePlant}>
          <PlantForm onClose={() => setUpdateFormOpen(false)} plantDataObject={plantDataObject} />
        </Elements.Dialog>
      )}
      {deleteFormOpen && (
        <Elements.Dialog
          open
          maxWidth="sm"
          onClose={() => setDeleteFormOpen(false)}
          title={plantsLsi.deletePlant}
          actionButton={
            <Elements.Button fullWidth={false} onClick={handleOnPlantDelete}>
              {lsi.delete}
            </Elements.Button>
          }
        >
          {plantsLsi.aboutToDelete}
          {Constants.space}
          <b>{plantDataObject.name}</b>
        </Elements.Dialog>
      )}
      {plantDetailOpen && (
        <Elements.Dialog
          open
          onClose={() => setPlantDetailOpen(false)}
          title=" "
          maxWidth="sm"
          actionButton={
            <Elements.Button fullWidth={false} onClick={() => setUpdateFormOpen(true)}>
              {lsi.edit}
            </Elements.Button>
          }
        >
          <PlantDetailView plantDataObject={plantDataObject} />
        </Elements.Dialog>
      )}
    </Box>
  );
}

export default PlantCard;
