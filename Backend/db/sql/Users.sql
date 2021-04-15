-- SEQUENCE: auth.Users_Id_seq

-- DROP TABLE auth."Users";
-- DROP SEQUENCE auth."Users_Id_seq";

CREATE SEQUENCE auth."Users_Id_seq"
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE auth."Users_Id_seq"
    OWNER TO postgres;

-- Table: auth.Users

CREATE TABLE auth."Users"
(
    "Id" bigint NOT NULL DEFAULT nextval('auth."Users_Id_seq"'::regclass),
    "Email" character varying COLLATE pg_catalog."default" UNIQUE NOT NULL,
    "PasswordHash" character varying COLLATE pg_catalog."default" NOT NULL,
    "FirstName" character varying COLLATE pg_catalog."default",
    "MiddleName" character varying COLLATE pg_catalog."default",
    "LastName" character varying COLLATE pg_catalog."default",
    "Newsletter" boolean NOT NULL DEFAULT false,
    "Confirmed" boolean NOT NULL DEFAULT false,
    CONSTRAINT "Users_pkey" PRIMARY KEY ("Id")
)

TABLESPACE pg_default;

ALTER TABLE auth."Users"
    OWNER to postgres;