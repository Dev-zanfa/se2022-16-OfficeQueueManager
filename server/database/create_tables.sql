CREATE TABLE IF NOT EXISTS Counter(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user varchar(255) NOT NULL,
    hash varchar(64) NOT NULL,
    salt varchar(16) NOT NULL
);

CREATE TABLE IF NOT EXISTS Service(
    tag varchar(255) PRIMARY KEY,
    name varchar(255) NOT NULL,
    service_time integer NOT NULL
);

CREATE TABLE IF NOT EXISTS Link_counter_service(
    counter INTEGER  NOT NULL,
    service varchar(255)  NOT NULL,
    PRIMARY KEY (counter,service),
    FOREIGN KEY (counter) REFERENCES Counter(id),
    FOREIGN KEY (service) REFERENCES Service(tag)
);

CREATE TABLE IF NOT EXISTS Queue(
    service varchar(255),
    count integer NOT NULL,
    PRIMARY KEY (service),
    FOREIGN KEY (service) REFERENCES Service(tag)
);

CREATE TABLE IF NOT EXISTS Ticket(
    service varchar(255) NOT NULL,
    number integer NOT NULL,
    PRIMARY KEY (service,number),
    FOREIGN KEY (service) REFERENCES Service(tag)
);

