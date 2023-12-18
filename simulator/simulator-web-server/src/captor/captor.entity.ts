import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("captor")
export class Captor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "latitude", type: "double", nullable: false })
  latitude: number;

  @Column({ name: "longitude", type: "double", nullable: false })
  longitude: number;
}
