import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { Task } from "./Task";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    user_id: string;

    @OneToMany(() => Task, (task) => task.user, {
        onDelete: "CASCADE"
    })
    tasks: Task[];

    @Column({
        type: "varchar",
        length: 100,
        unique: true
    })
    username: string;

    @Column({
        type: "varchar",
        length: 255
    })
    name: string;

    @Column({
        type: "varchar",
        length: 100,
        unique: true
    })
    email: string;

    @Column({
        type: "varchar",
        length: 100
    })
    password: string;

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date;
}
