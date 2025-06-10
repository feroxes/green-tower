import Elements from '../../components/elements/elements';
import RouteHeader from '../../components/route-header/route-header';

import { useLsi } from '../../hooks/hooks';

import { PlantListDto } from '../../types/plants-types';
import { Lsi } from './lsi';
import PlantsList from './plants-list/plants-list';

interface PlantsProps {
  plantsDataList: PlantListDto;
}

function Plants({ plantsDataList }: PlantsProps) {
  const lsi = useLsi();
  const plantsLsi = useLsi(Lsi);

  return (
    <div>
      <RouteHeader
        header={lsi.plants}
        actionButton={
          <Elements.Button fullWidth={false} sx={{}}>
            {plantsLsi.addPlant}
          </Elements.Button>
        }
      />
      <PlantsList plantsDataList={plantsDataList} />
    </div>
  );
}

export default Plants;
