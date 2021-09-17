import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { AuthenticateUserUseCase } from './authenticateUserUseCase'

export class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase)

    const response = await authenticateUserUseCase.execute({ email, password })

    return res.json(response)
  }
}
