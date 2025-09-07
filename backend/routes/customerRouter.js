import express from 'express'
import { createCustomer, deleteCustomer, editCustomer, getAllCustomers } from '../controllers/customerController.js'
import { isLogged } from '../middleware/auth.js'
const router = express.Router()

router.get('/', getAllCustomers)
router.post('/create',isLogged, createCustomer)
router.patch('/edit/:id',isLogged, editCustomer)
router.delete('/delete/:id', isLogged, deleteCustomer)

export default router
