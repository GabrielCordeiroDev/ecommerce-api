import { ICreateOrderDTO } from '@modules/orders/dtos/ICreateOrderDTO'
import Order, {
  OrderDocument
} from '@modules/orders/infra/mongoose/schemas/Order'
import { IMonthlyIncome } from '@modules/orders/useCases/getMonthlyIncome/GetMonthlyIncomeUseCase'
import { IOrdersRepository } from '../IOrdersRepository'

export class OrdersRepositoryInMemory implements IOrdersRepository {
  orders: OrderDocument[] = []

  async create(data: ICreateOrderDTO): Promise<OrderDocument> {
    const order = new Order(data)
    this.orders.push(order)

    return order
  }

  async findByIdAndUpdate(
    id: string,
    { userId, products, amount, address, status }: ICreateOrderDTO
  ): Promise<OrderDocument> {
    const order = this.orders.find(order => order._id === id)
    Object.assign(order, { userId, products, amount, address, status })

    return order
  }

  async findByIdAndDelete(id: string): Promise<void> {
    this.orders = this.orders.map(order => {
      if (order._id !== id) return order
      return null
    })
  }

  async findUserOrders(userId: string): Promise<OrderDocument[]> {
    const orders = this.orders.filter(order => {
      if (order.userId.toString() === userId) return order
      return null
    })

    return orders
  }

  async findAllOrders(): Promise<OrderDocument[]> {
    return this.orders
  }

  async getMonthlyIncome(): Promise<IMonthlyIncome[]> {
    let total = 0
    this.orders.forEach(order => {
      total += order.amount
    })

    const month = new Date().getMonth()

    return [{ _id: month + 1, total }]
  }
}
