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

export const ON_ROAD = "ON_ROAD";
export const ON_SITE = "ON_SITE";
export const ON_RETURN = "ON_RETURN";
type OperationStatus = typeof ON_ROAD | typeof ON_SITE | typeof ON_RETURN;

export type OperationInput = {
  start?: Date;
  end?: Date;
  status?: OperationStatus;
  fire?: Fire;
  firefighters?: Firefighter[];
  trucks?: Truck[];
};

@Entity("operation")
export class Operation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "start_date", type: "timestamp", nullable: false })
  start: Date;

  @Column({
    name: "status",
    enum: [ON_ROAD, ON_SITE, ON_RETURN],
    nullable: false,
  })
  status: OperationStatus;

  @OneToOne(() => Fire, (fire) => fire.operation)
  @JoinColumn({ name: "id_fire" })
  fire: Fire;

  @OneToMany(() => Firefighter, (firefighter) => firefighter.operation)
  firefighters: Firefighter[];

  @OneToMany(() => Truck, (truck) => truck.operation)
  trucks: Truck[];
}
