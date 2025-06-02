import { Injectable } from '@nestjs/common';

import { TokenService } from '@services/token/token.service';

import { RefreshDto } from '@dtos/auth.dto';

@Injectable()
export class AuthRefreshService {
  constructor(private tokenService: TokenService) {}

  async refresh(refreshDto: RefreshDto): Promise<{ newAccessToken: string }> {
    const { refreshToken } = refreshDto;
    const newAccessToken = await this.tokenService.refreshAccessToken(refreshToken);

    return { newAccessToken };
  }
}
