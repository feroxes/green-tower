import { Command } from '@nestjs/cqrs';

export class DeletePlantingCommand {
  constructor(public readonly id: string) {}
} 