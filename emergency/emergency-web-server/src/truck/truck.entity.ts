import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { TruckType } from "./truck-type.entity";
import { FireStation } from "src/fire-station/fire-station.entity";
import { Operation } from "src/operation/operation.entity";

@Entity("truck")
export class Truck {
  @PrimaryColumn({ name: "plate", type: "varchar", nullable: false })
  plate: string;

  @Column({ name: "acquisition", type: "date", nullable: false })
  acquisition: Date;

  @ManyToOne(() => TruckType, (type) => type.trucks)
  @JoinColumn({ name: "truck_type" })
  type: TruckType;

  @ManyToOne(() => FireStation, (fireStation) => fireStation.trucks)
  @JoinColumn({ name: "id_fire_station" })
  fireStation: FireStation;

  @ManyToMany(() => Operation, (operation) => operation.trucks)
  @JoinTable({
    name: "operation_firefighter_truck",
    joinColumn: {
      name: "id_truck",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "id_operation",
      referencedColumnName: "id",
    },
  })
  operations: Operation[];
}
