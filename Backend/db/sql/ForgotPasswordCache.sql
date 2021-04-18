-- SEQUENCE: auth.ForgotPasswordCache_Id_seq

-- DROP TABLE auth."ForgotPasswordCache";
-- DROP SEQUENCE auth."ForgotPasswordCache_Id_seq";

CREATE SEQUENCE auth."ForgotPasswordCache_Id_seq"
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE auth."ForgotPasswordCache_Id_seq"
    OWNER TO postgres;

-- Table: auth.ForgotPasswordCache

CREATE TABLE auth."ForgotPasswordCache"
(
    "Id" bigint NOT NULL DEFAULT nextval('auth."ForgotPasswordCache_Id_seq"'::regclass),
    "Email" character varying COLLATE pg_catalog."default" NOT NULL,
    "Key" character varying COLLATE pg_catalog."default" NOT NULL,
    "ValidUntil" timestamp with time zone NOT NULL,
    "CreateDate" timestamp with time zone NOT NULL DEFAULT NOW(),
    CONSTRAINT "ForgotPasswordCache_pkey" PRIMARY KEY ("Id"),
    CONSTRAINT "ForgotPasswordCache_fkey_Users" FOREIGN KEY ("Email")
        REFERENCES auth."Users" ("Email") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE auth."ForgotPasswordCache"
    OWNER to postgres;

CREATE INDEX ON auth."ForgotPasswordCache" ("Email", "Key");