import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoomsTable1689500903097 implements MigrationInterface {
    name = 'AddRoomsTable1689500903097'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`messages\` DROP FOREIGN KEY \`FK_3096fc70fe5dcc8d516972f17ba\``);
        await queryRunner.query(`ALTER TABLE \`messages\` DROP FOREIGN KEY \`FK_eb73515d4226282d9b6d2206ab4\``);
        await queryRunner.query(`CREATE TABLE \`rooms\` (\`uuid\` varchar(36) NOT NULL, \`userOneId\` int NOT NULL, \`userSecondId\` int NOT NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`messages\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`messages\` DROP COLUMN \`fromUserId\``);
        await queryRunner.query(`ALTER TABLE \`messages\` DROP COLUMN \`toUserId\``);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD \`userId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD \`roomUUID\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`rooms\` ADD CONSTRAINT \`FK_59f342ecaf13f72d2f81c5bd3b3\` FOREIGN KEY (\`userOneId\`) REFERENCES \`Users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`rooms\` ADD CONSTRAINT \`FK_34497554da71b05e8cfb62b2e89\` FOREIGN KEY (\`userSecondId\`) REFERENCES \`Users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD CONSTRAINT \`FK_4838cd4fc48a6ff2d4aa01aa646\` FOREIGN KEY (\`userId\`) REFERENCES \`Users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD CONSTRAINT \`FK_c3b6a87f03d7338cf09b1abd55d\` FOREIGN KEY (\`roomUUID\`) REFERENCES \`rooms\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`messages\` DROP FOREIGN KEY \`FK_c3b6a87f03d7338cf09b1abd55d\``);
        await queryRunner.query(`ALTER TABLE \`messages\` DROP FOREIGN KEY \`FK_4838cd4fc48a6ff2d4aa01aa646\``);
        await queryRunner.query(`ALTER TABLE \`rooms\` DROP FOREIGN KEY \`FK_34497554da71b05e8cfb62b2e89\``);
        await queryRunner.query(`ALTER TABLE \`rooms\` DROP FOREIGN KEY \`FK_59f342ecaf13f72d2f81c5bd3b3\``);
        await queryRunner.query(`ALTER TABLE \`messages\` DROP COLUMN \`roomUUID\``);
        await queryRunner.query(`ALTER TABLE \`messages\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD \`toUserId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD \`fromUserId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`DROP TABLE \`rooms\``);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD CONSTRAINT \`FK_eb73515d4226282d9b6d2206ab4\` FOREIGN KEY (\`toUserId\`) REFERENCES \`Users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD CONSTRAINT \`FK_3096fc70fe5dcc8d516972f17ba\` FOREIGN KEY (\`fromUserId\`) REFERENCES \`Users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
