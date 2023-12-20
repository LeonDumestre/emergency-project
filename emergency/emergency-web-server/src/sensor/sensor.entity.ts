import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("sensor")
export class Sensor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "latitude", type: "double precision", nullable: false })
  latitude: number;

  @Column({ name: "longitude", type: "double precision", nullable: false })
  longitude: number;
}
