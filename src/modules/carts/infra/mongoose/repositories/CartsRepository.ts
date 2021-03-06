import { ICreateCartDTO } from '@modules/carts/dtos/ICreateCartDTO'
import { IUpdateCartDTO } from '@modules/carts/dtos/IUpdateCartDTO'
import { ICartsRepository } from '@modules/carts/repositories/ICartsRepository'
import Cart, { CartDocument } from '../schemas/Cart'

export class CartsRepository implements ICartsRepository {
  async create(data: ICreateCartDTO): Promise<CartDocument> {
    const cart = new Cart(data)
    await cart.save()

    return cart
  }

  async findByIdAndDelete(id: string): Promise<void> {
    await Cart.findOneAndDelete({ _id: id })
  }

  async findUserCart(userId: string): Promise<CartDocument> {
    const cart = await Cart.findOne({ userId })
    return cart
  }

  async findAllCarts(): Promise<CartDocument[]> {
    const carts = await Cart.find()
    return carts
  }

  async findByIdAndUpdate(
    id: string,
    { products }: IUpdateCartDTO
  ): Promise<CartDocument> {
    const cart = await Cart.findOneAndUpdate(
      { _id: id },
      { products },
      { new: true }
    )

    return cart
  }
}
