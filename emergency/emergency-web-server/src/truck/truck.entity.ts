import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("truck")
export class Truck {
  @PrimaryColumn({ name: "plate", type: "varchar", nullable: false })
  plate: string;

  @Column({ name: "acquisition", type: "date", nullable: false })
  acquisition: Date;

  @Column({ name: "truck_type", type: "varchar", nullable: false })
  type: string;
}
