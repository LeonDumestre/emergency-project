import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("captors")
export class Captor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "intensity", type: "int", nullable: false })
  intensity: number;
}
