import { Body } from 'tsoa';
import { Inject } from 'typescript-ioc';
import { DELETE, GET, Path, PathParam, POST, PUT } from 'typescript-rest';
import { Todo } from './dto/todo.interface';

import { TodoService } from './todo.service';


@Path('/todo')
export class TodoController {
   // Property injection.
   @Inject
   private todoService: TodoService;

   @Path('/')
   @GET
   public getAll() {
      return this.todoService.getAll();
   }

   @Path(':id')
   @GET
   public getById(@PathParam('id') id: string) {
      return this.todoService.getById(id);
   }

   @Path('/')
   @POST
   public create(@Body() todo: Todo) {
      return this.todoService.create(todo);
   }

   @Path(':id')
   @PUT
   public update(@PathParam('id') id: string, @Body() todo: Todo) {
      return this.todoService.update(id, todo);
   }

   @Path(':id')
   @DELETE
   public delete(@PathParam('id') id: string) {
      return this.todoService.delete(id);
   }
}
