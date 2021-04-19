-- SEQUENCE: shop.CarouselSlides_Id_seq

-- DROP TABLE shop."CarouselSlides";
-- DROP SEQUENCE shop."CarouselSlides_Id_seq";

CREATE SEQUENCE shop."CarouselSlides_Id_seq"
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE shop."CarouselSlides_Id_seq"
    OWNER TO postgres;

-- Table: shop.CarouselSlides


CREATE TABLE shop."CarouselSlides"
(
    "Id" bigint NOT NULL DEFAULT nextval('shop."CarouselSlides_Id_seq"'::regclass),
    "Image" character varying COLLATE pg_catalog."default" NOT NULL,
    "Name" character varying COLLATE pg_catalog."default",
    "Description" character varying COLLATE pg_catalog."default",
    "IsActive" boolean NOT NULL DEFAULT true,
    CONSTRAINT "CarouselSlides_pkey" PRIMARY KEY ("Id")
)

TABLESPACE pg_default;

ALTER TABLE shop."CarouselSlides"
    OWNER to postgres;