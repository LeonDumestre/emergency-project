import { Fire } from "src/fire/fire.entity";
import { Firefighter } from "src/firefighter/firefighter.entity";
import { Sensor } from "src/sensor/sensor.entity";
import { Truck } from "src/truck/truck.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";

@Entity("fire")
export class Operation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "start_date", type: "timestamp", nullable: false })
  start: Date;

  @Column({ name: "end_date", type: "timestamp", nullable: true })
  end?: Date;

  @ManyToMany(() => Fire, (fire) => fire.operations)
  @JoinTable({
    name: "fire_operation",
    joinColumn: {
      name: "id_operation",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "id_fire",
      referencedColumnName: "id",
    },
  })
  fires: Fire[];

  @ManyToMany(() => Firefighter, (firefighter) => firefighter.operations)
  @JoinTable({
    name: "operation_firefighter_truck",
    joinColumn: {
      name: "id_operation",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "id_firefighter",
      referencedColumnName: "id",
    },
  })
  firefighters: Firefighter[];

  @ManyToMany(() => Truck, (truck) => truck.operations)
  @JoinTable({
    name: "operation_firefighter_truck",
    joinColumn: {
      name: "id_operation",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "plate",
      referencedColumnName: "plate",
    },
  })
  trucks: Truck[];

  @ManyToMany(() => Sensor, (sensor) => sensor.operations)
  @JoinTable({
    name: "operation_sensor",
    joinColumn: {
      name: "id_operation",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "id_sensor",
      referencedColumnName: "id",
    },
  })
  sensors: Sensor[];
}
