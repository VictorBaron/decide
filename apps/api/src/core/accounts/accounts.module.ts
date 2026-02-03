import { Module } from "@nestjs/common";
import { AccountsController } from "./accounts.controller";
import { MembersController, InvitationsController } from "./members.controller";

import {
  CreateAccountHandler,
  UpdateAccountHandler,
  DeleteAccountHandler,
  InviteMemberHandler,
  AcceptInvitationHandler,
  DisableMemberHandler,
  EnableMemberHandler,
  ChangeMemberRoleHandler,
} from "./application/commands";

import {
  GetAccountByIdHandler,
  GetUserAccountsHandler,
  GetAccountMembersHandler,
  GetPendingInvitationsHandler,
} from "./application/queries";

import { AccountPersistenceModule } from "./infrastructure/persistence/account-persistence.module";
import { UserPersistenceModule } from "../users/infrastructure";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [
    AuthModule,
    AccountPersistenceModule.use("orm"),
    UserPersistenceModule.use("orm"),
  ],
  controllers: [AccountsController, MembersController, InvitationsController],
  providers: [
    CreateAccountHandler,
    UpdateAccountHandler,
    DeleteAccountHandler,
    InviteMemberHandler,
    AcceptInvitationHandler,
    DisableMemberHandler,
    EnableMemberHandler,
    ChangeMemberRoleHandler,
    GetAccountByIdHandler,
    GetUserAccountsHandler,
    GetAccountMembersHandler,
    GetPendingInvitationsHandler,
  ],
  exports: [
    GetAccountByIdHandler,
    GetUserAccountsHandler,
    GetAccountMembersHandler,
    GetPendingInvitationsHandler,
  ],
})
export class AccountsModule {}
