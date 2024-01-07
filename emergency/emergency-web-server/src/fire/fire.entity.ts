import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("fire")
export class Fire {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "latitude", type: "double precision", nullable: false })
  latitude: number;

  @Column({ name: "longitude", type: "double precision", nullable: false })
  longitude: number;
}
