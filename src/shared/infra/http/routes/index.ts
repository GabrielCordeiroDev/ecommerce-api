import { Router } from 'express'

import { cartsRoutes } from './carts.routes'
import { ordersRoutes } from './orders.routes'
import { paymentsRoutes } from './payments.routes'
import { productsRoutes } from './products.routes'
import { usersRoutes } from './users.routes'

const router = Router()

router.use('/users', usersRoutes)
router.use('/products', productsRoutes)
router.use('/carts', cartsRoutes)
router.use('/orders', ordersRoutes)
router.use('/payments', paymentsRoutes)

export { router }
