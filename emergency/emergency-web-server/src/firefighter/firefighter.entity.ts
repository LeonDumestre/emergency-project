import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("firefighter")
export class Firefighter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "name", nullable: false })
  name: string;

  @Column({ name: "birthdate", type: "date", nullable: false })
  birthDate: Date;

  @Column({ name: "grade", nullable: false })
  grade: string;

  //@Column({ name: "id_fire_station", nullable: false })
  //fireStationId: FireStation["id"];
}
