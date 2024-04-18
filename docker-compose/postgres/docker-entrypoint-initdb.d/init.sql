CREATE TABLE IF NOT EXISTS event
(
    id           CHAR(26) NOT NULL CHECK (CHAR_LENGTH(id) = 26) PRIMARY KEY,
    aggregate_id CHAR(26) NOT NULL CHECK (CHAR_LENGTH(aggregate_id) = 26),
    event_data   JSON     NOT NULL,
    version      INT,
    UNIQUE (aggregate_id, version)
);

CREATE TYPE COURSE_STATUS AS ENUM ('DRAFT', 'IN_REVIEW', 'APPROVED', 'PUBLISHED', 'ARCHIVED');
CREATE TABLE COURSE
(
    id          SERIAL PRIMARY KEY,
    status      COURSE_STATUS,
    title       VARCHAR(255) NOT NULL,
    level       INT          NOT NULL,
    summary     VARCHAR(255),
    description TEXT,
    thumbnail   VARCHAR(255),
    updated_at  timestamp default current_timestamp
);