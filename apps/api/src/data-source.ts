import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";
import { UserTypeOrm } from "./users/infrastructure/persistence/typeorm/models/user.typeorm";
import { DecisionTypeOrm } from "./decisions/infrastructure/persistence/typeorm/models/decision.typeorm";
import { DecisionProposalTypeOrm } from "./decision-proposals/infrastructure/persistence/typeorm/models/decision-proposal.typeorm";
import { DecisionProposalOptionTypeOrm } from "./decision-proposals/infrastructure/persistence/typeorm/models/decision-proposal-option.typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: [
    UserTypeOrm,
    DecisionTypeOrm,
    DecisionProposalTypeOrm,
    DecisionProposalOptionTypeOrm,
  ],
  migrations: ["src/migrations/*.ts"],
});
