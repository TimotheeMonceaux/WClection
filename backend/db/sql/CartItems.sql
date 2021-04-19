-- SEQUENCE: shop.CartItems_Id_seq

-- DROP TABLE shop."CartItems";
-- DROP SEQUENCE shop."CartItems_Id_seq";

CREATE SEQUENCE shop."CartItems_Id_seq"
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE shop."CartItems_Id_seq"
    OWNER TO postgres;

-- Table: shop.CartItems

CREATE TABLE shop."CartItems"
(
    "Id" bigint NOT NULL DEFAULT nextval('shop."CartItems_Id_seq"'::regclass),
    "UserEmail" character varying COLLATE pg_catalog."default" NOT NULL,
    "ProductId" bigint NOT NULL,
    "Quantity" int NOT NULL DEFAULT(1),
    "CreateDate" timestamp with time zone NOT NULL DEFAULT NOW(),
    CONSTRAINT "CartItems_pkey" PRIMARY KEY ("Id"),
    CONSTRAINT "CartItems_fkey_Users" FOREIGN KEY ("UserEmail")
        REFERENCES auth."Users" ("Email") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "CartItems_fkey_Products" FOREIGN KEY ("ProductId")
        REFERENCES shop."Products" ("Id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "CartItems_unique_UserEmail_ProductId" UNIQUE ("UserEmail", "ProductId")
)

TABLESPACE pg_default;

ALTER TABLE shop."CartItems"
    OWNER to postgres;

CREATE INDEX ON shop."CartItems" ("UserEmail");