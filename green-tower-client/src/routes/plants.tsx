import DataStateResolver from '../components/data-state-resolver/data-state-resolver';

import { usePlants } from '../hooks/plants/use-plants';

import Plants from '../core/plants/plants';
import { PlantListDto } from '../types/plants-types';

function PlantsRoute() {
  const { query } = usePlants();

  return (
    <DataStateResolver query={query}>
      {({ data }) => {
        return <Plants plantsDataList={data as PlantListDto} />;
      }}
    </DataStateResolver>
  );
}

export default PlantsRoute;
