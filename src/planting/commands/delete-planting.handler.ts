import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeletePlantingCommand } from './delete-planting.command';
import { PlantingRepository } from '../repositories/planting.repository';

@CommandHandler(DeletePlantingCommand)
export class DeletePlantingHandler implements ICommandHandler<DeletePlantingCommand> {
  constructor(private readonly plantingRepository: PlantingRepository) {}

  async execute(command: DeletePlantingCommand): Promise<void> {
    const { id } = command;
    await this.plantingRepository.delete(id);
  }
} 