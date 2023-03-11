import { TodosAccess } from './todosAcess'
import { AttachmentUtils } from './attachmentUtils';
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
import * as createError from 'http-errors'

// TODO: Implement businessLogic
const logger = createLogger('TodosAccess')
const attachmentUtils = new AttachmentUtils()
const todoAccess = new TodosAccess()

// create todo function
export async function createTodo(
    newTodo: CreateTodoRequest,
    userId: string
):  Promise<TodoItem>{
    logger.info('Create todo function called')

    const todoId = uuid.v4()
    const createdAt = new Date().toISOString()
    const newItem = {
    userId,
    todoId,
    createdAt,
    done: false,
    ...newTodo
    }
    return await todoAccess.createTodoItem(newItem)
}

  
