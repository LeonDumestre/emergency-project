import { FireStation } from "src/fire-station/fire-station.entity";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("fire_fighter")
export class Firefighter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "name", nullable: false })
  name: string;

  @Column({ name: "birthdate", type: "date", nullable: false })
  birthDate: Date;

  @Column({ name: "grade", nullable: false })
  grade: string;

  @Column({ name: "id_fire_station", nullable: false })
  fireStationId: FireStation["id"];
}
