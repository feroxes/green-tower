import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TestingModule } from '@nestjs/testing';

import { Farm } from '../../src/entities/farm.entity';
import { UserRole } from '../../src/entities/user.entity';
import { User } from '../../src/entities/user.entity';

type PayloadType = {
  sub: string;
  email: string;
  role: string;
  farmId: string;
};

export function getAccessTokenWithWrongOwner(module: TestingModule, owner: User, farm: Farm): string {
  const payload = {
    sub: crypto.randomUUID(),
    email: owner.email,
    role: UserRole.OWNER,
    farmId: farm.id,
  };
  return generateToken(module, payload);
}

export function getAccessTokenWithWrongFarm(module: TestingModule, owner: User): string {
  const payload = {
    sub: owner.id,
    email: owner.email,
    role: UserRole.OWNER,
    farmId: crypto.randomUUID(),
  };
  return generateToken(module, payload);
}

function generateToken(module: TestingModule, payload: PayloadType) {
  const configService = module.get(ConfigService);
  const secret: string = configService.get('JWT_SECRET')!;
  const jwtService = new JwtService({
    secret,
    signOptions: { expiresIn: '60s' },
  });
  return jwtService.sign(payload);
}
