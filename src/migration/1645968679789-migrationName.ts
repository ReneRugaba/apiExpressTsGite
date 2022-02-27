import {MigrationInterface, QueryRunner} from "typeorm";

export class migrationName1645968679789 implements MigrationInterface {
    name = 'migrationName1645968679789'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "userapp"
            ADD "password" character varying NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "userapp" DROP COLUMN "password"
        `);
    }

}
