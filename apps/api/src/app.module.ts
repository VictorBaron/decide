import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ThrottlerModule } from "@nestjs/throttler";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

import { PrismaModule } from "./prisma/prisma.module";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { HealthModule } from "./health/health.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    // Rate limit global (soft MVP)
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: () => [
        {
          ttl: 60_000,
          limit: 120, // 120 req / minute / IP
        },
      ],
    }),

    // Sert le build Vite copié dans apps/api/public
    // Exclut tout ce qui commence par /api (API reste prioritaire)
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), "apps/api/public"),
      exclude: ["/api*"],
    }),

    PrismaModule,
    UsersModule,
    AuthModule,
    HealthModule,
  ],
})
export class AppModule {}
