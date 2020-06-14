import {MigrationInterface, QueryRunner} from "typeorm";

export class DefaultValueToColumnMail1592153388549 implements MigrationInterface {
    name = 'DefaultValueToColumnMail1592153388549'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `mail` `mail` varchar(255) NOT NULL DEFAULT ''", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `mail` `mail` varchar(255) NOT NULL", undefined);
    }

}
