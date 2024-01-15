import { Operation } from "src/operation/operation.entity";
import { Entity, Column, OneToOne, JoinColumn, PrimaryColumn } from "typeorm";

@Entity("fire")
export class Fire {
  @PrimaryColumn({ name: "id", type: "int", nullable: false })
  id: number;

  @Column({ name: "latitude", type: "double precision", nullable: false })
  latitude: number;

  @Column({ name: "longitude", type: "double precision", nullable: false })
  longitude: number;

  @Column({ name: "intensity", type: "int", nullable: false })
  intensity: number;

  @OneToOne(() => Operation, (operation) => operation.fire)
  @JoinColumn({ name: "id" })
  operation: Operation;
}
