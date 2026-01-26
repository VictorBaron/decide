import { DynamicModule, Module } from "@nestjs/common";
import { TypeOrmDecisionPersistenceModule } from "./typeorm/type-orm-decision-persistence.module";

@Module({})
export class DecisionPersistenceModule {
  static use(driver: "orm"): DynamicModule {
    const persistenceModule =
      driver === "orm" ? TypeOrmDecisionPersistenceModule : null;

    if (!persistenceModule) {
      throw new Error(`Unsupported persistence driver: ${driver}`);
    }

    return {
      module: DecisionPersistenceModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}
