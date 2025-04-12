"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const schedule_1 = require("@nestjs/schedule");
const typeorm_1 = require("@nestjs/typeorm");
const farm_entity_1 = require("../../entities/farm.entity");
const plant_entity_1 = require("../../entities/plant.entity");
const user_entity_1 = require("../../entities/user.entity");
const auth_module_1 = require("./auth.module");
const farm_module_1 = require("./farm.module");
const jwt_module_1 = require("./jwt.module");
const plant_module_1 = require("./plant.module");
const user_module_1 = require("./user.module");
const cleanup_service_1 = require("../../services/cleanup/cleanup.service");
const token_service_1 = require("../../services/token/token.service");
const refresh_token_middleware_1 = require("../../middleware/refresh-token.middleware");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(refresh_token_middleware_1.RefreshTokenMiddleware).exclude('/auth/(.*)').forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, farm_entity_1.Farm]),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: `.env/.env.${process.env.NODE_ENV}`,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => {
                    return {
                        type: 'postgres',
                        host: config.get('HOST'),
                        port: config.get('PORT'),
                        username: config.get('USERNAME'),
                        password: config.get('PASSWORD'),
                        database: config.get('DB_NAME'),
                        autoLoadEntities: config.get('AUTO_LOAD_ENTITIES'),
                        synchronize: config.get('SYNCHRONIZE'),
                        entities: [farm_entity_1.Farm, user_entity_1.User, plant_entity_1.Plant],
                    };
                },
            }),
            schedule_1.ScheduleModule.forRoot(),
            jwt_module_1.JwtGlobalModule,
            farm_module_1.FarmModule,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            plant_module_1.PlantModule,
        ],
        controllers: [],
        providers: [token_service_1.TokenService, cleanup_service_1.CleanupService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map