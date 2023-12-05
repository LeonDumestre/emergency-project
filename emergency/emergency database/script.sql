-- Création de la base de données
CREATE DATABASE aaaaaaa;
\c aaaaaaa;

CREATE TABLE fire_station(
   id_fire_station INT,
   name VARCHAR(50),
   latitude decimal,
   longitude decimal,
   PRIMARY KEY(id_fire_station)
);

CREATE TABLE sensor(
   id_sensor INT,
   latitude decimal,
   longitude decimal,
   PRIMARY KEY(id_sensor)
);

CREATE TABLE operation(
   id_operation VARCHAR(50),
   start_date DATE,
   end_date DATE,
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
   start_date timestamp ,
   end_date timestamp ,
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

CREATE TABLE is_truck(
   plate INT,
   truck_type VARCHAR(50),
   PRIMARY KEY(plate, truck_type),
   FOREIGN KEY(plate) REFERENCES truck(plate),
   FOREIGN KEY(truck_type) REFERENCES truck_type(truck_type)
);

CREATE TABLE used(
   id_operation VARCHAR(50),
   plate INT,
   time_stamp timestamp,
   status VARCHAR(50),
   PRIMARY KEY(id_operation, plate),
   FOREIGN KEY(id_operation) REFERENCES operation(id_operation),
   FOREIGN KEY(plate) REFERENCES truck(plate)
);

CREATE TABLE deployed(
   id_operation VARCHAR(50),
   id_firefighter INT,
   plate INT,
   PRIMARY KEY(id_operation, id_firefighter, plate),
   FOREIGN KEY(id_operation) REFERENCES operation(id_operation),
   FOREIGN KEY(id_firefighter) REFERENCES firefighter(id_firefighter),
   FOREIGN KEY(plate) REFERENCES truck(plate)
);

CREATE TABLE linked(
   id_sensor INT,
   id_operation VARCHAR(50),
   PRIMARY KEY(id_sensor, id_operation),
   FOREIGN KEY(id_sensor) REFERENCES sensor(id_sensor),
   FOREIGN KEY(id_operation) REFERENCES operation(id_operation)
);

CREATE TABLE impact(
   id_operation VARCHAR(50),
   id_victim INT,
   PRIMARY KEY(id_operation, id_victim),
   FOREIGN KEY(id_operation) REFERENCES operation(id_operation),
   FOREIGN KEY(id_victim) REFERENCES victim(id_victim)
);
