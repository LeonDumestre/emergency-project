import { Firefighter } from "src/firefighter/firefighter.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity("fire_station")
export class FireStation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "name", nullable: false })
  name: string;

  @Column({ name: "latitude", type: "double precision", nullable: false })
  latitude: number;

  @Column({ name: "longitude", type: "double precision", nullable: false })
  longitude: number;

  @OneToMany(() => Firefighter, (firefighter) => firefighter.fireStation)
  firefighters: Firefighter[];
}
