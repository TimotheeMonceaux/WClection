-- SEQUENCE: shop.Products_Id_seq

-- DROP TABLE shop."Products";
-- DROP SEQUENCE shop."Products_Id_seq";

CREATE SEQUENCE shop."Products_Id_seq"
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE shop."Products_Id_seq"
    OWNER TO postgres;

-- Table: shop.Products

CREATE TABLE shop."Products"
(
    "Id" bigint NOT NULL DEFAULT nextval('shop."Products_Id_seq"'::regclass),
    "CollectionId" bigint NOT NULL,
    "Name" character varying COLLATE pg_catalog."default" NOT NULL,
    "Description" character varying COLLATE pg_catalog."default",
    "BasePrice" numeric(10,2) NOT NULL,
    "Price" numeric(10,2) NOT NULL,
    "MainImage" character varying COLLATE pg_catalog."default" NOT NULL,
    "SecondaryImage" character varying COLLATE pg_catalog."default",
    "Images" character varying[] COLLATE pg_catalog."default",
    "IsActive" boolean NOT NULL DEFAULT true,
    CONSTRAINT "Products_pkey" PRIMARY KEY ("Id"),
    CONSTRAINT "Products_fkey_Collections" FOREIGN KEY ("CollectionId")
        REFERENCES shop."Collections" ("Id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE shop."Products"
    OWNER to postgres;