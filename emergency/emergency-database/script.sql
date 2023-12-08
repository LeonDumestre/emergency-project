-- Création de la base de données
CREATE DATABASE emergency_database;
\c emergency_database;

CREATE TABLE fire_station(
   id_fire_station SERIAL PRIMARY KEY,
   name VARCHAR(50),
   latitude double precision,
   longitude double precision
);

CREATE TABLE sensor(
   id_sensor INT,
   latitude double precision,
   longitude double precision,
   PRIMARY KEY(id_sensor)
);

CREATE TABLE operation(
   id_operation VARCHAR(50),
   start_date TIMESTAMP,
   end_date TIMESTAMP,
   PRIMARY KEY(id_operation)
);

CREATE TABLE firefighter(
   id_firefighter INT,
   first_name VARCHAR(50),
   last_name VARCHAR(50),
   birthdate DATE,
   grade VARCHAR(50),
   id_fire_station INT,
   PRIMARY KEY(id_firefighter),
   FOREIGN KEY(id_fire_station) REFERENCES fire_station(id_fire_station)
);

CREATE TABLE availability(
   id_availability INT,
   start_date DATE,
   end_date DATE,
   id_firefighter INT,
   PRIMARY KEY(id_availability),
   FOREIGN KEY(id_firefighter) REFERENCES firefighter(id_firefighter)
);

CREATE TABLE truck(
   plate INT,
   acquisition DATE,
   id_fire_station INT,
   PRIMARY KEY(plate),
   FOREIGN KEY(id_fire_station) REFERENCES fire_station(id_fire_station)
);

CREATE TABLE truck_type(
   truck_type VARCHAR(50),
   capacity INT,
   PRIMARY KEY(truck_type)
);

CREATE TABLE victim(
   id_victim INT,
   name VARCHAR(50),
   status VARCHAR(3),
   PRIMARY KEY(id_victim)
);

CREATE TABLE truck_truck_type(
   plate INT,
   truck_type VARCHAR(50),
   PRIMARY KEY(plate, truck_type),
   FOREIGN KEY(plate) REFERENCES truck(plate),
   FOREIGN KEY(truck_type) REFERENCES truck_type(truck_type)
);

CREATE TABLE operation_truck_status(
   id_operation VARCHAR(50),
   plate INT,
   time_stamp TIMESTAMP,
   status VARCHAR(50),
   PRIMARY KEY(id_operation, plate),
   FOREIGN KEY(id_operation) REFERENCES operation(id_operation),
   FOREIGN KEY(plate) REFERENCES truck(plate)
);

CREATE TABLE operation_firefighter_truck(
   id_operation VARCHAR(50),
   id_firefighter INT,
   plate INT,
   PRIMARY KEY(id_operation, id_firefighter, plate),
   FOREIGN KEY(id_operation) REFERENCES operation(id_operation),
   FOREIGN KEY(id_firefighter) REFERENCES firefighter(id_firefighter),
   FOREIGN KEY(plate) REFERENCES truck(plate)
);

CREATE TABLE operation_sensor(
   id_sensor INT,
   id_operation VARCHAR(50),
   PRIMARY KEY(id_sensor, id_operation),
   FOREIGN KEY(id_sensor) REFERENCES sensor(id_sensor),
   FOREIGN KEY(id_operation) REFERENCES operation(id_operation)
);

CREATE TABLE victim_operation(
   id_operation VARCHAR(50),
   id_victim INT,
   PRIMARY KEY(id_operation, id_victim),
   FOREIGN KEY(id_operation) REFERENCES operation(id_operation),
   FOREIGN KEY(id_victim) REFERENCES victim(id_victim)
);

-- Création d'un trigger pour envoyer une notification lors de l'insertion dans la table operation
CREATE OR REPLACE FUNCTION notify_new_operation()
RETURNS TRIGGER AS $$
BEGIN
  -- Utilisez TG_OP pour obtenir le type d'opération (INSERT, UPDATE, DELETE)
  IF TG_OP = 'INSERT' THEN
    -- Envoyer une notification avec le nom de la nouvelle opération
    PERFORM pg_notify('new_operation', NEW.id_operation::text);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Associer le trigger à la table operation
CREATE TRIGGER operation_notify_trigger
AFTER INSERT ON operation
FOR EACH ROW EXECUTE FUNCTION notify_new_operation();
