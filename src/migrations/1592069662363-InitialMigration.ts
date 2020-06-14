import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1592069662363 implements MigrationInterface {
    name = 'InitialMigration1592069662363'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `mail` varchar(255) NOT NULL, `active` tinyint NOT NULL DEFAULT 1, `phone` varchar(255) NULL, `isSuper` tinyint NOT NULL DEFAULT 0, UNIQUE INDEX `IDX_065d4d8f3b5adb4a08841eae3c` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_065d4d8f3b5adb4a08841eae3c` ON `user`", undefined);
        await queryRunner.query("DROP TABLE `user`", undefined);
    }

}
