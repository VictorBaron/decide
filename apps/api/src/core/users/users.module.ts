import { forwardRef, Module } from "@nestjs/common";

// Application layer - Commands
import {
  CreateUserHandler,
  CreateOAuthUserHandler,
  LinkGoogleAccountHandler,
} from "./application/commands";

// Application layer - Queries
import {
  GetUserByIdHandler,
  GetUserByEmailHandler,
  GetUserByGoogleIdHandler,
  GetAllUsersHandler,
} from "./application/queries";

import { UserPersistenceModule } from "./infrastructure/persistence/user-persistence.module";
import { UsersController } from "./users.controller";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [forwardRef(() => AuthModule), UserPersistenceModule.use("orm")],
  controllers: [UsersController],
  providers: [
    // Commands
    CreateUserHandler,
    CreateOAuthUserHandler,
    LinkGoogleAccountHandler,
    // Queries
    GetUserByIdHandler,
    GetUserByEmailHandler,
    GetUserByGoogleIdHandler,
    GetAllUsersHandler,
  ],
  exports: [
    // Commands
    CreateUserHandler,
    CreateOAuthUserHandler,
    LinkGoogleAccountHandler,
    // Queries
    GetUserByIdHandler,
    GetUserByEmailHandler,
    GetUserByGoogleIdHandler,
    GetAllUsersHandler,
  ],
})
export class UsersModule {}
