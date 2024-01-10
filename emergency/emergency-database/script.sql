-- Création de la base de données
CREATE DATABASE emergency_database;
\c emergency_database;

CREATE TABLE fire_station(
   id SERIAL PRIMARY KEY,
   name VARCHAR(200) NOT NULL,
   latitude double precision NOT NULL,
   longitude double precision NOT NULL
);

CREATE TABLE fire(
   id SERIAL PRIMARY KEY,
   latitude double precision NOT NULL,
   longitude double precision NOT NULL,
   intensity INT NOT NULL,
   id_operation INT
);

CREATE TYPE operation_status AS ENUM ('ON_ROAD', 'ON_SITE', 'ON_RETURN');

CREATE TABLE operation(
   id SERIAL PRIMARY KEY,
   start_date TIMESTAMP NOT NULL,
   status operation_status NOT NULL,
   id_fire INT NOT NULL
);

ALTER TABLE fire
   ADD CONSTRAINT fire_id_operation_fk
   FOREIGN KEY (id_operation) REFERENCES operation(id);

ALTER TABLE operation
   ADD CONSTRAINT operation_id_fire_fk
   FOREIGN KEY (id_fire) REFERENCES fire(id);

CREATE TABLE firefighter(
   id SERIAL PRIMARY KEY,
   name VARCHAR(200) NOT NULL,
   birthdate DATE NOT NULL,
   grade VARCHAR(50) NOT NULL,
   id_fire_station INT,
   id_operation INT,
   FOREIGN KEY(id_fire_station) REFERENCES fire_station(id),
   FOREIGN KEY(id_operation) REFERENCES operation(id)
);

CREATE TABLE truck_type(
   truck_type VARCHAR(50) PRIMARY KEY,
   capacity INT NOT NULL
);

CREATE TABLE truck(
   plate VARCHAR(20) PRIMARY KEY,
   acquisition DATE NOT NULL,
   truck_type VARCHAR(50) NOT NULL,
   id_fire_station INT,
   id_operation INT,
   FOREIGN KEY(truck_type) REFERENCES truck_type(truck_type),
   FOREIGN KEY(id_fire_station) REFERENCES fire_station(id),
   FOREIGN KEY(id_operation) REFERENCES operation(id)
);

-- Création d'un trigger pour envoyer une notification lors de l'insertion dans la table operation
CREATE OR REPLACE FUNCTION notify_new_operation()
RETURNS TRIGGER AS $$
BEGIN
  -- Utilisez TG_OP pour obtenir le type d'opération (INSERT, UPDATE, DELETE)
  IF TG_OP = 'INSERT' THEN
    -- Envoyer une notification avec le nom de la nouvelle opération
    PERFORM pg_notify('new_operation', NEW.id::text);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Associer le trigger à la table operation
CREATE TRIGGER operation_notify_trigger
AFTER INSERT ON operation
FOR EACH ROW EXECUTE FUNCTION notify_new_operation();

-- Insertion des données dans la table truck_type
INSERT INTO truck_type VALUES ('FPT', 6);
INSERT INTO truck_type VALUES ('VSAV', 3);
INSERT INTO truck_type VALUES ('EPA', 4);
