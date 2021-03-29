-- SEQUENCE: shop.Collections_Id_seq

-- DROP SEQUENCE shop."Collections_Id_seq";

CREATE SEQUENCE shop."Collections_Id_seq"
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE shop."Collections_Id_seq"
    OWNER TO postgres;

-- Table: shop.Collections

-- DROP TABLE shop."Collections";

CREATE TABLE shop."Collections"
(
    "Id" bigint NOT NULL DEFAULT nextval('shop."Collections_Id_seq"'::regclass),
    "Name" character varying COLLATE pg_catalog."default",
    "IsActive" boolean NOT NULL DEFAULT true,
    CONSTRAINT "Collections_pkey" PRIMARY KEY ("Id")
)

TABLESPACE pg_default;

ALTER TABLE shop."Collections"
    OWNER to postgres;