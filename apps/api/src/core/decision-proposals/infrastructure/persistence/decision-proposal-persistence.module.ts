import { DynamicModule, Module } from "@nestjs/common";
import { TypeOrmDecisionProposalPersistenceModule } from "./typeorm/type-orm-decision-proposal-persistence.module";
import { InMemoryDecisionProposalPersistenceModule } from "./inmemory/in-memory-decision-proposal-persistence.module";

@Module({})
export class DecisionProposalPersistenceModule {
  static use(driver: "orm" | "in-memory"): DynamicModule {
    const persistenceModule =
      driver === "orm"
        ? TypeOrmDecisionProposalPersistenceModule
        : InMemoryDecisionProposalPersistenceModule;

    return {
      module: DecisionProposalPersistenceModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}
