import { FireStation } from "src/fire-station/fire-station.entity";
import { Operation } from "src/operation/operation.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
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

  @ManyToMany(() => Operation, (operation) => operation.firefighters)
  @JoinTable({
    name: "operation_firefighter_truck",
    joinColumn: {
      name: "id_firefighter",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "id_operation",
      referencedColumnName: "id",
    },
  })
  operations: Operation[];
}
