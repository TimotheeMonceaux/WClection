-- SEQUENCE: auth.EmailConfirmationCache_Id_seq

-- DROP SEQUENCE auth."EmailConfirmationCache_Id_seq";

CREATE SEQUENCE auth."EmailConfirmationCache_Id_seq"
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE auth."EmailConfirmationCache_Id_seq"
    OWNER TO postgres;

-- Table: auth.EmailConfirmationCache

-- DROP TABLE auth."EmailConfirmationCache";

CREATE TABLE auth."EmailConfirmationCache"
(
    "Id" bigint NOT NULL DEFAULT nextval('auth."EmailConfirmationCache_Id_seq"'::regclass),
    "Email" character varying COLLATE pg_catalog."default" NOT NULL,
    "Key" character varying COLLATE pg_catalog."default" NOT NULL,
    "ValidUntil" timestamp with time zone NOT NULL,
    CONSTRAINT "EmailConfirmationCache_pkey" PRIMARY KEY ("Id"),
    CONSTRAINT "EmailConfirmationCache_fkey_Users" FOREIGN KEY ("Email")
        REFERENCES auth."Users" ("Email") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE auth."EmailConfirmationCache"
    OWNER to postgres;