import { Operation } from "src/operation/operation.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";

@Entity("fire")
export class Fire {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "latitude", type: "double precision", nullable: false })
  latitude: number;

  @Column({ name: "longitude", type: "double precision", nullable: false })
  longitude: number;

  @ManyToMany(() => Operation, (operation) => operation.fires)
  @JoinTable({
    name: "fire_operation",
    joinColumn: {
      name: "id_fire",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "id_operation",
      referencedColumnName: "id",
    },
  })
  operations: Operation[];
}
