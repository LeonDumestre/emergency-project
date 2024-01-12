import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("fire")
export class Fire {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "latitude", type: "double", nullable: false })
  latitude: number;

  @Column({ name: "longitude", type: "double", nullable: false })
  longitude: number;

  @Column({ name: "intensity", type: "int", nullable: true })
  intensity: number;

  @Column({ name: "triggerAt", type: "date", nullable: false })
  triggerAt: Date;
}
