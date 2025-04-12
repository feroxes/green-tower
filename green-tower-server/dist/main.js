"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./api/modules/app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
    app.useGlobalInterceptors(new common_2.ClassSerializerInterceptor(app.get(core_1.Reflector)));
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map