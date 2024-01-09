import { Fire } from "src/fire/fire.entity";
import { Firefighter } from "src/firefighter/firefighter.entity";
import { Truck } from "src/truck/truck.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToMany,
  OneToOne,
} from "typeorm";

@Entity("operation")
export class Operation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "start_date", type: "timestamp", nullable: false })
  start: Date;

  @Column({ name: "end_date", type: "timestamp", nullable: true })
  end?: Date;

  @OneToOne(() => Fire, (fire) => fire.operation)
  @JoinColumn({ name: "id_fire" })
  fire: Fire;

  @OneToMany(() => Firefighter, (firefighter) => firefighter.operation)
  firefighters: Firefighter[];

  @OneToMany(() => Truck, (truck) => truck.operation)
  trucks: Truck[];
}
