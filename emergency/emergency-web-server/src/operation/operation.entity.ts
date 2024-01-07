import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("fire")
export class Operation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "start_date", type: "timestamp", nullable: false })
  start: Date;

  @Column({ name: "end_date", type: "timestamp", nullable: true })
  end?: Date;
}
