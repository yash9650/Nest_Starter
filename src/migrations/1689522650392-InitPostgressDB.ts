import { MigrationInterface, QueryRunner } from "typeorm";

export class InitPostgressDB1689522650392 implements MigrationInterface {
    name = 'InitPostgressDB1689522650392'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Users_role_enum" AS ENUM('user', 'admin', 'staff')`);
        await queryRunner.query(`CREATE TABLE "Users" ("id" SERIAL NOT NULL, "userName" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "name" character varying(255) NOT NULL, "role" "public"."Users_role_enum" NOT NULL DEFAULT 'user', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_b2ee401c9d5288def8a87c559a0" UNIQUE ("userName"), CONSTRAINT "UQ_50ce06438be9837658db7bbfe9a" UNIQUE ("password"), CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rooms" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "userOneId" integer NOT NULL, "userSecondId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_b73e262b15748ad2cd96e53ed3b" UNIQUE ("userOneId", "userSecondId"), CONSTRAINT "PK_4653f18ce98647f3b746496a2ae" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "messages" ("id" SERIAL NOT NULL, "message" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer NOT NULL, "roomUUID" uuid NOT NULL, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "rooms" ADD CONSTRAINT "FK_59f342ecaf13f72d2f81c5bd3b3" FOREIGN KEY ("userOneId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rooms" ADD CONSTRAINT "FK_34497554da71b05e8cfb62b2e89" FOREIGN KEY ("userSecondId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_4838cd4fc48a6ff2d4aa01aa646" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_c3b6a87f03d7338cf09b1abd55d" FOREIGN KEY ("roomUUID") REFERENCES "rooms"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_c3b6a87f03d7338cf09b1abd55d"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_4838cd4fc48a6ff2d4aa01aa646"`);
        await queryRunner.query(`ALTER TABLE "rooms" DROP CONSTRAINT "FK_34497554da71b05e8cfb62b2e89"`);
        await queryRunner.query(`ALTER TABLE "rooms" DROP CONSTRAINT "FK_59f342ecaf13f72d2f81c5bd3b3"`);
        await queryRunner.query(`DROP TABLE "messages"`);
        await queryRunner.query(`DROP TABLE "rooms"`);
        await queryRunner.query(`DROP TABLE "Users"`);
        await queryRunner.query(`DROP TYPE "public"."Users_role_enum"`);
    }

}
