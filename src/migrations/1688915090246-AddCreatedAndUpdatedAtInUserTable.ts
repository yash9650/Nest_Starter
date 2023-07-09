import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCreatedAndUpdatedAtInUserTable1688915090246 implements MigrationInterface {
    name = 'AddCreatedAndUpdatedAtInUserTable1688915090246'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Users\` ADD \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`Users\` ADD \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Users\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`Users\` DROP COLUMN \`createdAt\``);
    }

}
