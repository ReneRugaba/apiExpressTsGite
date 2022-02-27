"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrationName1645968679789 = void 0;
class migrationName1645968679789 {
    name = 'migrationName1645968679789';
    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "userapp"
            ADD "password" character varying NOT NULL
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "userapp" DROP COLUMN "password"
        `);
    }
}
exports.migrationName1645968679789 = migrationName1645968679789;
//# sourceMappingURL=1645968679789-migrationName.js.map