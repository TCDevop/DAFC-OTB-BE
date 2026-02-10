"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const helmet_1 = __importDefault(require("helmet"));
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, helmet_1.default)());
    const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3006'];
    app.enableCors({
        origin: (origin, callback) => {
            if (!origin)
                return callback(null, true);
            if (allowedOrigins.includes(origin)) {
                callback(null, true);
            }
            else {
                callback(null, false);
            }
        },
        credentials: true,
    });
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('DAFC OTB Planning API')
        .setDescription('Open-To-Buy Planning Management System for Luxury Fashion')
        .setVersion('1.0')
        .addBearerAuth()
        .addTag('auth', 'Authentication & Authorization')
        .addTag('master-data', 'Brands, Stores, Collections, Categories, SKU Catalog')
        .addTag('budgets', 'Budget Management')
        .addTag('planning', 'OTB Planning & Versions')
        .addTag('proposals', 'SKU Proposals')
        .addTag('approvals', 'Approval Workflow')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const port = process.env.PORT || 4000;
    await app.listen(port, '0.0.0.0');
    console.log(`
  ┌──────────────────────────────────────────┐
  │   DAFC OTB Backend API                   │
  │   Running on: http://localhost:${port}       │
  │   Swagger:    http://localhost:${port}/api/docs │
  └──────────────────────────────────────────┘
  `);
}
bootstrap();
//# sourceMappingURL=main.js.map