import { TaskJson } from "../types/task-json";
import { ITask } from "../types/task.interface";

export class TaskModel {
  private readonly _id: string;
  private readonly _title: string;
  private readonly _userId: string;
  private readonly _description: string;
  private readonly _completed: boolean;
  private readonly _createdAt: Date;
  private readonly _updatedAt: Date;

 constructor(
    id: string,
    title: string,
    userId: string,
    description: string,
    completed: boolean,
    createdAt: Date,
    updatedAt: Date
  ) {
    this._id = id;
    this._title = title;
    this._userId = userId;
    this._description = description;
    this._completed = completed;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

    toJSON(): TaskJson {
        return {
        id: this._id,
        title: this._title,
        userId: this._userId,
        description: this._description,
        completed: this._completed,
        createdAt: this._createdAt,
        updatedAt: this._updatedAt
        }
    }

    static hydrate(data: ITask) {
        return new TaskModel(
            String(data.id),
            data.title,
            data.userId,
            data.description,
            data.completed,
            data.createdAt,
            data.updatedAt
        );
    }

}