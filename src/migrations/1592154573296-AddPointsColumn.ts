import {MigrationInterface, QueryRunner} from "typeorm";

export class AddPointsColumn1592154573296 implements MigrationInterface {
    name = 'AddPointsColumn1592154573296'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` ADD `points` varchar(255) NOT NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `points`", undefined);
    }

}
