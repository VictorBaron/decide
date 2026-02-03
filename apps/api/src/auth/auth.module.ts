import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
 import { CookieAuthGuard } from "./cookie-auth.guard";
import { GoogleStrategy } from "./google.strategy";
import { GoogleAuthGuard } from "./google-auth.guard";
import { UsersModule } from "src/core/users/users.module";

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule.register({ defaultStrategy: "google" }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>("JWT_SECRET", { infer: true })!,
        signOptions: { expiresIn: "7d" },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, CookieAuthGuard, GoogleStrategy, GoogleAuthGuard],
  exports: [AuthService, CookieAuthGuard],
})
export class AuthModule {}
