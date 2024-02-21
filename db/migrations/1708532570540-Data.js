module.exports = class Data1708532570540 {
    name = 'Data1708532570540'

    async up(db) {
        await db.query(`CREATE TABLE "deposit" ("id" character varying NOT NULL, "tx_hash" text NOT NULL, "amount" numeric NOT NULL, "account_id" character varying, CONSTRAINT "PK_6654b4be449dadfd9d03a324b61" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_9ced91570695137ec1d60c1a61" ON "deposit" ("account_id") `)
        await db.query(`CREATE TABLE "account" ("id" character varying NOT NULL, "total_deposits" numeric NOT NULL, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`)
        await db.query(`ALTER TABLE "deposit" ADD CONSTRAINT "FK_9ced91570695137ec1d60c1a61b" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`DROP TABLE "deposit"`)
        await db.query(`DROP INDEX "public"."IDX_9ced91570695137ec1d60c1a61"`)
        await db.query(`DROP TABLE "account"`)
        await db.query(`ALTER TABLE "deposit" DROP CONSTRAINT "FK_9ced91570695137ec1d60c1a61b"`)
    }
}
