import { useState } from 'react';

import Elements from '../../components/elements/elements';
import RouteHeader from '../../components/route-header/route-header';

import { useLsi } from '../../hooks/hooks';

import { PlantListDto } from '../../types/plants-types';
import { Lsi } from './lsi';
import PlantForm from './plant-form/plant-form';
import PlantsList from './plants-list/plants-list';

interface PlantsProps {
  plantsDataList: PlantListDto;
}

function Plants({ plantsDataList }: PlantsProps) {
  const lsi = useLsi();
  const plantsLsi = useLsi(Lsi);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <RouteHeader
        header={lsi.plants}
        actionButton={
          <Elements.Button fullWidth={false} onClick={() => setOpen(true)}>
            {plantsLsi.addPlant}
          </Elements.Button>
        }
      />
      <PlantsList plantsDataList={plantsDataList} />
      {open && (
        <Elements.Dialog open onClose={() => setOpen(false)} title={plantsLsi.createPlant}>
          <PlantForm onClose={() => setOpen(false)} />
        </Elements.Dialog>
      )}
    </div>
  );
}
export default Plants;
