import { createNewCredit, deleteCredit, getAllCredits, getCreditById, updateCredit, getCreditesByUser } from "../controllers/credit.controller"
import {  Router } from "express"

export  const router:Router = require('express').Router()

router.get('/',getAllCredits )

router.get('/:id',getCreditById )

router.get('/byuser/:id',getCreditesByUser )

router.post('/',createNewCredit)

router.put('/:id',updateCredit)

router.delete('/',deleteCredit)


export default router

