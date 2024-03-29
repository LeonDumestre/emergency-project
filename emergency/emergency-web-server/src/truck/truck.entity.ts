import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { TruckType } from "./truck-type.entity";
import { FireStation } from "src/fire-station/fire-station.entity";
import { Operation } from "src/operation/operation.entity";

@Entity("truck")
export class Truck {
  @PrimaryColumn({
    name: "plate",
    type: "varchar",
    length: 20,
    nullable: false,
  })
  plate: string;

  @Column({ name: "acquisition", type: "date", nullable: false })
  acquisition: Date;

  @ManyToOne(() => TruckType, (type) => type.trucks)
  @JoinColumn({ name: "truck_type" })
  type: TruckType;

  @ManyToOne(() => FireStation, (fireStation) => fireStation.trucks)
  @JoinColumn({ name: "id_fire_station" })
  fireStation: FireStation;

  @ManyToOne(() => Operation, (operation) => operation.trucks)
  @JoinColumn({ name: "id_operation" })
  operation: Operation;
}
