# EDITH - API

Edith api, which replaces a bunch of internal tools and concentrate within a powerfull and reliable tool.

# Getting Started

Run locally:

```
  yarn run dev
```

## Build for production

```
  yarn run build
```

Obs.: At this point, the application will:

1. Compile into production ready dist.
2. Create database tables using migrations. To run migrations, see: [Migrations](#migrations)
3. Seed database with some default necessary data. To run seeds, see: [Running seeds manually](#runninng-seeds-manually)

## Migrations
On this project, migrations were built using typeorm's migrations feature. This allow the application to create database tables without the need of manually run SQL scripts. But, be aware that **this do not exclude the need of a database schema and correctly configured within .env file.**

### How to
1. Change an entity class or create one
```javascript
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @Column({ unique: true })
  @IsString()
  name: string;

  @Column()
  @IsString()
  password: string;
}
```

2. Generate migration class with what's going up and down
```javascript
yarn run add-migration -- -n WhateverYouWannaCallYourAction
```
And it should look like this:
```javascript
export class AlterUserColumns1585773104619 implements MigrationInterface {
    name = 'AlterUserColumns1585773104619'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `script` DROP COLUMN `description`", undefined);
        await queryRunner.query("ALTER TABLE `script` ADD `description` longtext NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD UNIQUE INDEX `IDX_065d4d8f3b5adb4a08841eae3c` (`name`)", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP INDEX `IDX_065d4d8f3b5adb4a08841eae3c`", undefined);
        await queryRunner.query("ALTER TABLE `script` DROP COLUMN `description`", undefined);
        await queryRunner.query("ALTER TABLE `script` ADD `description` varchar(255) NOT NULL", undefined);
    }

}
```

3. Sync with database
```javascript
yarn run update-database
```

In the end the result should be you modifications being applied to your DB

// TODO - Seed docs, IOC docs, authorize docs
