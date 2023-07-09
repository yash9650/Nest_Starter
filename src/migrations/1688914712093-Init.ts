import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1688914712093 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS Users (
                id INT NOT NULL AUTO_INCREMENT,
                userName VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                name VARCHAR(255) NOT NULL,
                role ENUM('user', 'admin','staff') DEFAULT 'user',
                PRIMARY KEY (id)
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS Users;`);
  }
}
