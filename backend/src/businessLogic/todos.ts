import { TodosAccess } from '../dataLayer/todosAcess'
import { AttachmentUtils } from '../helpers/attachmentUtils';
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
// import * as createError from 'http-errors'

// TODO: Implement businessLogic
const logger = createLogger('TodosAccess')
const attachmentUtils = new AttachmentUtils()
const todosAccess = new TodosAccess()

// get todos function
export async function getTodosForUser(userId: string): Promise<TodoItem[]> {
    logger.info(`Getting todos for user: ${userId}`)
    return await todosAccess.getAllTodos(userId)
}

// create todo function
export async function createTodo(
    newTodo: CreateTodoRequest,
    userId: string
):  Promise<TodoItem>{
    logger.info('Create todo function called')

    const todoId = uuid.v4()
    const createdAt = new Date().toISOString()
    const s3AttachementUrl = attachmentUtils.getAttachmentUrl(todoId)
    const newItem = {
        userId,
        todoId,
        createdAt,
        done: false,
        s3AttachementUrl: s3AttachementUrl,
        ...newTodo
    }
    return await todosAccess.createTodoItem(newItem)
}
// write update todo function
export async function updateTodo(
    userId: string,
    todoId: string,
    todoUpdate: UpdateTodoRequest
): Promise<UpdateTodoRequest> {
    logger.info('Update todo function called')
    return await todosAccess.updateTodoItem(todoId, userId, todoUpdate)
    
}

// write delete function
export async function deleteTodo(
    todoId: string,
    userId: string
): Promise<string>{
    logger.info('Delete function called')
    return todosAccess.deleteTodoItem(todoId, userId)
}

export async function createAttachmentPresignedUrl(
    todoId: string,
    useId: string
): Promise<string> {
    logger.info('Create attachment function called', useId, todoId)
    return attachmentUtils.getUploadUrl(todoId)
    
}  
