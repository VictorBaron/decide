import { MigrationInterface, QueryRunner } from "typeorm";

export class Decisions1769624929045 implements MigrationInterface {
  name = "Decisions1769624929045";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "decisionProposal" ADD "decided" boolean NOT NULL DEFAULT false`
    );
    await queryRunner.query(
      `ALTER TABLE "decisionProposal" ALTER COLUMN "criticality" TYPE VARCHAR(125)`
    );
    await queryRunner.query(
      `ALTER TABLE "decisionProposal" ADD CONSTRAINT "FK_19a09d8277712c0ef861524b964" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "decisionProposal" ADD CONSTRAINT "FK_3fd849e63464b8320019762d3b3" FOREIGN KEY ("deciderId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "decision" ADD CONSTRAINT "FK_4f733439a9247ec50586d9a811d" FOREIGN KEY ("proposalId") REFERENCES "decisionProposal"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "decision" ADD CONSTRAINT "FK_dda1b813a42827dd62cac4393d5" FOREIGN KEY ("selectedOptionId") REFERENCES "decisionProposalOption"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "decision" ADD CONSTRAINT "FK_991a9f4a04e1f50bf23e2158aba" FOREIGN KEY ("decidedByUserId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "decision" DROP CONSTRAINT "FK_991a9f4a04e1f50bf23e2158aba"`
    );
    await queryRunner.query(
      `ALTER TABLE "decision" DROP CONSTRAINT "FK_dda1b813a42827dd62cac4393d5"`
    );
    await queryRunner.query(
      `ALTER TABLE "decision" DROP CONSTRAINT "FK_4f733439a9247ec50586d9a811d"`
    );
    await queryRunner.query(
      `ALTER TABLE "decisionProposal" DROP CONSTRAINT "FK_3fd849e63464b8320019762d3b3"`
    );
    await queryRunner.query(
      `ALTER TABLE "decisionProposal" DROP CONSTRAINT "FK_19a09d8277712c0ef861524b964"`
    );
    await queryRunner.query(
      `ALTER TABLE "decisionProposal" DROP COLUMN "criticality"`
    );
    await queryRunner.query(
      `ALTER TABLE "decisionProposal" ADD "criticality" character varying(10000) NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "decisionProposal" DROP COLUMN "decided"`
    );
  }
}
