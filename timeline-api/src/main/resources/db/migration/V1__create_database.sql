-- EVENT_TYPES table
CREATE SEQUENCE event_type_seq
    START 1
    INCREMENT BY 50
;
CREATE TABLE IF NOT EXISTS event_types
(
    type_id bigint NOT NULL DEFAULT nextval('event_type_seq'),
    name    text   NOT NULL UNIQUE,
    colour  text   NOT NULL,
    CONSTRAINT EVENT_TYPE_PK PRIMARY KEY (type_id)
);

-- EVENTS table
CREATE SEQUENCE event_seq
    START 1
    INCREMENT BY 50
;
CREATE TABLE IF NOT EXISTS events
(
    event_id          bigint    NOT NULL DEFAULT nextval('event_seq'),
    name              text      NOT NULL,
    type_id           bigint    NOT NULL,
    start_date        date      NOT NULL,
    end_date          date      NOT NULL,
    short_description text      NOT NULL,
    long_description  text      NOT NULL,
    image_url         text      NULL,
    create_date_time  timestamp NOT NULL,
    CONSTRAINT EVENT_PK PRIMARY KEY (event_id),
    CONSTRAINT EVENT_EVENT_TYPE_FK FOREIGN KEY (type_id) REFERENCES event_types (type_id)
);

CREATE INDEX EVENT_TYPE_ID_INDEX ON events
    (
     type_id
        );

-- USER table
CREATE SEQUENCE user_seq
    START 1
    INCREMENT BY 50
;
CREATE TABLE IF NOT EXISTS users
(
    user_id          bigint    NOT NULL DEFAULT nextval('user_seq'),
    login            text      NOT NULL UNIQUE,
    password         text      NOT NULL,
    create_date_time timestamp NOT NULL,
    CONSTRAINT USER_PK PRIMARY KEY (user_id)
);