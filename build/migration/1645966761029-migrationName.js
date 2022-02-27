"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrationName1645966761029 = void 0;
class migrationName1645966761029 {
    name = 'migrationName1645966761029';
    async up(queryRunner) {
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
    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE "userapp"
        `);
    }
}
exports.migrationName1645966761029 = migrationName1645966761029;
//# sourceMappingURL=1645966761029-migrationName.js.map