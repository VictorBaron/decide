import { MigrationInterface, QueryRunner } from "typeorm";

export class ContextToJsonb1769700000000 implements MigrationInterface {
  name = "ContextToJsonb1769700000000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add a temporary column for the new jsonb data
    await queryRunner.query(
      `ALTER TABLE "decisionProposal" ADD COLUMN "context_new" jsonb`
    );

    // Migrate existing text data to BlockNote paragraph format
    await queryRunner.query(`
      UPDATE "decisionProposal"
      SET "context_new" = CASE
        WHEN "context" IS NOT NULL AND "context" != '' THEN
          jsonb_build_array(
            jsonb_build_object(
              'id', gen_random_uuid()::text,
              'type', 'paragraph',
              'props', jsonb_build_object(
                'textColor', 'default',
                'backgroundColor', 'default',
                'textAlignment', 'left'
              ),
              'content', jsonb_build_array(
                jsonb_build_object(
                  'type', 'text',
                  'text', "context",
                  'styles', jsonb_build_object()
                )
              ),
              'children', jsonb_build_array()
            )
          )
        ELSE NULL
      END
    `);

    // Drop the old column
    await queryRunner.query(
      `ALTER TABLE "decisionProposal" DROP COLUMN "context"`
    );

    // Rename the new column to context
    await queryRunner.query(
      `ALTER TABLE "decisionProposal" RENAME COLUMN "context_new" TO "context"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Add a temporary column for the old varchar data
    await queryRunner.query(
      `ALTER TABLE "decisionProposal" ADD COLUMN "context_old" varchar(10000)`
    );

    // Extract text from BlockNote format back to plain text
    await queryRunner.query(`
      UPDATE "decisionProposal"
      SET "context_old" = CASE
        WHEN "context" IS NOT NULL THEN
          (
            SELECT string_agg(
              COALESCE(content_item->>'text', ''),
              ''
            )
            FROM jsonb_array_elements("context") AS block,
                 jsonb_array_elements(block->'content') AS content_item
          )
        ELSE NULL
      END
    `);

    // Drop the jsonb column
    await queryRunner.query(
      `ALTER TABLE "decisionProposal" DROP COLUMN "context"`
    );

    // Rename the old column to context
    await queryRunner.query(
      `ALTER TABLE "decisionProposal" RENAME COLUMN "context_old" TO "context"`
    );
  }
}
