import { MigrationInterface, QueryRunner } from "typeorm";

export class ContextRichTextEditor1769787945278 implements MigrationInterface {
    name = 'ContextRichTextEditor1769787945278'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "decisionProposal" DROP COLUMN "context"`);
        await queryRunner.query(`ALTER TABLE "decisionProposal" ADD "context" jsonb NOT NULL DEFAULT '[]'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "decisionProposal" DROP COLUMN "context"`);
        await queryRunner.query(`ALTER TABLE "decisionProposal" ADD "context" character varying(10000)`);
    }

}
