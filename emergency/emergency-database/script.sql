-- Création de la base de données
CREATE DATABASE emergency_database;
\c emergency_database;

CREATE TABLE fire_station(
   id SERIAL PRIMARY KEY,
   name VARCHAR(200),
   latitude double precision,
   longitude double precision
);

CREATE TABLE fire(
   id SERIAL PRIMARY KEY,
   latitude double precision,
   longitude double precision
);

CREATE TABLE operation(
   id SERIAL PRIMARY KEY,
   start_date TIMESTAMP,
   end_date TIMESTAMP,
   id_fire INT,
   FOREIGN KEY(id_fire) REFERENCES fire(id)
);

CREATE TABLE firefighter(
   id SERIAL PRIMARY KEY,
   name VARCHAR(200),
   birthdate DATE,
   grade VARCHAR(50),
   id_fire_station INT,
   id_operation INT,
   FOREIGN KEY(id_fire_station) REFERENCES fire_station(id),
   FOREIGN KEY(id_operation) REFERENCES operation(id)
);

CREATE TABLE truck_type(
   truck_type VARCHAR(50),
   capacity INT,
   PRIMARY KEY(truck_type)
);

CREATE TABLE truck(
   plate VARCHAR(20),
   acquisition DATE,
   truck_type VARCHAR(50),
   id_fire_station INT,
   id_operation INT,
   PRIMARY KEY(plate),
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
