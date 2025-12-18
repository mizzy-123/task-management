import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import { User } from "./User";

export enum TaskStatus {
    TODO = "To Do",
    IN_PROGRESS = "In Progress",
    DONE = "Done"
}

@Entity()
export class Task {
    @PrimaryGeneratedColumn("uuid")
    task_id: string;

    @ManyToOne(() => User, (user) => user.tasks)
    @JoinColumn({ name: "user_id" })
    user: User;

    @Column()
    user_id: string;

    @Column({
        type: "varchar",
        length: 255
    })
    title: string;

    @Column({
        type: "text"
    })
    description: string;

    @Column({
        type: "enum",
        enum: TaskStatus,
        default: TaskStatus.TODO
    })
    status: TaskStatus;

    @Column({
        type: "datetime",
        nullable: true
    })
    deadline: Date | null;

    @Column({
        type: "varchar",
        length: 255
    })
    created_by: string;

    @CreateDateColumn()
    created_at: Date;
}
