import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedCompositeUniqueConstrainInRoomstable1689503590537 implements MigrationInterface {
    name = 'AddedCompositeUniqueConstrainInRoomstable1689503590537'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_b73e262b15748ad2cd96e53ed3\` ON \`rooms\` (\`userOneId\`, \`userSecondId\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_b73e262b15748ad2cd96e53ed3\` ON \`rooms\``);
    }

}
