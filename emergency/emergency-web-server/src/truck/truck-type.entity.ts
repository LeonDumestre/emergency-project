import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { Truck } from "./truck.entity";

@Entity("truck_type")
export class TruckType {
  @PrimaryColumn({ name: "truck_type", type: "varchar", nullable: false })
  type: string;

  @Column({ name: "capacity", type: "int", nullable: false })
  capacity: Date;

  @OneToMany(() => Truck, (truck) => truck.type)
  trucks: Truck[];
}
