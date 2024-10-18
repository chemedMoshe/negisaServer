import { createNewUser, deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/user,controller"
import { Express, Router } from "express"

export  const router:Router = require('express').Router()

router.get('/',getAllUsers )

router.get('/:id',getUserById )

router.post('/',createNewUser)

router.put('/:id',updateUser)

router.delete('/',deleteUser)


export default router

