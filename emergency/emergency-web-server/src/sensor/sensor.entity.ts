import { Operation } from "src/operation/operation.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";

@Entity("sensor")
export class Sensor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "latitude", type: "double precision", nullable: false })
  latitude: number;

  @Column({ name: "longitude", type: "double precision", nullable: false })
  longitude: number;

  @ManyToMany(() => Operation, (operation) => operation.sensors)
  @JoinTable({
    name: "operation_sensor",
    joinColumn: {
      name: "id_sensor",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "id_operation",
      referencedColumnName: "id",
    },
  })
  operations: Operation[];
}
