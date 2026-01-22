import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ThrottlerModule } from "@nestjs/throttler";
import { ServeStaticModule } from "@nestjs/serve-static";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CqrsModule } from "@nestjs/cqrs";
import { join } from "path";

import { PrismaModule } from "./prisma/prisma.module";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { HealthModule } from "./health/health.module";
import { DecisionProposalsModule } from "./decision-proposals/decision-proposals.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CqrsModule.forRoot(),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: "postgres",
        url: config.get<string>("DATABASE_URL"),
        autoLoadEntities: true,
        synchronize: config.get("NODE_ENV") !== "production",
      }),
    }),
    // Rate limit globally: 120 requests per minute per IP
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: () => [
        {
          ttl: 60_000,
          limit: 120,
        },
      ],
    }),

    // Serves the Vite build copied in apps/api/public
    // Excludes everything starting with /api (API remains prioritized)
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), "apps/api/public"),
      exclude: ["/api*"],
    }),

    PrismaModule,
    UsersModule,
    AuthModule,
    HealthModule,
    DecisionProposalsModule,
  ],
})
export class AppModule {}
