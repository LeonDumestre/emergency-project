import { FireStation } from "src/fire-station/fire-station.entity";
import { Operation } from "src/operation/operation.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";

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

  @ManyToOne(() => FireStation, (fireStation) => fireStation.firefighters)
  @JoinColumn({ name: "id_fire_station" })
  fireStation: FireStation;

  @ManyToOne(() => Operation, (operation) => operation.firefighters)
  @JoinColumn({ name: "id_operation" })
  operation: Operation;
}
