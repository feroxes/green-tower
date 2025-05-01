import { Injectable } from '@nestjs/common';

import { TokenService } from '../token/token.service';

import { RefreshDto } from '../../api/dtos/auth.dto';

@Injectable()
export class AuthRefreshService {
  constructor(private tokenService: TokenService) {}

  async refresh(refreshDto: RefreshDto): Promise<{ newAccessToken: string }> {
    const { refreshToken } = refreshDto;
    const newAccessToken = await this.tokenService.refreshAccessToken(refreshToken);

    return { newAccessToken };
  }
}
