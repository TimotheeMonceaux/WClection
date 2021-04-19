-- SEQUENCE: common.Logs_Id_seq

-- DROP SEQUENCE common."Logs_Id_seq";

CREATE SEQUENCE common."Logs_Id_seq"
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE common."Logs_Id_seq"
    OWNER TO postgres;

CREATE TABLE common."Logs"
(
    "Id" bigserial NOT NULL,
    "CreateDate" timestamp with time zone NOT NULL DEFAULT NOW(),
    "Type" character varying NOT NULL,
    "User" character varying,
    "Result" character varying,
    "ExtraParameters" character varying,
    PRIMARY KEY ("Id")
);

ALTER TABLE common."Logs"
    OWNER to postgres;

CREATE INDEX ON common."Logs" ("User");