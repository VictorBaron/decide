import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1769603092330 implements MigrationInterface {
  name = "Init1769603092330";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "decisionProposal" DROP COLUMN "dueDate"`
    );
    await queryRunner.query(
      `ALTER TABLE "decisionProposal" ADD "dueDate" TIMESTAMP WITH TIME ZONE NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "decisionProposal" DROP COLUMN "dueDate"`
    );
    await queryRunner.query(
      `ALTER TABLE "decisionProposal" ADD "dueDate" date NOT NULL`
    );
  }
}
