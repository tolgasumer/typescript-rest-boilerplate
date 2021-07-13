import { getRepository } from "typeorm";
import { Todo } from "./dto/todo.interface";
import { TodoEntity } from "./todo.entity";

/**
 * To be directly injected.
 */
export class TodoService {
  public getAll(): Promise<Array<TodoEntity>> {
    return getRepository(TodoEntity).find();
  }

  public getById(id: string): Promise<TodoEntity> {
    return getRepository(TodoEntity).findOne(id);
  }

  public create(todo: Todo): Promise<any> {
    return getRepository(TodoEntity).save(todo);
  }

  public update(id: string, todo: Todo): Promise<any> {
    return getRepository(TodoEntity).update(id, todo);
  }

  public delete(id: string): Promise<any> {
    return getRepository(TodoEntity).delete(id);
  }
}
