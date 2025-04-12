import { ConfigService } from '@nestjs/config';
export declare class EmailService {
    private configService;
    private transporter;
    constructor(configService: ConfigService);
    sendEmailConfirmation(email: string, token: string): Promise<void>;
}
