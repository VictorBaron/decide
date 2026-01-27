import { forwardRef, Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { AuthModule } from "../auth/auth.module";

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
    UserPersistenceModule.use("orm"),
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
