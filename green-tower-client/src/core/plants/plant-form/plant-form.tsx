import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { FormProvider, Resolver, SubmitHandler, useForm } from 'react-hook-form';

import { usePlants } from '../../../hooks/plants/use-plants';

import { PlantCreateDto, PlantDto } from '../../../types/plants-types';
import PlantFormView from './plant-form-view';
import { getPlantSchema } from './validation/plant.schema';

interface PlantFormProps {
  plantDataObject?: PlantDto;
  onClose: () => void;
}

function PlantForm({ plantDataObject, onClose }: PlantFormProps) {
  const schema = getPlantSchema();
  const { createPlant, updatePlant, isPending } = usePlants();

  const methods = useForm<PlantCreateDto>({
    resolver: yupResolver(schema) as Resolver<PlantCreateDto>,
    defaultValues: plantDataObject as PlantCreateDto,
  });

  useEffect(() => {
    if (plantDataObject) methods.reset(plantDataObject);
  }, [plantDataObject, methods.reset]);

  const onSubmit: SubmitHandler<PlantCreateDto> = async (data) => {
    if (!data.notes) delete data.notes;
    else data.notes = data.notes.trim();

    if (plantDataObject) {
      await updatePlant({ id: plantDataObject.id, ...data })
        .then(() => onClose())
        .catch((err) => console.error(err));
    } else {
      await createPlant(data)
        .then(() => onClose())
        .catch((err) => console.error(err));
    }
  };

  return (
    <FormProvider {...methods}>
      <PlantFormView
        register={methods.register}
        onSubmit={methods.handleSubmit(onSubmit)}
        errors={methods.formState.errors}
        isPending={isPending}
        plantDataObject={plantDataObject}
        onClose={onClose}
      />
    </FormProvider>
  );
}

export default PlantForm;
