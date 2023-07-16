import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFormTOUserInMessageTable1689084131811 implements MigrationInterface {
    name = 'AddFormTOUserInMessageTable1689084131811'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`messages\` DROP FOREIGN KEY \`FK_4838cd4fc48a6ff2d4aa01aa646\``);
        await queryRunner.query(`ALTER TABLE \`messages\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD \`fromUserId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD \`toUserId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD CONSTRAINT \`FK_3096fc70fe5dcc8d516972f17ba\` FOREIGN KEY (\`fromUserId\`) REFERENCES \`Users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD CONSTRAINT \`FK_eb73515d4226282d9b6d2206ab4\` FOREIGN KEY (\`toUserId\`) REFERENCES \`Users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`messages\` DROP FOREIGN KEY \`FK_eb73515d4226282d9b6d2206ab4\``);
        await queryRunner.query(`ALTER TABLE \`messages\` DROP FOREIGN KEY \`FK_3096fc70fe5dcc8d516972f17ba\``);
        await queryRunner.query(`ALTER TABLE \`messages\` DROP COLUMN \`toUserId\``);
        await queryRunner.query(`ALTER TABLE \`messages\` DROP COLUMN \`fromUserId\``);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD \`userId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD CONSTRAINT \`FK_4838cd4fc48a6ff2d4aa01aa646\` FOREIGN KEY (\`userId\`) REFERENCES \`Users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
