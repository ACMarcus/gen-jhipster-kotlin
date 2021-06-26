const path = require('path');
const assert = require('yeoman-assert');

const constants = require('generator-jhipster/generators/generator-constants');
const angularFiles = require('generator-jhipster/generators/client/files-angular').files;
const reactFiles = require('generator-jhipster/generators/client/files-react').files;
const expectedFiles = require('./utils/expected-files');

const { skipPrettierHelpers: helpers, getFilesForOptions, shouldBeV3DockerfileCompatible } = require('./utils/utils');

const { ANGULAR, REACT } = constants.SUPPORTED_CLIENT_FRAMEWORKS;
const { CLIENT_MAIN_SRC_DIR, MAIN_DIR, SERVER_MAIN_RES_DIR, TEST_DIR } = constants;
const SERVER_MAIN_KOTLIN_SRC_DIR = `${MAIN_DIR}kotlin/`;

describe('JHipster generator', () => {
    context('Default configuration with', () => {
        describe(ANGULAR, () => {
            before(async () => {
                await helpers
                    .create(path.join(__dirname, '../generators/app'))
                    .withOptions({
                        jhiPrefix: 'test',
                        withGeneratedFlag: true,
                        'skip-ktlint-format': true,
                        blueprints: 'kotlin',
                    })
                    .withPrompts({
                        baseName: 'jhipster',
                        clientFramework: ANGULAR,
                        packageName: 'com.mycompany.myapp',
                        packageFolder: 'com/mycompany/myapp',
                        serviceDiscoveryType: false,
                        authenticationType: 'jwt',
                        cacheProvider: 'ehcache',
                        enableHibernateCache: true,
                        databaseType: 'sql',
                        devDatabaseType: 'h2Memory',
                        prodDatabaseType: 'postgresql',
                        enableTranslation: true,
                        nativeLanguage: 'en',
                        languages: ['fr', 'en'],
                        buildTool: 'maven',
                        rememberMeKey: '5c37379956bd1242f5636c8cb322c2966ad81277',
                        skipClient: false,
                        skipUserManagement: false,
                        serverSideOptions: [],
                    })
                    .run();
            });

            it('creates expected default files for angularX', () => {
                assert.file(expectedFiles.common);
                assert.file(expectedFiles.server);
                assert.file(expectedFiles.userManagementServer);
                assert.file(expectedFiles.jwtServer);
                assert.file(expectedFiles.maven);
                assert.file(expectedFiles.dockerServices);
                assert.file(expectedFiles.postgresql);
                assert.file(expectedFiles.hibernateTimeZoneConfig);
                assert.file(
                    getFilesForOptions(angularFiles, {
                        enableTranslation: true,
                        serviceDiscoveryType: false,
                        authenticationType: 'jwt',
                        testFrameworks: [],
                    })
                );
            });
            it('contains clientFramework with angularX value', () => {
                assert.fileContent('.yo-rc.json', /"clientFramework": "angularX"/);
            });
            it('contains correct custom prefix when specified', () => {
                assert.fileContent('angular.json', /"prefix": "test"/);
            });
            it('generates a README with no undefined value', () => {
                assert.noFileContent('README.md', /undefined/);
            });
        });

        describe(REACT, () => {
            before(async () => {
                await helpers
                    .create(path.join(__dirname, '../generators/app'))
                    .withOptions({
                        jhiPrefix: 'test',
                        withGeneratedFlag: true,
                        'skip-ktlint-format': true,
                        blueprints: 'kotlin',
                    })
                    .withPrompts({
                        baseName: 'jhipster',
                        clientFramework: REACT,
                        packageName: 'com.mycompany.myapp',
                        packageFolder: 'com/mycompany/myapp',
                        serviceDiscoveryType: false,
                        authenticationType: 'jwt',
                        cacheProvider: 'ehcache',
                        enableHibernateCache: true,
                        databaseType: 'sql',
                        devDatabaseType: 'h2Memory',
                        prodDatabaseType: 'postgresql',
                        enableTranslation: true,
                        nativeLanguage: 'en',
                        languages: ['fr'],
                        buildTool: 'maven',
                        rememberMeKey: '5c37379956bd1242f5636c8cb322c2966ad81277',
                        skipClient: false,
                        skipUserManagement: false,
                        serverSideOptions: [],
                    })
                    .run();
            });

            it('creates expected default files for react', () => {
                assert.file(expectedFiles.common);
                assert.file(expectedFiles.server);
                assert.file(expectedFiles.userManagementServer);
                assert.file(expectedFiles.jwtServer);
                assert.file(expectedFiles.maven);
                assert.file(expectedFiles.dockerServices);
                assert.file(expectedFiles.postgresql);
                assert.file(expectedFiles.hibernateTimeZoneConfig);
                assert.file(
                    getFilesForOptions(reactFiles, {
                        enableTranslation: true,
                        serviceDiscoveryType: false,
                        authenticationType: 'jwt',
                        testFrameworks: [],
                    })
                );
            });
            it('contains clientFramework with react value', () => {
                assert.fileContent('.yo-rc.json', /"clientFramework": "react"/);
            });
        });

        describe('using npm flag', () => {
            before(async () => {
                await helpers
                    .create(path.join(__dirname, '../generators/app'))
                    .withOptions({
                        blueprints: 'kotlin',
                    })
                    .withPrompts({
                        baseName: 'jhipster',
                        packageName: 'com.mycompany.myapp',
                        packageFolder: 'com/mycompany/myapp',
                        clientFramework: ANGULAR,
                        serviceDiscoveryType: false,
                        authenticationType: 'jwt',
                        cacheProvider: 'ehcache',
                        enableHibernateCache: true,
                        databaseType: 'sql',
                        devDatabaseType: 'h2Memory',
                        prodDatabaseType: 'postgresql',
                        enableTranslation: true,
                        nativeLanguage: 'en',
                        languages: ['fr'],
                        buildTool: 'maven',
                        rememberMeKey: '5c37379956bd1242f5636c8cb322c2966ad81277',
                        skipClient: false,
                        skipUserManagement: false,
                        serverSideOptions: [],
                    })
                    .run();
            });

            it('creates expected default files', () => {
                assert.file(expectedFiles.common);
                assert.file(expectedFiles.server);
                assert.file(expectedFiles.userManagementServer);
                assert.file(expectedFiles.jwtServer);
                assert.file(expectedFiles.maven);
                assert.file(expectedFiles.dockerServices);
                assert.file(expectedFiles.postgresql);
                assert.file(expectedFiles.hibernateTimeZoneConfig);
                assert.file(
                    getFilesForOptions(angularFiles, {
                        enableTranslation: true,
                        serviceDiscoveryType: false,
                        authenticationType: 'jwt',
                        testFrameworks: [],
                    })
                );
            });
            it('contains clientPackageManager with npm value', () => {
                assert.fileContent('.yo-rc.json', /"clientPackageManager": "npm"/);
            });
            it('contains install-node-and-npm in pom.xml', () => {
                assert.fileContent('pom.xml', /install-node-and-npm/);
            });
        });

        describe('Gradle', () => {
            before(async () => {
                await helpers
                    .create(path.join(__dirname, '../generators/app'))
                    .withOptions({
                        jhiprefix: 'test',
                        withgeneratedflag: true,
                        'skip-ktlint-format': true,
                        blueprints: 'kotlin',
                    })
                    .withPrompts({
                        baseName: 'jhipster',
                        packageName: 'com.mycompany.myapp',
                        packageFolder: 'com/mycompany/myapp',
                        clientFramework: ANGULAR,
                        serviceDiscoveryType: false,
                        authenticationType: 'jwt',
                        cacheProvider: 'ehcache',
                        enableHibernateCache: true,
                        databaseType: 'sql',
                        devDatabaseType: 'h2Memory',
                        prodDatabaseType: 'postgresql',
                        enableTranslation: true,
                        nativeLanguage: 'en',
                        languages: ['fr'],
                        buildTool: 'gradle',
                        rememberMeKey: '5c37379956bd1242f5636c8cb322c2966ad81277',
                        serverSideOptions: [],
                    })
                    .run();
            });

            it('creates expected default files for gradle', () => {
                assert.file(expectedFiles.common);
                assert.file(expectedFiles.server);
                assert.file(expectedFiles.userManagementServer);
                assert.file(expectedFiles.jwtServer);
                assert.file(expectedFiles.gradle);
                assert.file(expectedFiles.dockerServices);
                assert.file(expectedFiles.postgresql);
                assert.file(expectedFiles.hibernateTimeZoneConfig);
                assert.file(
                    getFilesForOptions(angularFiles, {
                        enableTranslation: true,
                        serviceDiscoveryType: false,
                        authenticationType: 'jwt',
                        testFrameworks: [],
                    })
                );
            });
        });

        describe('Maven with ktlint-format', () => {
            before(async () => {
                await helpers
                    .create(path.join(__dirname, '../generators/app'))
                    .withOptions({
                        jhiPrefix: 'test',
                        withGeneratedFlag: true,
                        'skip-ktlint-format': true,
                        blueprints: 'kotlin',
                    })
                    .withPrompts({
                        baseName: 'jhipster',
                        clientFramework: ANGULAR,
                        packageName: 'com.mycompany.myapp',
                        packageFolder: 'com/mycompany/myapp',
                        serviceDiscoveryType: false,
                        authenticationType: 'jwt',
                        cacheProvider: 'ehcache',
                        enableHibernateCache: true,
                        databaseType: 'sql',
                        devDatabaseType: 'h2Memory',
                        prodDatabaseType: 'mysql',
                        useSass: false,
                        enableTranslation: true,
                        nativeLanguage: 'en',
                        languages: ['fr'],
                        buildTool: 'maven',
                        rememberMeKey: '5c37379956bd1242f5636c8cb322c2966ad81277',
                        skipClient: false,
                        skipUserManagement: false,
                        serverSideOptions: [],
                    })
                    .run();
            });

            it('creates expected default files for angularX', () => {
                assert.file(expectedFiles.common);
                assert.file(expectedFiles.server);
                assert.file(expectedFiles.userManagementServer);
                assert.file(expectedFiles.jwtServer);
                assert.file(expectedFiles.maven);
                assert.file(expectedFiles.dockerServices);
                assert.file(expectedFiles.mysql);
                assert.file(expectedFiles.hibernateTimeZoneConfig);
                assert.file(
                    getFilesForOptions(angularFiles, {
                        useSass: false,
                        enableTranslation: true,
                        serviceDiscoveryType: false,
                        authenticationType: 'jwt',
                        testFrameworks: [],
                    })
                );
            });
            it('contains clientFramework with angularX value', () => {
                assert.fileContent('.yo-rc.json', /"clientFramework": "angularX"/);
            });
            it('contains correct custom prefix when specified', () => {
                assert.fileContent('angular.json', /"prefix": "test"/);
            });
            it('generates a README with no undefined value', () => {
                assert.noFileContent('README.md', /undefined/);
            });
        });

        describe('Gradle with ktlint-format', () => {
            before(async () => {
                await helpers
                    .create(path.join(__dirname, '../generators/app'))
                    .withOptions({
                        jhiPrefix: 'test',
                        withGeneratedFlag: true,
                        'skip-ktlint-format': true,
                        blueprints: 'kotlin',
                    })
                    .withPrompts({
                        baseName: 'jhipster',
                        packageName: 'com.mycompany.myapp',
                        packageFolder: 'com/mycompany/myapp',
                        clientFramework: ANGULAR,
                        serviceDiscoveryType: false,
                        authenticationType: 'jwt',
                        cacheProvider: 'ehcache',
                        enableHibernateCache: true,
                        databaseType: 'sql',
                        devDatabaseType: 'h2Memory',
                        prodDatabaseType: 'mysql',
                        enableTranslation: true,
                        nativeLanguage: 'en',
                        languages: ['fr'],
                        buildTool: 'gradle',
                        rememberMeKey: '5c37379956bd1242f5636c8cb322c2966ad81277',
                        serverSideOptions: [],
                    })
                    .run();
            });

            it('creates expected default files for gradle', () => {
                assert.file(expectedFiles.common);
                assert.file(expectedFiles.server);
                assert.file(expectedFiles.userManagementServer);
                assert.file(expectedFiles.jwtServer);
                assert.file(expectedFiles.gradle);
                assert.file(expectedFiles.dockerServices);
                assert.file(expectedFiles.mysql);
                assert.file(expectedFiles.hibernateTimeZoneConfig);
                assert.file(
                    getFilesForOptions(angularFiles, {
                        enableTranslation: true,
                        serviceDiscoveryType: false,
                        authenticationType: 'jwt',
                        testFrameworks: [],
                    })
                );
            });
        });
    });

    context('Application with DB option', () => {
        describe('mariadb', () => {
            before(async () => {
                await helpers
                    .create(path.join(__dirname, '../generators/app'))
                    .withOptions({
                        jhiprefix: 'test',
                        withgeneratedflag: true,
                        'skip-ktlint-format': true,
                        blueprints: 'kotlin',
                    })
                    .withPrompts({
                        baseName: 'jhipster',
                        packageName: 'com.mycompany.myapp',
                        packageFolder: 'com/mycompany/myapp',
                        clientFramework: ANGULAR,
                        serviceDiscoveryType: false,
                        authenticationType: 'jwt',
                        cacheProvider: 'ehcache',
                        enableHibernateCache: true,
                        databaseType: 'sql',
                        devDatabaseType: 'h2Disk',
                        prodDatabaseType: 'mariadb',
                        enableTranslation: true,
                        nativeLanguage: 'en',
                        languages: ['fr'],
                        buildTool: 'maven',
                        rememberMeKey: '5c37379956bd1242f5636c8cb322c2966ad81277',
                        skipClient: false,
                        skipUserManagement: false,
                        serverSideOptions: [],
                    })
                    .run();
            });

            it('creates expected default files', () => {
                assert.file(expectedFiles.common);
                assert.file(expectedFiles.server);
                assert.file(expectedFiles.userManagementServer);
                assert.file(expectedFiles.jwtServer);
                assert.file(expectedFiles.maven);
                assert.file(expectedFiles.dockerServices);
                assert.file(expectedFiles.mariadb);
                assert.file(expectedFiles.hibernateTimeZoneConfig);
                assert.file(
                    getFilesForOptions(angularFiles, {
                        enableTranslation: true,
                        serviceDiscoveryType: false,
                        authenticationType: 'jwt',
                        testFrameworks: [],
                    })
                );
            });
            shouldBeV3DockerfileCompatible('mariadb');
        });

        describe('mongodb', () => {
            before(async () => {
                await helpers
                    .create(path.join(__dirname, '../generators/app'))
                    .withOptions({
                        jhiprefix: 'test',
                        withgeneratedflag: true,
                        'skip-ktlint-format': true,
                        blueprints: 'kotlin',
                    })
                    .withPrompts({
                        baseName: 'jhipster',
                        packageName: 'com.mycompany.myapp',
                        packageFolder: 'com/mycompany/myapp',
                        clientFramework: ANGULAR,
                        serviceDiscoveryType: false,
                        authenticationType: 'jwt',
                        cacheProvider: 'no',
                        enableHibernateCache: false,
                        databaseType: 'mongodb',
                        devDatabaseType: 'mongodb',
                        prodDatabaseType: 'mongodb',
                        enableTranslation: true,
                        nativeLanguage: 'en',
                        languages: ['fr'],
                        buildTool: 'maven',
                        rememberMeKey: '5c37379956bd1242f5636c8cb322c2966ad81277',
                        skipClient: false,
                        skipUserManagement: false,
                        serverSideOptions: [],
                    })
                    .run();
            });

            it('creates expected files with "MongoDB"', () => {
                assert.file(expectedFiles.mongodb);
            });
            it("doesn't setup liquibase", () => {
                assert.noFileContent('pom.xml', 'liquibase');
                assert.noFile(expectedFiles.liquibase);
            });
            shouldBeV3DockerfileCompatible('mongodb');
        });

        describe('couchbase', () => {
            before(async () => {
                await helpers
                    .create(path.join(__dirname, '../generators/app'))
                    .withOptions({
                        jhiprefix: 'test',
                        withgeneratedflag: true,
                        'skip-ktlint-format': true,
                        blueprints: 'kotlin',
                    })
                    .withPrompts({
                        baseName: 'jhipster',
                        packageName: 'com.mycompany.myapp',
                        packageFolder: 'com/mycompany/myapp',
                        clientFramework: ANGULAR,
                        serviceDiscoveryType: false,
                        authenticationType: 'jwt',
                        cacheProvider: 'no',
                        enableHibernateCache: false,
                        databaseType: 'couchbase',
                        devDatabaseType: 'couchbase',
                        prodDatabaseType: 'couchbase',
                        enableTranslation: true,
                        nativeLanguage: 'en',
                        languages: ['fr'],
                        buildTool: 'maven',
                        rememberMeKey: '5c37379956bd1242f5636c8cb322c2966ad81277',
                        skipClient: false,
                        skipUserManagement: false,
                        serverSideOptions: [],
                    })
                    .run();
            });

            it('creates expected files with "Couchbase"', () => {
                assert.file(expectedFiles.couchbase);
            });
            it("doesn't setup liquibase", () => {
                assert.noFileContent('pom.xml', 'liquibase');
                assert.noFile(expectedFiles.liquibase);
            });
            shouldBeV3DockerfileCompatible('couchbase');
        });

        describe('neo4j', () => {
            before(async () => {
                await helpers
                    .create(path.join(__dirname, '../generators/app'))
                    .withOptions({
                        jhiprefix: 'test',
                        withgeneratedflag: true,
                        'skip-ktlint-format': true,
                        blueprints: 'kotlin',
                    })
                    .withPrompts({
                        baseName: 'jhipster',
                        packageName: 'com.mycompany.myapp',
                        packageFolder: 'com/mycompany/myapp',
                        clientFramework: ANGULAR,
                        serviceDiscoveryType: false,
                        authenticationType: 'jwt',
                        cacheProvider: 'no',
                        enableHibernateCache: false,
                        databaseType: 'neo4j',
                        devDatabaseType: 'neo4j',
                        prodDatabaseType: 'neo4j',
                        enableTranslation: true,
                        nativeLanguage: 'en',
                        languages: ['fr'],
                        buildTool: 'maven',
                        rememberMeKey: '5c37379956bd1242f5636c8cb322c2966ad81277',
                        skipClient: false,
                        skipUserManagement: false,
                        serverSideOptions: [],
                    })
                    .run();
            });

            it('creates expected files with "Neo4j"', () => {
                assert.file(expectedFiles.neo4j);
            });
            it("doesn't setup liquibase", () => {
                assert.noFileContent('pom.xml', 'liquibase');
                assert.noFile(expectedFiles.liquibase);
            });
            shouldBeV3DockerfileCompatible('neo4j');
        });

        describe('mssql', () => {
            before(async () => {
                await helpers
                    .create(path.join(__dirname, '../generators/app'))
                    .withOptions({
                        jhiprefix: 'test',
                        withgeneratedflag: true,
                        'skip-ktlint-format': true,
                        blueprints: 'kotlin',
                    })
                    .withPrompts({
                        baseName: 'jhipster',
                        packageName: 'com.mycompany.myapp',
                        packageFolder: 'com/mycompany/myapp',
                        clientFramework: ANGULAR,
                        serviceDiscoveryType: false,
                        authenticationType: 'jwt',
                        cacheProvider: 'no',
                        enableHibernateCache: false,
                        databaseType: 'sql',
                        devDatabaseType: 'mssql',
                        prodDatabaseType: 'mssql',
                        enableTranslation: true,
                        nativeLanguage: 'en',
                        languages: ['fr'],
                        buildTool: 'maven',
                        rememberMeKey: '5c37379956bd1242f5636c8cb322c2966ad81277',
                        skipClient: false,
                        skipUserManagement: false,
                        serverSideOptions: [],
                    })
                    .run();
            });

            it('creates expected files with "Microsoft SQL Server"', () => {
                assert.file(expectedFiles.mssql);
                assert.file(expectedFiles.hibernateTimeZoneConfig);
                assert.fileContent('pom.xml', /mssql-jdbc/);
                assert.fileContent(
                    `${SERVER_MAIN_RES_DIR}config/liquibase/changelog/00000000000000_initial_schema.xml`,
                    /SET IDENTITY_INSERT jhi_user ON;/
                );
                assert.fileContent(
                    `${SERVER_MAIN_RES_DIR}config/liquibase/changelog/00000000000000_initial_schema.xml`,
                    /SET IDENTITY_INSERT jhi_user OFF;/
                );
            });
            shouldBeV3DockerfileCompatible('mssql');
        });

        describe('cassandra', () => {
            before(async () => {
                await helpers
                    .create(path.join(__dirname, '../generators/app'))
                    .withOptions({
                        jhiprefix: 'test',
                        withgeneratedflag: true,
                        'skip-ktlint-format': true,
                        blueprints: 'kotlin',
                    })
                    .withPrompts({
                        baseName: 'jhipster',
                        packageName: 'com.mycompany.myapp',
                        packageFolder: 'com/mycompany/myapp',
                        clientFramework: ANGULAR,
                        serviceDiscoveryType: false,
                        authenticationType: 'jwt',
                        cacheProvider: 'no',
                        enableHibernateCache: false,
                        databaseType: 'cassandra',
                        devDatabaseType: 'cassandra',
                        prodDatabaseType: 'cassandra',
                        enableTranslation: true,
                        nativeLanguage: 'en',
                        languages: ['fr'],
                        buildTool: 'maven',
                        rememberMeKey: '5c37379956bd1242f5636c8cb322c2966ad81277',
                        skipClient: false,
                        skipUserManagement: false,
                        serverSideOptions: [],
                    })
                    .run();
            });

            it('creates expected files with "Cassandra"', () => {
                assert.file(expectedFiles.cassandra);
            });
            it("doesn't setup liquibase", () => {
                assert.noFileContent('pom.xml', 'liquibase');
                assert.noFile(expectedFiles.liquibase);
            });
            shouldBeV3DockerfileCompatible('cassandra');
        });

        describe('cassandra no i18n', () => {
            before(async () => {
                await helpers
                    .create(path.join(__dirname, '../generators/app'))
                    .withOptions({
                        jhiprefix: 'test',
                        withgeneratedflag: true,
                        'skip-ktlint-format': true,
                        blueprints: 'kotlin',
                    })
                    .withPrompts({
                        baseName: 'jhipster',
                        packageName: 'com.mycompany.myapp',
                        packageFolder: 'com/mycompany/myapp',
                        clientFramework: ANGULAR,
                        serviceDiscoveryType: false,
                        authenticationType: 'jwt',
                        cacheProvider: 'no',
                        enableHibernateCache: false,
                        databaseType: 'cassandra',
                        devDatabaseType: 'cassandra',
                        prodDatabaseType: 'cassandra',
                        enableTranslation: false,
                        buildTool: 'maven',
                        rememberMeKey: '5c37379956bd1242f5636c8cb322c2966ad81277',
                        skipClient: false,
                        skipUserManagement: false,
                        serverSideOptions: [],
                    })
                    .run();
            });

            it('creates expected files with "Cassandra"', () => {
                assert.file(expectedFiles.cassandra);
                assert.noFile(expectedFiles.i18n);
                assert.file([`${SERVER_MAIN_RES_DIR}i18n/messages.properties`]);
            });
        });

        describe('MySQL and elasticsearch', () => {
            before(async () => {
                await helpers
                    .create(path.join(__dirname, '../generators/app'))
                    .withOptions({
                        jhiprefix: 'test',
                        withgeneratedflag: true,
                        'skip-ktlint-format': true,
                        blueprints: 'kotlin',
                    })
                    .withPrompts({
                        baseName: 'jhipster',
                        packageName: 'com.mycompany.myapp',
                        packageFolder: 'com/mycompany/myapp',
                        clientFramework: ANGULAR,
                        serviceDiscoveryType: false,
                        authenticationType: 'jwt',
                        cacheProvider: 'no',
                        enableHibernateCache: false,
                        databaseType: 'sql',
                        devDatabaseType: 'mysql',
                        prodDatabaseType: 'mysql',
                        enableTranslation: true,
                        nativeLanguage: 'en',
                        languages: ['fr'],
                        buildTool: 'maven',
                        rememberMeKey: '5c37379956bd1242f5636c8cb322c2966ad81277',
                        skipClient: false,
                        skipUserManagement: false,
                        serverSideOptions: ['searchEngine:elasticsearch'],
                    })
                    .run();
            });

            it('creates expected files with "MySQL" and "Elasticsearch"', () => {
                assert.file(expectedFiles.mysql);
                assert.file(expectedFiles.elasticsearch);
                assert.file(expectedFiles.hibernateTimeZoneConfig);
            });
            shouldBeV3DockerfileCompatible('mysql');
        });

        describe('couchbase FTS', () => {
            before(async () => {
                await helpers
                    .create(path.join(__dirname, '../generators/app'))
                    .withOptions({
                        jhiprefix: 'test',
                        withgeneratedflag: true,
                        'skip-ktlint-format': true,
                        blueprints: 'kotlin',
                    })
                    .withPrompts({
                        baseName: 'jhipster',
                        packageName: 'com.mycompany.myapp',
                        packageFolder: 'com/mycompany/myapp',
                        clientFramework: 'angularX',
                        serviceDiscoveryType: false,
                        authenticationType: 'jwt',
                        cacheProvider: 'no',
                        enableHibernateCache: false,
                        databaseType: 'couchbase',
                        devDatabaseType: 'couchbase',
                        prodDatabaseType: 'couchbase',
                        enableTranslation: true,
                        nativeLanguage: 'en',
                        languages: ['fr'],
                        buildTool: 'maven',
                        rememberMeKey: '5c37379956bd1242f5636c8cb322c2966ad81277',
                        skipClient: false,
                        skipUserManagement: false,
                        serverSideOptions: ['searchEngine:couchbase'],
                    })
                    .run();
            });

            it('creates expected files with "Couchbbase FTS"', () => {
                assert.file(expectedFiles.couchbase);
                assert.file(expectedFiles.couchbaseSearch);
            });
            shouldBeV3DockerfileCompatible('couchbase');
        });

        describe('no database', () => {
            before(async () => {
                await helpers
                    .create(path.join(__dirname, '../generators/app'))
                    .withOptions({
                        jhiprefix: 'test',
                        withgeneratedflag: true,
                        'skip-ktlint-format': true,
                        blueprints: 'kotlin',
                    })
                    .withPrompts({
                        applicationType: 'microservice',
                        baseName: 'jhipster',
                        packageName: 'com.mycompany.myapp',
                        packageFolder: 'com/mycompany/myapp',
                        serviceDiscoveryType: false,
                        authenticationType: 'jwt',
                        cacheProvider: 'hazelcast',
                        enableHibernateCache: true,
                        databaseType: 'no',
                        devDatabaseType: 'no',
                        prodDatabaseType: 'no',
                        enableTranslation: true,
                        nativeLanguage: 'en',
                        languages: ['fr'],
                        buildTool: 'maven',
                        rememberMeKey: '5c37379956bd1242f5636c8cb322c2966ad81277',
                        serverSideOptions: [],
                    })
                    .run();
            });

            it('creates expected files with the microservice application type', () => {
                assert.file(expectedFiles.jwtServer);
                assert.file(expectedFiles.microservice);
                assert.file(expectedFiles.feignConfig);
                assert.file(expectedFiles.dockerServices);
                assert.noFile(expectedFiles.userManagementServer);
            });
            it("doesn't setup liquibase", () => {
                assert.noFileContent('pom.xml', 'liquibase');
                assert.noFile(expectedFiles.liquibase);
            });
        });
    });

    context('Application with other options', () => {
        describe('oauth2', () => {
            before(async () => {
                await helpers
                    .create(path.join(__dirname, '../generators/app'))
                    .withOptions({
                        jhiprefix: 'test',
                        withgeneratedflag: true,
                        'skip-ktlint-format': true,
                        blueprints: 'kotlin',
                    })
                    .withPrompts({
                        baseName: 'jhipster',
                        packageName: 'com.mycompany.myapp',
                        packageFolder: 'com/mycompany/myapp',
                        clientFramework: ANGULAR,
                        serviceDiscoveryType: false,
                        authenticationType: 'oauth2',
                        cacheProvider: 'ehcache',
                        enableHibernateCache: true,
                        databaseType: 'sql',
                        devDatabaseType: 'h2Memory',
                        prodDatabaseType: 'postgresql',
                        enableTranslation: true,
                        nativeLanguage: 'en',
                        languages: ['fr'],
                        buildTool: 'maven',
                        rememberMeKey: '5c37379956bd1242f5636c8cb322c2966ad81277',
                        serverSideOptions: [],
                    })
                    .run();
            });

            it('creates expected files with authenticationType "oauth2"', () => {
                assert.file(expectedFiles.oauth2);
                assert.file(expectedFiles.oauth2Client);
                assert.file(expectedFiles.postgresql);
                assert.file(expectedFiles.hibernateTimeZoneConfig);
            });
            it('generates README with instructions for OAuth', () => {
                assert.fileContent('README.md', 'OAuth 2.0');
            });
        });

        describe('oauth2 + elasticsearch', () => {
            before(async () => {
                await helpers
                    .create(path.join(__dirname, '../generators/app'))
                    .withOptions({
                        jhiprefix: 'test',
                        withgeneratedflag: true,
                        'skip-ktlint-format': true,
                        blueprints: 'kotlin',
                    })
                    .withPrompts({
                        baseName: 'jhipster',
                        packageName: 'com.mycompany.myapp',
                        packageFolder: 'com/mycompany/myapp',
                        clientFramework: ANGULAR,
                        serviceDiscoveryType: false,
                        authenticationType: 'oauth2',
                        cacheProvider: 'ehcache',
                        enableHibernateCache: true,
                        databaseType: 'sql',
                        devDatabaseType: 'h2Memory',
                        prodDatabaseType: 'postgresql',
                        enableTranslation: true,
                        nativeLanguage: 'en',
                        languages: ['fr'],
                        buildTool: 'maven',
                        rememberMeKey: '5c37379956bd1242f5636c8cb322c2966ad81277',
                        serverSideOptions: ['searchEngine:elasticsearch'],
                    })
                    .run();
            });

            it('creates expected files with authenticationType "oauth2" and elasticsearch', () => {
                assert.file(expectedFiles.oauth2);
                assert.file(expectedFiles.oauth2Client);
                assert.file(expectedFiles.elasticsearch);
                assert.file(expectedFiles.hibernateTimeZoneConfig);
                assert.file(expectedFiles.postgresql);
            });
        });

        describe('oauth2 + mongodb', () => {
            before(async () => {
                await helpers
                    .create(path.join(__dirname, '../generators/app'))
                    .withOptions({
                        jhiprefix: 'test',
                        withgeneratedflag: true,
                        'skip-ktlint-format': true,
                        blueprints: 'kotlin',
                    })
                    .withPrompts({
                        baseName: 'jhipster',
                        packageName: 'com.mycompany.myapp',
                        packageFolder: 'com/mycompany/myapp',
                        clientFramework: ANGULAR,
                        serviceDiscoveryType: false,
                        authenticationType: 'oauth2',
                        cacheProvider: 'ehcache',
                        enableHibernateCache: true,
                        databaseType: 'mongodb',
                        devDatabaseType: 'mongodb',
                        prodDatabaseType: 'mongodb',
                        enableTranslation: true,
                        nativeLanguage: 'en',
                        languages: ['fr'],
                        buildTool: 'maven',
                        rememberMeKey: '5c37379956bd1242f5636c8cb322c2966ad81277',
                        serverSideOptions: [],
                    })
                    .run();
            });

            it('creates expected files with authenticationType "oauth2" and mongodb', () => {
                assert.file(expectedFiles.oauth2);
                assert.file(expectedFiles.oauth2Client);
                assert.file(expectedFiles.mongodb);
            });
        });

        describe('hazelcast', () => {
            before(async () => {
                await helpers
                    .create(path.join(__dirname, '../generators/app'))
                    .withOptions({
                        jhiprefix: 'test',
                        withgeneratedflag: true,
                        'skip-ktlint-format': true,
                        blueprints: 'kotlin',
                    })
                    .withPrompts({
                        baseName: 'jhipster',
                        packageName: 'com.mycompany.myapp',
                        packageFolder: 'com/mycompany/myapp',
                        clientFramework: ANGULAR,
                        serviceDiscoveryType: false,
                        authenticationType: 'jwt',
                        cacheProvider: 'hazelcast',
                        enableHibernateCache: true,
                        databaseType: 'sql',
                        devDatabaseType: 'h2Memory',
                        prodDatabaseType: 'postgresql',
                        enableTranslation: true,
                        nativeLanguage: 'en',
                        languages: ['fr'],
                        buildTool: 'maven',
                        rememberMeKey: '5c37379956bd1242f5636c8cb322c2966ad81277',
                        serverSideOptions: [],
                    })
                    .run();
            });
            it('creates expected files with "Hazelcast"', () => {
                assert.file(expectedFiles.common);
                assert.file(expectedFiles.server);
                assert.file(expectedFiles.userManagementServer);
                assert.file(expectedFiles.hazelcast);
                assert.file(expectedFiles.postgresql);
                assert.file(expectedFiles.hibernateTimeZoneConfig);
            });
        });

        describe('Infinispan', () => {
            before(async () => {
                await helpers
                    .create(path.join(__dirname, '../generators/app'))
                    .withOptions({
                        jhiprefix: 'test',
                        withgeneratedflag: true,
                        'skip-ktlint-format': true,
                        blueprints: 'kotlin',
                    })
                    .withPrompts({
                        baseName: 'jhipster',
                        packageName: 'com.mycompany.myapp',
                        packageFolder: 'com/mycompany/myapp',
                        clientFramework: ANGULAR,
                        serviceDiscoveryType: false,
                        authenticationType: 'jwt',
                        cacheProvider: 'infinispan',
                        enableHibernateCache: true,
                        databaseType: 'sql',
                        devDatabaseType: 'h2Memory',
                        prodDatabaseType: 'postgresql',
                        enableTranslation: true,
                        nativeLanguage: 'en',
                        languages: ['fr'],
                        buildTool: 'maven',
                        rememberMeKey: '5c37379956bd1242f5636c8cb322c2966ad81277',
                        serverSideOptions: [],
                    })
                    .run();
            });
            it('creates expected files with "Infinispan"', () => {
                assert.file(expectedFiles.common);
                assert.file(expectedFiles.server);
                assert.file(expectedFiles.userManagementServer);
                assert.file(expectedFiles.client);
                assert.file(expectedFiles.infinispan);
                assert.file(expectedFiles.postgresql);
                assert.file(expectedFiles.hibernateTimeZoneConfig);
            });
        });

        describe('Infinispan and Eureka', () => {
            before(async () => {
                await helpers
                    .create(path.join(__dirname, '../generators/app'))
                    .withOptions({
                        jhiprefix: 'test',
                        withgeneratedflag: true,
                        'skip-ktlint-format': true,
                        blueprints: 'kotlin',
                    })
                    .withPrompts({
                        baseName: 'jhipster',
                        packageName: 'com.mycompany.myapp',
                        packageFolder: 'com/mycompany/myapp',
                        serviceDiscoveryType: 'eureka',
                        clientFramework: ANGULAR,
                        authenticationType: 'jwt',
                        cacheProvider: 'infinispan',
                        enableHibernateCache: true,
                        databaseType: 'sql',
                        devDatabaseType: 'h2Memory',
                        prodDatabaseType: 'postgresql',
                        enableTranslation: true,
                        nativeLanguage: 'en',
                        languages: ['fr'],
                        buildTool: 'maven',
                        rememberMeKey: '5c37379956bd1242f5636c8cb322c2966ad81277',
                        serverSideOptions: [],
                    })
                    .run();
            });
            it('creates expected files with "Infinispan and Eureka"', () => {
                assert.file(expectedFiles.common);
                assert.file(expectedFiles.server);
                assert.file(expectedFiles.userManagementServer);
                assert.file(expectedFiles.client);
                assert.file(expectedFiles.eureka);
                assert.file(expectedFiles.infinispan);
                assert.file(expectedFiles.postgresql);
                assert.file(expectedFiles.hibernateTimeZoneConfig);
            });
        });

        describe('Memcached', () => {
            before(async () => {
                await helpers
                    .create(path.join(__dirname, '../generators/app'))
                    .withOptions({
                        jhiprefix: 'test',
                        withgeneratedflag: true,
                        'skip-ktlint-format': true,
                        blueprints: 'kotlin',
                    })
                    .withPrompts({
                        baseName: 'jhipster',
                        packageName: 'com.mycompany.myapp',
                        packageFolder: 'com/mycompany/myapp',
                        clientFramework: ANGULAR,
                        serviceDiscoveryType: false,
                        authenticationType: 'jwt',
                        cacheProvider: 'memcached',
                        enableHibernateCache: true,
                        databaseType: 'sql',
                        devDatabaseType: 'h2Memory',
                        prodDatabaseType: 'postgresql',
                        enableTranslation: true,
                        nativeLanguage: 'en',
                        languages: ['fr'],
                        buildTool: 'maven',
                        rememberMeKey: '5c37379956bd1242f5636c8cb322c2966ad81277',
                        serverSideOptions: [],
                    })
                    .run();
            });
            it('creates expected files with "Memcached"', () => {
                assert.file(expectedFiles.common);
                assert.file(expectedFiles.server);
                assert.file(expectedFiles.userManagementServer);
                assert.file(expectedFiles.client);
                assert.file(expectedFiles.memcached);
                assert.file(expectedFiles.postgresql);
                assert.file(expectedFiles.hibernateTimeZoneConfig);
            });
        });

        describe('Redis', () => {
            before(async () => {
                await helpers
                    .create(path.join(__dirname, '../generators/app'))
                    .withOptions({
                        jhiprefix: 'test',
                        withgeneratedflag: true,
                        'skip-ktlint-format': true,
                        blueprints: 'kotlin',
                    })
                    .withPrompts({
                        baseName: 'jhipster',
                        packageName: 'com.mycompany.myapp',
                        packageFolder: 'com/mycompany/myapp',
                        clientFramework: ANGULAR,
                        serviceDiscoveryType: false,
                        authenticationType: 'jwt',
                        cacheProvider: 'redis',
                        enableHibernateCache: true,
                        databaseType: 'sql',
                        devDatabaseType: 'h2Memory',
                        prodDatabaseType: 'postgresql',
                        enableTranslation: true,
                        nativeLanguage: 'en',
                        languages: ['fr'],
                        buildTool: 'maven',
                        rememberMeKey: '5c37379956bd1242f5636c8cb322c2966ad81277',
                        serverSideOptions: [],
                    })
                    .run();
            });
            it('creates expected files with "Redis"', () => {
                assert.file(expectedFiles.common);
                assert.file(expectedFiles.server);
                assert.file(expectedFiles.userManagementServer);
                assert.file(expectedFiles.client);
                assert.file(expectedFiles.redis);
                assert.file(expectedFiles.postgresql);
                assert.file(expectedFiles.hibernateTimeZoneConfig);
            });
        });

        describe('Messaging with Kafka configuration', () => {
            before(async () => {
                await helpers
                    .create(path.join(__dirname, '../generators/app'))
                    .withOptions({
                        jhiprefix: 'test',
                        withgeneratedflag: true,
                        'skip-ktlint-format': true,
                        blueprints: 'kotlin',
                    })
                    .withPrompts({
                        baseName: 'jhipster',
                        packageName: 'com.mycompany.myapp',
                        packageFolder: 'com/mycompany/myapp',
                        clientFramework: ANGULAR,
                        serverPort: '8080',
                        serviceDiscoveryType: false,
                        authenticationType: 'jwt',
                        cacheProvider: 'ehcache',
                        enableHibernateCache: true,
                        websocket: false,
                        databaseType: 'sql',
                        devDatabaseType: 'h2Disk',
                        prodDatabaseType: 'postgresql',
                        searchEngine: false,
                        buildTool: 'maven',
                        rememberMeKey: '5c37379956bd1242f5636c8cb322c2966ad81277',
                        applicationType: 'monolith',
                        testFrameworks: ['gatling'],
                        jhiPrefix: 'jhi',
                        enableTranslation: true,
                        nativeLanguage: 'en',
                        languages: ['en'],
                        serverSideOptions: ['messageBroker:kafka'],
                    })
                    .run();
            });

            it('creates expected files with Kafka message broker enabled', () => {
                assert.file(expectedFiles.common);
                assert.file(expectedFiles.server);
                assert.file(expectedFiles.userManagementServer);
                assert.file(expectedFiles.jwtServer);
                assert.file(expectedFiles.gatling);
                assert.file(expectedFiles.messageBroker);
                assert.file(expectedFiles.postgresql);
                assert.file(expectedFiles.hibernateTimeZoneConfig);
            });
        });

        describe('API first using OpenAPI-generator (maven)', () => {
            before(async () => {
                await helpers
                    .create(path.join(__dirname, '../generators/app'))
                    .withOptions({
                        jhiprefix: 'test',
                        withgeneratedflag: true,
                        'skip-ktlint-format': true,
                        blueprints: 'kotlin',
                    })
                    .withPrompts({
                        baseName: 'jhipster',
                        packageName: 'com.mycompany.myapp',
                        packageFolder: 'com/mycompany/myapp',
                        clientFramework: ANGULAR,
                        serverPort: '8080',
                        serviceDiscoveryType: false,
                        authenticationType: 'jwt',
                        cacheProvider: 'ehcache',
                        enableHibernateCache: true,
                        websocket: false,
                        databaseType: 'sql',
                        devDatabaseType: 'h2Disk',
                        prodDatabaseType: 'postgresql',
                        searchEngine: false,
                        buildTool: 'maven',
                        rememberMeKey: '5c37379956bd1242f5636c8cb322c2966ad81277',
                        applicationType: 'monolith',
                        testFrameworks: ['gatling'],
                        jhiPrefix: 'jhi',
                        enableTranslation: true,
                        nativeLanguage: 'en',
                        languages: ['en'],
                        serverSideOptions: ['enableSwaggerCodegen:true'],
                    })
                    .run();
            });

            it('creates expected files with OpenAPI first enabled', () => {
                assert.file(expectedFiles.common);
                assert.file(expectedFiles.server);
                assert.file(expectedFiles.userManagementServer);
                assert.file(expectedFiles.jwtServer);
                assert.file(expectedFiles.postgresql);
                assert.file(expectedFiles.hibernateTimeZoneConfig);
                assert.file(expectedFiles.gatling);
                assert.file(expectedFiles.swaggerCodegen);
            });
            it('generates README with instructions for OpenAPI generator', () => {
                assert.fileContent('README.md', 'OpenAPI-Generator');
            });
        });

        describe('API first using OpenAPI-generator (gradle)', () => {
            before(async () => {
                await helpers
                    .create(path.join(__dirname, '../generators/app'))
                    .withOptions({
                        jhiprefix: 'test',
                        withgeneratedflag: true,
                        'skip-ktlint-format': true,
                        blueprints: 'kotlin',
                    })
                    .withPrompts({
                        baseName: 'jhipster',
                        packageName: 'com.mycompany.myapp',
                        packageFolder: 'com/mycompany/myapp',
                        clientFramework: ANGULAR,
                        serverPort: '8080',
                        serviceDiscoveryType: false,
                        authenticationType: 'jwt',
                        cacheProvider: 'ehcache',
                        enableHibernateCache: true,
                        websocket: false,
                        databaseType: 'sql',
                        devDatabaseType: 'h2Disk',
                        prodDatabaseType: 'postgresql',
                        searchEngine: false,
                        buildTool: 'gradle',
                        rememberMeKey: '5c37379956bd1242f5636c8cb322c2966ad81277',
                        applicationType: 'monolith',
                        testFrameworks: ['gatling'],
                        jhiPrefix: 'jhi',
                        enableTranslation: true,
                        nativeLanguage: 'en',
                        languages: ['en'],
                        serverSideOptions: ['enableSwaggerCodegen:true'],
                    })
                    .run();
            });

            it('creates expected files with OpenAPI first enabled', () => {
                assert.file(expectedFiles.common);
                assert.file(expectedFiles.server);
                assert.file(expectedFiles.userManagementServer);
                assert.file(expectedFiles.gradle);
                assert.file(expectedFiles.jwtServer);
                assert.file(expectedFiles.postgresql);
                assert.file(expectedFiles.hibernateTimeZoneConfig);
                assert.file(expectedFiles.gatling);
                assert.file(expectedFiles.swaggerCodegen);
                assert.file(expectedFiles.swaggerCodegenGradle);
            });
        });
    });

    context('Application names', () => {
        describe('package names', () => {
            before(async () => {
                await helpers
                    .create(path.join(__dirname, '../generators/app'))
                    .withOptions({
                        jhiprefix: 'test',
                        withgeneratedflag: true,
                        'skip-ktlint-format': true,
                        blueprints: 'kotlin',
                    })
                    .withPrompts({
                        baseName: 'jhipster',
                        packageName: 'com.otherpackage',
                        packageFolder: 'com/otherpackage',
                        clientFramework: ANGULAR,
                        serviceDiscoveryType: false,
                        authenticationType: 'jwt',
                        cacheProvider: 'ehcache',
                        enableHibernateCache: true,
                        databaseType: 'sql',
                        devDatabaseType: 'h2Memory',
                        prodDatabaseType: 'postgresql',
                        enableTranslation: true,
                        nativeLanguage: 'en',
                        languages: ['fr'],
                        buildTool: 'maven',
                        rememberMeKey: '5c37379956bd1242f5636c8cb322c2966ad81277',
                        serverSideOptions: [],
                    })
                    .run();
            });

            it('creates expected files with correct package names', () => {
                assert.file([`${SERVER_MAIN_KOTLIN_SRC_DIR}com/otherpackage/JhipsterApp.kt`]);
                assert.fileContent(`${SERVER_MAIN_KOTLIN_SRC_DIR}com/otherpackage/JhipsterApp.kt`, /package com\.otherpackage/);
                assert.fileContent(`${SERVER_MAIN_KOTLIN_SRC_DIR}com/otherpackage/JhipsterApp.kt`, /class JhipsterApp/);
            });
        });

        describe('bad application name for java', () => {
            before(async () => {
                await helpers
                    .create(path.join(__dirname, '../generators/app'))
                    .withOptions({
                        jhiprefix: 'test',
                        withgeneratedflag: true,
                        'skip-ktlint-format': true,
                        blueprints: 'kotlin',
                    })
                    .withPrompts({
                        baseName: '21Points',
                        packageName: 'com.otherpackage',
                        packageFolder: 'com/otherpackage',
                        clientFramework: ANGULAR,
                        serviceDiscoveryType: false,
                        authenticationType: 'jwt',
                        cacheProvider: 'ehcache',
                        enableHibernateCache: true,
                        databaseType: 'sql',
                        devDatabaseType: 'h2Memory',
                        prodDatabaseType: 'postgresql',
                        enableTranslation: true,
                        nativeLanguage: 'en',
                        languages: ['fr'],
                        buildTool: 'maven',
                        rememberMeKey: '5c37379956bd1242f5636c8cb322c2966ad81277',
                        serverSideOptions: [],
                    })
                    .run();
            });

            it('creates expected files with default application name', () => {
                assert.file([
                    `${SERVER_MAIN_KOTLIN_SRC_DIR}com/otherpackage/Application.kt`,
                    `${SERVER_MAIN_KOTLIN_SRC_DIR}com/otherpackage/ApplicationWebXml.kt`,
                ]);
                assert.fileContent(`${SERVER_MAIN_KOTLIN_SRC_DIR}com/otherpackage/Application.kt`, /class Application/);
            });
        });

        describe('application names', () => {
            before(async () => {
                await helpers
                    .create(path.join(__dirname, '../generators/app'))
                    .withOptions({
                        jhiprefix: 'test',
                        withgeneratedflag: true,
                        'skip-ktlint-format': true,
                        blueprints: 'kotlin',
                    })
                    .withPrompts({
                        baseName: 'myapplication',
                        packageName: 'com.mycompany.myapp',
                        packageFolder: 'com/mycompany/myapp',
                        clientFramework: ANGULAR,
                        serviceDiscoveryType: false,
                        authenticationType: 'jwt',
                        cacheProvider: 'ehcache',
                        enableHibernateCache: true,
                        databaseType: 'sql',
                        devDatabaseType: 'h2Memory',
                        prodDatabaseType: 'postgresql',
                        enableTranslation: true,
                        nativeLanguage: 'en',
                        languages: ['fr'],
                        buildTool: 'maven',
                        rememberMeKey: '5c37379956bd1242f5636c8cb322c2966ad81277',
                        serverSideOptions: [],
                    })
                    .run();
            });

            it('creates expected files with correct application name', () => {
                assert.file([`${CLIENT_MAIN_SRC_DIR}app/home/home.route.ts`]);
                assert.fileContent(`${CLIENT_MAIN_SRC_DIR}app/app.module.ts`, /AppModule/);
            });
        });
    });

    context('i18n', () => {
        describe('no i18n', () => {
            before(async () => {
                await helpers
                    .create(path.join(__dirname, '../generators/app'))
                    .withOptions({
                        jhiprefix: 'test',
                        withgeneratedflag: true,
                        'skip-ktlint-format': true,
                        blueprints: 'kotlin',
                    })
                    .withPrompts({
                        baseName: 'jhipster',
                        packageName: 'com.mycompany.myapp',
                        packageFolder: 'com/mycompany/myapp',
                        clientFramework: ANGULAR,
                        serviceDiscoveryType: false,
                        authenticationType: 'jwt',
                        cacheProvider: 'hazelcast',
                        enableHibernateCache: true,
                        databaseType: 'sql',
                        devDatabaseType: 'h2Memory',
                        prodDatabaseType: 'postgresql',
                        enableTranslation: false,
                        buildTool: 'maven',
                        rememberMeKey: '5c37379956bd1242f5636c8cb322c2966ad81277',
                        serverSideOptions: [],
                    })
                    .run();
            });

            it('does not create i18n files if i18n is disabled', () => {
                assert.noFile(expectedFiles.i18n);
                assert.file([`${SERVER_MAIN_RES_DIR}i18n/messages.properties`]);
            });
        });

        describe('with RTL support', () => {
            before(async () => {
                await helpers
                    .create(path.join(__dirname, '../generators/app'))
                    .withOptions({
                        jhiprefix: 'test',
                        withgeneratedflag: true,
                        'skip-ktlint-format': true,
                        blueprints: 'kotlin',
                    })
                    .withPrompts({
                        baseName: 'jhipster',
                        clientFramework: ANGULAR,
                        packageName: 'com.mycompany.myapp',
                        packageFolder: 'com/mycompany/myapp',
                        serviceDiscoveryType: false,
                        authenticationType: 'jwt',
                        cacheProvider: 'ehcache',
                        enableHibernateCache: true,
                        databaseType: 'sql',
                        devDatabaseType: 'h2Memory',
                        prodDatabaseType: 'postgresql',
                        enableTranslation: true,
                        nativeLanguage: 'en',
                        languages: ['ar-ly', 'en'],
                        buildTool: 'maven',
                        rememberMeKey: '5c37379956bd1242f5636c8cb322c2966ad81277',
                        skipClient: false,
                        skipUserManagement: false,
                        serverSideOptions: [],
                    })
                    .run();
            });

            it('creates expected default files for i18n with RTL support', () => {
                assert.file(expectedFiles.i18nRtl);
                assert.file(
                    getFilesForOptions(angularFiles, {
                        enableTranslation: true,
                        serviceDiscoveryType: false,
                        authenticationType: 'jwt',
                        testFrameworks: [],
                    })
                );
            });
            it('contains updatePageDirection in main component', () => {
                assert.fileContent(`${CLIENT_MAIN_SRC_DIR}app/layouts/main/main.component.ts`, /private updatePageDirection/);
            });
        });
    });

    context('Auth options', () => {
        describe('JWT authentication', () => {
            before(async () => {
                await helpers
                    .create(path.join(__dirname, '../generators/app'))
                    .withOptions({
                        jhiprefix: 'test',
                        withgeneratedflag: true,
                        'skip-ktlint-format': true,
                        blueprints: 'kotlin',
                    })
                    .withPrompts({
                        baseName: 'jhipster',
                        packageName: 'com.mycompany.myapp',
                        packageFolder: 'com/mycompany/myapp',
                        clientFramework: ANGULAR,
                        serviceDiscoveryType: false,
                        authenticationType: 'jwt',
                        cacheProvider: 'ehcache',
                        enableHibernateCache: true,
                        databaseType: 'sql',
                        devDatabaseType: 'h2Memory',
                        prodDatabaseType: 'postgresql',
                        enableTranslation: true,
                        nativeLanguage: 'en',
                        languages: ['fr', 'en'],
                        buildTool: 'maven',
                        rememberMeKey: '5c37379956bd1242f5636c8cb322c2966ad81277',
                        serverSideOptions: [],
                    })
                    .run();
            });

            it('creates expected files with JWT authentication', () => {
                assert.file(expectedFiles.jwtServer);
                assert.file(
                    getFilesForOptions(angularFiles, {
                        enableTranslation: true,
                        serviceDiscoveryType: false,
                        authenticationType: 'jwt',
                        testFrameworks: [],
                    })
                );
            });
        });

        describe('HTTP session authentication', () => {
            before(async () => {
                await helpers
                    .create(path.join(__dirname, '../generators/app'))
                    .withOptions({
                        jhiprefix: 'test',
                        withgeneratedflag: true,
                        'skip-ktlint-format': true,
                        blueprints: 'kotlin',
                    })
                    .withPrompts({
                        baseName: 'jhipster',
                        packageName: 'com.mycompany.myapp',
                        packageFolder: 'com/mycompany/myapp',
                        clientFramework: ANGULAR,
                        serviceDiscoveryType: false,
                        authenticationType: 'session',
                        cacheProvider: 'ehcache',
                        enableHibernateCache: true,
                        databaseType: 'sql',
                        devDatabaseType: 'h2Memory',
                        prodDatabaseType: 'postgresql',
                        enableTranslation: true,
                        nativeLanguage: 'en',
                        languages: ['fr', 'en'],
                        buildTool: 'maven',
                        rememberMeKey: '5c37379956bd1242f5636c8cb322c2966ad81277',
                        serverSideOptions: [],
                    })
                    .run();
            });

            it('creates expected files with HTTP session authentication', () => {
                assert.file(expectedFiles.session);
                assert.file(
                    getFilesForOptions(angularFiles, {
                        enableTranslation: true,
                        serviceDiscoveryType: false,
                        authenticationType: 'session',
                        testFrameworks: [],
                    })
                );
            });
        });
    });

    context('Testing options', () => {
        describe('Protractor tests', () => {
            before(async () => {
                await helpers
                    .create(path.join(__dirname, '../generators/app'))
                    .withOptions({
                        jhiprefix: 'test',
                        withgeneratedflag: true,
                        'skip-ktlint-format': true,
                        blueprints: 'kotlin',
                    })
                    .withPrompts({
                        baseName: 'jhipster',
                        packageName: 'com.mycompany.myapp',
                        packageFolder: 'com/mycompany/myapp',
                        clientFramework: ANGULAR,
                        serverPort: '8080',
                        authenticationType: 'jwt',
                        serviceDiscoveryType: false,
                        cacheProvider: 'ehcache',
                        enableHibernateCache: true,
                        websocket: false,
                        databaseType: 'sql',
                        devDatabaseType: 'h2Disk',
                        prodDatabaseType: 'postgresql',
                        searchEngine: false,
                        buildTool: 'maven',
                        rememberMeKey: '5c37379956bd1242f5636c8cb322c2966ad81277',
                        applicationType: 'monolith',
                        testFrameworks: ['protractor'],
                        jhiPrefix: 'jhi',
                        enableTranslation: true,
                        nativeLanguage: 'en',
                        languages: ['en'],
                    })
                    .run();
            });

            it('creates expected files with Protractor enabled', () => {
                assert.file(expectedFiles.common);
                assert.file(expectedFiles.server);
                assert.file(expectedFiles.userManagementServer);
                assert.file(expectedFiles.postgresql);
                assert.file(expectedFiles.hibernateTimeZoneConfig);
                assert.file(
                    getFilesForOptions(angularFiles, {
                        enableTranslation: true,
                        serviceDiscoveryType: false,
                        authenticationType: 'jwt',
                        testFrameworks: ['protractor'],
                    })
                );
                assert.noFile([`${TEST_DIR}gatling/conf/gatling.conf`, `${TEST_DIR}gatling/conf/logback.xml`]);
            });
        });

        describe('Cucumber tests', () => {
            before(async () => {
                await helpers
                    .create(path.join(__dirname, '../generators/app'))
                    .withOptions({
                        jhiprefix: 'test',
                        withgeneratedflag: true,
                        'skip-ktlint-format': true,
                        blueprints: 'kotlin',
                    })
                    .withPrompts({
                        baseName: 'jhipster',
                        packageName: 'com.mycompany.myapp',
                        packageFolder: 'com/mycompany/myapp',
                        clientFramework: ANGULAR,
                        serverPort: '8080',
                        serviceDiscoveryType: false,
                        authenticationType: 'jwt',
                        cacheProvider: 'ehcache',
                        enableHibernateCache: true,
                        websocket: false,
                        databaseType: 'sql',
                        devDatabaseType: 'h2Disk',
                        prodDatabaseType: 'postgresql',
                        searchEngine: false,
                        buildTool: 'maven',
                        rememberMeKey: '5c37379956bd1242f5636c8cb322c2966ad81277',
                        applicationType: 'monolith',
                        testFrameworks: ['cucumber'],
                        jhiPrefix: 'jhi',
                        enableTranslation: true,
                        nativeLanguage: 'en',
                        languages: ['en'],
                    })
                    .run();
            });

            it('creates expected files with Cucumber enabled', () => {
                assert.file(expectedFiles.common);
                assert.file(expectedFiles.server);
                assert.file(expectedFiles.userManagementServer);
                assert.file(expectedFiles.postgresql);
                assert.file(expectedFiles.hibernateTimeZoneConfig);
                assert.file(expectedFiles.cucumber);
                assert.noFile([`${TEST_DIR}gatling/conf/gatling.conf`, `${TEST_DIR}gatling/conf/logback.xml`]);
            });
        });
    });

    context('App with skip server', () => {
        before(async () => {
            await helpers
                .create(path.join(__dirname, '../generators/app'))
                .withOptions({
                    fromCli: true,
                    skipInstall: true,
                    skipChecks: true,
                    skipServer: true,
                    db: 'postgresql',
                    auth: 'jwt',
                    'skip-ktlint-format': true,
                })
                .withPrompts({
                    baseName: 'jhipster',
                    clientFramework: ANGULAR,
                    packageName: 'com.mycompany.myapp',
                    packageFolder: 'com/mycompany/myapp',
                    serviceDiscoveryType: false,
                    authenticationType: 'jwt',
                    enableTranslation: true,
                    nativeLanguage: 'en',
                    languages: ['fr', 'en'],
                    rememberMeKey: '5c37379956bd1242f5636c8cb322c2966ad81277',
                })
                .run();
        });

        it('creates expected files for default configuration with skip server option enabled', () => {
            assert.file(expectedFiles.common);
            assert.noFile(expectedFiles.server);
            assert.noFile(expectedFiles.userManagementServer);
            assert.noFile(expectedFiles.maven);
            assert.noFile(expectedFiles.postgresql);
            assert.noFile(expectedFiles.hibernateTimeZoneConfig);
            assert.file(
                getFilesForOptions(angularFiles, {
                    enableTranslation: true,
                    serviceDiscoveryType: false,
                    authenticationType: 'jwt',
                    testFrameworks: [],
                })
            );
        });
        it('generates a README with no undefined value', () => {
            assert.noFileContent('README.md', /undefined/);
        });
        it('generates a .prettierrc with no reference to kt extension', () => {
            assert.noFileContent('.prettierrc', ',kt');
        });
    });

    context('App with skip client', () => {
        describe('Maven', () => {
            before(async () => {
                await helpers
                    .create(path.join(__dirname, '../generators/app'))
                    .withOptions({
                        jhiPrefix: 'test',
                        withGeneratedFlag: true,
                        'skip-ktlint-format': true,
                        blueprints: 'kotlin',
                        skipClient: true,
                    })
                    .withPrompts({
                        baseName: 'jhipster',
                        packageName: 'com.mycompany.myapp',
                        packageFolder: 'com/mycompany/myapp',
                        serviceDiscoveryType: false,
                        authenticationType: 'jwt',
                        cacheProvider: 'ehcache',
                        enableHibernateCache: true,
                        databaseType: 'sql',
                        devDatabaseType: 'h2Memory',
                        prodDatabaseType: 'postgresql',
                        buildTool: 'maven',
                        enableTranslation: true,
                        nativeLanguage: 'en',
                        languages: ['fr', 'en'],
                        rememberMeKey: '5c37379956bd1242f5636c8cb322c2966ad81277',
                        serverSideOptions: [],
                    })
                    .run();
            });

            it('creates expected files for default configuration with skip client option enabled', () => {
                assert.file(expectedFiles.common);
                assert.file(expectedFiles.server);
                assert.file(expectedFiles.userManagementServer);
                assert.file(expectedFiles.maven);
                assert.file(expectedFiles.postgresql);
                assert.file(expectedFiles.hibernateTimeZoneConfig);
                assert.noFile(
                    getFilesForOptions(
                        angularFiles,
                        {
                            enableTranslation: true,
                            serviceDiscoveryType: false,
                            authenticationType: 'session',
                            testFrameworks: [],
                        },
                        '',
                        ['package.json']
                    )
                );
            });
            it('generates a README with no undefined value', () => {
                assert.noFileContent('README.md', /undefined/);
            });
            it('generates a pom.xml with no reference to client', () => {
                assert.noFileContent('pom.xml', 'node.version');
                assert.noFileContent('pom.xml', 'npm.version');
                assert.noFileContent('pom.xml', 'frontend-maven-plugin');
            });
            it('generates a .prettierrc with no reference to webpack', () => {
                assert.noFileContent('.prettierrc', 'webpack');
            });
            it('generates a .prettierrc with no reference to client extensions', () => {
                assert.noFileContent('.prettierrc', ',js');
                assert.noFileContent('.prettierrc', ',ts');
                assert.noFileContent('.prettierrc', ',tsx');
                assert.noFileContent('.prettierrc', ',css');
                assert.noFileContent('.prettierrc', ',scss');
            });
        });

        describe('Gradle', () => {
            before(async () => {
                await helpers
                    .create(path.join(__dirname, '../generators/app'))
                    .withOptions({
                        jhiPrefix: 'test',
                        withGeneratedFlag: true,
                        'skip-ktlint-format': true,
                        blueprints: 'kotlin',
                        skipClient: true,
                    })
                    .withPrompts({
                        baseName: 'jhipster',
                        packageName: 'com.mycompany.myapp',
                        packageFolder: 'com/mycompany/myapp',
                        serviceDiscoveryType: false,
                        authenticationType: 'jwt',
                        cacheProvider: 'ehcache',
                        enableHibernateCache: true,
                        databaseType: 'sql',
                        devDatabaseType: 'h2Memory',
                        prodDatabaseType: 'postgresql',
                        buildTool: 'gradle',
                        enableTranslation: true,
                        nativeLanguage: 'en',
                        languages: ['fr', 'en'],
                        rememberMeKey: '5c37379956bd1242f5636c8cb322c2966ad81277',
                        serverSideOptions: [],
                    })
                    .run();
            });

            it('creates expected files for default configuration with skip client option enabled', () => {
                assert.file(expectedFiles.common);
                assert.file(expectedFiles.server);
                assert.file(expectedFiles.userManagementServer);
                assert.file(expectedFiles.gradle);
                assert.file(expectedFiles.postgresql);
                assert.file(expectedFiles.hibernateTimeZoneConfig);
                assert.noFile(
                    getFilesForOptions(
                        angularFiles,
                        {
                            enableTranslation: true,
                            serviceDiscoveryType: false,
                            authenticationType: 'jwt',
                            testFrameworks: [],
                        },
                        '',
                        ['package.json']
                    )
                );
            });
            it('generates README with instructions for Gradle', () => {
                assert.fileContent('README.md', './gradlew');
            });
        });
    });

    context('App with skip client and skip user management', () => {
        describe('Maven', () => {
            before(async () => {
                await helpers
                    .create(path.join(__dirname, '../generators/app'))
                    .withOptions({
                        jhiPrefix: 'test',
                        withGeneratedFlag: true,
                        'skip-ktlint-format': true,
                        blueprints: 'kotlin',
                        skipClient: true,
                        skipUserManagement: true,
                    })
                    .withPrompts({
                        baseName: 'jhipster',
                        applicationType: 'monolith',
                        packageName: 'com.mycompany.myapp',
                        packageFolder: 'com/mycompany/myapp',
                        serviceDiscoveryType: false,
                        authenticationType: 'jwt',
                        cacheProvider: 'ehcache',
                        enableHibernateCache: true,
                        databaseType: 'sql',
                        devDatabaseType: 'h2Memory',
                        prodDatabaseType: 'postgresql',
                        buildTool: 'maven',
                        enableTranslation: true,
                        nativeLanguage: 'en',
                        languages: ['fr', 'en'],
                        rememberMeKey: '5c37379956bd1242f5636c8cb322c2966ad81277',
                        serverSideOptions: [],
                    })
                    .run();
            });

            it('creates expected server files', () => {
                assert.file(expectedFiles.server);
                assert.noFile(expectedFiles.userManagementServer);
            });
            it('creates SecurityConfiguration for default configuration with skip client and skip user management option enabled', () => {
                assert.file(`${SERVER_MAIN_KOTLIN_SRC_DIR}com/mycompany/myapp/config/SecurityConfiguration.kt`);
            });
        });
    });

    context('Eureka', () => {
        describe('gateway with eureka', () => {
            before(async () => {
                await helpers
                    .create(path.join(__dirname, '../generators/app'))
                    .withOptions({
                        jhiprefix: 'test',
                        withgeneratedflag: true,
                        'skip-ktlint-format': true,
                        blueprints: 'kotlin',
                    })
                    .withPrompts({
                        applicationType: 'gateway',
                        baseName: 'jhipster',
                        packageName: 'com.mycompany.myapp',
                        packageFolder: 'com/mycompany/myapp',
                        clientFramework: ANGULAR,
                        serviceDiscoveryType: 'eureka',
                        authenticationType: 'jwt',
                        cacheProvider: 'ehcache',
                        enableHibernateCache: true,
                        databaseType: 'sql',
                        devDatabaseType: 'h2Memory',
                        prodDatabaseType: 'postgresql',
                        enableTranslation: true,
                        nativeLanguage: 'en',
                        languages: ['fr', 'en'],
                        buildTool: 'maven',
                        rememberMeKey: '5c37379956bd1242f5636c8cb322c2966ad81277',
                        serverSideOptions: [],
                    })
                    .run();
            });

            it('creates expected files with the gateway application type', () => {
                assert.file(expectedFiles.jwtServerGateway);
                assert.file(expectedFiles.gateway);
                assert.file(expectedFiles.eureka);
                assert.noFile(expectedFiles.consul);
            });
        });

        describe('gateway with eureka and rate limiting', () => {
            before(async () => {
                await helpers
                    .create(path.join(__dirname, '../generators/app'))
                    .withOptions({
                        jhiprefix: 'test',
                        withgeneratedflag: true,
                        'skip-ktlint-format': true,
                        blueprints: 'kotlin',
                    })
                    .withPrompts({
                        applicationType: 'gateway',
                        baseName: 'jhipster',
                        packageName: 'com.mycompany.myapp',
                        packageFolder: 'com/mycompany/myapp',
                        clientFramework: ANGULAR,
                        serviceDiscoveryType: 'eureka',
                        authenticationType: 'jwt',
                        cacheProvider: 'hazelcast',
                        enableHibernateCache: true,
                        databaseType: 'sql',
                        devDatabaseType: 'h2Memory',
                        prodDatabaseType: 'postgresql',
                        enableTranslation: true,
                        nativeLanguage: 'en',
                        languages: ['fr', 'en'],
                        buildTool: 'maven',
                        rememberMeKey: '5c37379956bd1242f5636c8cb322c2966ad81277',
                        serverSideOptions: [],
                    })
                    .run();
            });

            it('creates expected files with the gateway application type', () => {
                assert.file(expectedFiles.jwtServerGateway);
                assert.file(expectedFiles.gateway);
                assert.file(expectedFiles.eureka);
                assert.noFile(expectedFiles.consul);
            });
        });

        describe('microservice with eureka', () => {
            before(async () => {
                await helpers
                    .create(path.join(__dirname, '../generators/app'))
                    .withOptions({
                        jhiprefix: 'test',
                        withgeneratedflag: true,
                        'skip-ktlint-format': true,
                        blueprints: 'kotlin',
                    })
                    .withPrompts({
                        applicationType: 'microservice',
                        baseName: 'jhipster',
                        packageName: 'com.mycompany.myapp',
                        packageFolder: 'com/mycompany/myapp',
                        serviceDiscoveryType: 'eureka',
                        authenticationType: 'jwt',
                        cacheProvider: 'ehcache',
                        enableHibernateCache: true,
                        databaseType: 'sql',
                        devDatabaseType: 'postgresql',
                        prodDatabaseType: 'postgresql',
                        enableTranslation: true,
                        nativeLanguage: 'en',
                        languages: ['fr', 'en'],
                        buildTool: 'maven',
                        rememberMeKey: '5c37379956bd1242f5636c8cb322c2966ad81277',
                        serverSideOptions: [],
                    })
                    .run();
            });

            it('creates expected files with the microservice application type', () => {
                assert.file(expectedFiles.jwtServer);
                assert.file(expectedFiles.microservice);
                assert.file(expectedFiles.feignConfig);
                assert.file(expectedFiles.dockerServices);
                assert.file(expectedFiles.eureka);
                assert.noFile(expectedFiles.consul);
            });
        });

        describe('monolith with eureka', () => {
            before(async () => {
                await helpers
                    .create(path.join(__dirname, '../generators/app'))
                    .withOptions({
                        jhiprefix: 'test',
                        withgeneratedflag: true,
                        'skip-ktlint-format': true,
                        blueprints: 'kotlin',
                    })
                    .withPrompts({
                        applicationType: 'monolith',
                        baseName: 'jhipster',
                        packageName: 'com.mycompany.myapp',
                        packageFolder: 'com/mycompany/myapp',
                        clientFramework: ANGULAR,
                        authenticationType: 'jwt',
                        cacheProvider: 'ehcache',
                        enableHibernateCache: true,
                        databaseType: 'sql',
                        devDatabaseType: 'h2Memory',
                        prodDatabaseType: 'postgresql',
                        enableTranslation: true,
                        nativeLanguage: 'en',
                        languages: ['fr', 'en'],
                        buildTool: 'maven',
                        rememberMeKey: '5c37379956bd1242f5636c8cb322c2966ad81277',
                        serverSideOptions: ['serviceDiscoveryType:eureka'],
                    })
                    .run();
            });

            it('creates expected files with the monolith application type', () => {
                assert.file(expectedFiles.common);
                assert.file(expectedFiles.server);
                assert.file(expectedFiles.userManagementServer);
                assert.file(expectedFiles.postgresql);
                assert.file(expectedFiles.hibernateTimeZoneConfig);
                assert.file(expectedFiles.client);
                assert.file(expectedFiles.eureka);
                assert.noFile(expectedFiles.consul);
            });
        });

        describe('microservice with gradle and eureka', () => {
            before(async () => {
                await helpers
                    .create(path.join(__dirname, '../generators/app'))
                    .withOptions({
                        jhiprefix: 'test',
                        withgeneratedflag: true,
                        'skip-ktlint-format': true,
                        blueprints: 'kotlin',
                    })
                    .withPrompts({
                        applicationType: 'microservice',
                        baseName: 'jhipster',
                        packageName: 'com.mycompany.myapp',
                        packageFolder: 'com/mycompany/myapp',
                        serviceDiscoveryType: 'eureka',
                        authenticationType: 'jwt',
                        cacheProvider: 'ehcache',
                        enableHibernateCache: true,
                        databaseType: 'sql',
                        devDatabaseType: 'h2Memory',
                        prodDatabaseType: 'postgresql',
                        enableTranslation: true,
                        nativeLanguage: 'en',
                        languages: ['fr', 'en'],
                        buildTool: 'gradle',
                        rememberMeKey: '5c37379956bd1242f5636c8cb322c2966ad81277',
                        serverSideOptions: [],
                        skipClient: true,
                        skipUserManagement: true,
                    })
                    .run();
            });

            it('creates expected files with the microservice application type', () => {
                assert.file(expectedFiles.jwtServer);
                assert.file(expectedFiles.microservice);
                assert.file(expectedFiles.feignConfig);
                assert.file(expectedFiles.microserviceGradle);
                assert.file(expectedFiles.eureka);
                assert.noFile(expectedFiles.consul);
                assert.noFile(expectedFiles.userManagementServer);
            });
        });
    });

    context('Consul', () => {
        describe('gateway with consul', () => {
            before(async () => {
                await helpers
                    .create(path.join(__dirname, '../generators/app'))
                    .withOptions({
                        jhiprefix: 'test',
                        withgeneratedflag: true,
                        'skip-ktlint-format': true,
                        blueprints: 'kotlin',
                    })
                    .withPrompts({
                        applicationType: 'gateway',
                        baseName: 'jhipster',
                        packageName: 'com.mycompany.myapp',
                        packageFolder: 'com/mycompany/myapp',
                        clientFramework: ANGULAR,
                        serviceDiscoveryType: 'consul',
                        authenticationType: 'jwt',
                        cacheProvider: 'hazelcast',
                        enableHibernateCache: true,
                        databaseType: 'sql',
                        devDatabaseType: 'h2Memory',
                        prodDatabaseType: 'postgresql',
                        enableTranslation: true,
                        nativeLanguage: 'en',
                        languages: ['fr', 'en'],
                        buildTool: 'maven',
                        rememberMeKey: '5c37379956bd1242f5636c8cb322c2966ad81277',
                        serverSideOptions: [],
                    })
                    .run();
            });

            it('creates expected files with the gateway application type', () => {
                assert.file(expectedFiles.jwtServerGateway);
                assert.file(expectedFiles.gateway);
                assert.noFile(expectedFiles.eureka);
                assert.file(expectedFiles.consul);
            });
        });

        describe('gateway with consul and rate limiting', () => {
            before(async () => {
                await helpers
                    .create(path.join(__dirname, '../generators/app'))
                    .withOptions({
                        jhiprefix: 'test',
                        withgeneratedflag: true,
                        'skip-ktlint-format': true,
                        blueprints: 'kotlin',
                    })
                    .withPrompts({
                        applicationType: 'gateway',
                        baseName: 'jhipster',
                        packageName: 'com.mycompany.myapp',
                        packageFolder: 'com/mycompany/myapp',
                        clientFramework: ANGULAR,
                        serviceDiscoveryType: 'consul',
                        authenticationType: 'jwt',
                        cacheProvider: 'hazelcast',
                        enableHibernateCache: true,
                        databaseType: 'sql',
                        devDatabaseType: 'h2Memory',
                        prodDatabaseType: 'postgresql',
                        enableTranslation: true,
                        nativeLanguage: 'en',
                        languages: ['fr', 'en'],
                        buildTool: 'maven',
                        rememberMeKey: '5c37379956bd1242f5636c8cb322c2966ad81277',
                        serverSideOptions: [],
                    })
                    .run();
            });

            it('creates expected files with the gateway application type', () => {
                assert.file(expectedFiles.jwtServerGateway);
                assert.file(expectedFiles.gateway);
                assert.noFile(expectedFiles.eureka);
                assert.file(expectedFiles.consul);
            });
        });

        describe('microservice with consul', () => {
            before(async () => {
                await helpers
                    .create(path.join(__dirname, '../generators/app'))
                    .withOptions({
                        jhiprefix: 'test',
                        withgeneratedflag: true,
                        'skip-ktlint-format': true,
                        blueprints: 'kotlin',
                    })
                    .withPrompts({
                        applicationType: 'microservice',
                        baseName: 'jhipster',
                        packageName: 'com.mycompany.myapp',
                        packageFolder: 'com/mycompany/myapp',
                        serviceDiscoveryType: 'consul',
                        authenticationType: 'jwt',
                        cacheProvider: 'ehcache',
                        enableHibernateCache: true,
                        databaseType: 'sql',
                        devDatabaseType: 'postgresql',
                        prodDatabaseType: 'postgresql',
                        enableTranslation: true,
                        nativeLanguage: 'en',
                        languages: ['fr', 'en'],
                        buildTool: 'maven',
                        rememberMeKey: '5c37379956bd1242f5636c8cb322c2966ad81277',
                        serverSideOptions: [],
                    })
                    .run();
            });

            it('creates expected files with the microservice application type', () => {
                assert.file(expectedFiles.jwtServer);
                assert.file(expectedFiles.microservice);
                assert.file(expectedFiles.dockerServices);
                assert.noFile(expectedFiles.eureka);
                assert.file(expectedFiles.consul);
            });
        });
    });

    context('No Service Discovery', () => {
        describe('gateway with no service discovery', () => {
            before(async () => {
                await helpers
                    .create(path.join(__dirname, '../generators/app'))
                    .withOptions({
                        jhiprefix: 'test',
                        withgeneratedflag: true,
                        'skip-ktlint-format': true,
                        blueprints: 'kotlin',
                    })
                    .withPrompts({
                        applicationType: 'gateway',
                        baseName: 'jhipster',
                        packageName: 'com.mycompany.myapp',
                        packageFolder: 'com/mycompany/myapp',
                        clientFramework: ANGULAR,
                        serviceDiscoveryType: false,
                        authenticationType: 'jwt',
                        cacheProvider: 'ehcache',
                        enableHibernateCache: true,
                        databaseType: 'sql',
                        devDatabaseType: 'h2Memory',
                        prodDatabaseType: 'postgresql',
                        enableTranslation: true,
                        nativeLanguage: 'en',
                        languages: ['fr', 'en'],
                        buildTool: 'maven',
                        rememberMeKey: '5c37379956bd1242f5636c8cb322c2966ad81277',
                        serverSideOptions: [],
                    })
                    .run();
            });

            it('creates expected files with the gateway application type', () => {
                assert.file(expectedFiles.jwtServerGateway);
                assert.noFile(expectedFiles.gateway);
                assert.noFile(expectedFiles.eureka);
                assert.noFile(expectedFiles.consul);
            });
        });

        describe('microservice with no service discovery', () => {
            before(async () => {
                await helpers
                    .create(path.join(__dirname, '../generators/app'))
                    .withOptions({
                        jhiprefix: 'test',
                        withgeneratedflag: true,
                        'skip-ktlint-format': true,
                        blueprints: 'kotlin',
                    })
                    .withPrompts({
                        applicationType: 'microservice',
                        baseName: 'jhipster',
                        packageName: 'com.mycompany.myapp',
                        packageFolder: 'com/mycompany/myapp',
                        serviceDiscoveryType: false,
                        authenticationType: 'jwt',
                        cacheProvider: 'ehcache',
                        enableHibernateCache: true,
                        devDatabaseType: 'postgresql',
                        prodDatabaseType: 'postgresql',
                        enableTranslation: true,
                        nativeLanguage: 'en',
                        languages: ['fr', 'en'],
                        buildTool: 'maven',
                        rememberMeKey: '5c37379956bd1242f5636c8cb322c2966ad81277',
                        serverSideOptions: [],
                    })
                    .run();
            });

            it('creates expected files with the microservice application type', () => {
                assert.file(expectedFiles.jwtServer);
                assert.file(expectedFiles.microservice);
                assert.file(expectedFiles.dockerServices);
                assert.noFile(expectedFiles.eureka);
                assert.noFile(expectedFiles.consul);
            });
        });
    });
});
