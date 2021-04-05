-- SEQUENCE: shop.Products_Id_seq

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

-- DROP TABLE shop."Products";

CREATE TABLE shop."Products"
(
    "Id" bigint NOT NULL DEFAULT nextval('shop."Products_Id_seq"'::regclass),
	"CollectionId" bigint NOT NULL,
    "Name" character varying COLLATE pg_catalog."default" NOT NULL,
    "Description" character varying COLLATE pg_catalog."default",
    "Image1" character varying COLLATE pg_catalog."default",
    "Image2" character varying COLLATE pg_catalog."default",
    "Image3" character varying COLLATE pg_catalog."default",
    "IsActive" boolean NOT NULL DEFAULT true,
    CONSTRAINT "Products_pkey" PRIMARY KEY ("Id")
)

TABLESPACE pg_default;

ALTER TABLE shop."Products"
    OWNER to postgres;

ALTER TABLE shop."Products"
    ADD CONSTRAINT "Products_fkey_Collections" FOREIGN KEY ("CollectionId")
    REFERENCES shop."Collections" ("Id")
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;
CREATE INDEX "fki_Collections"
    ON shop."Products"("CollectionId");