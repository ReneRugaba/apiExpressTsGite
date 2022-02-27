import {MigrationInterface, QueryRunner} from "typeorm";

export class migrationName1645966761029 implements MigrationInterface {
    name = 'migrationName1645966761029'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "userapp" (
                "id" SERIAL NOT NULL,
                "firstName" character varying NOT NULL,
                "lastName" character varying NOT NULL,
                "email" character varying NOT NULL,
                CONSTRAINT "UQ_1161038dbe0bffb97464e7ae4b6" UNIQUE ("email"),
                CONSTRAINT "PK_cc4b76fcb1f2bced14a13fd7daf" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "userapp"
        `);
    }

}
