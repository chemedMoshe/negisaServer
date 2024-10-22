import { Request,Response } from "express"
import CreditService from "../service/credit.service"

export const createNewCredit = async(req:Request,res:Response) =>{
    try {
        const result = await CreditService.createCredit(req.body)
        res.status(201).send(result)
    }
    catch (err) {   
        res.status(400).send(`${err}`)
    } 
}

export const deleteCredit = async(req:Request,res:Response) => {
    try {
        const result = await CreditService.deleteCredit(req.body)
        res.status(200).send(result)
    }
    catch (err) {   
        res.status(400).send(`${err}`)
    } 
}

export const updateCredit = async(req:Request,res:Response) => {
    try {
        const result = await CreditService.updateCredit(req.body,req.params.id)
        res.status(200).send(result)
    }
    catch (err) {   
        res.status(400).send(`${err}`)
    } 
}

export const getCreditById = async(req:Request,res:Response) => {
    try {
        const result = await CreditService.getCreditById(req.params.id)
        res.status(200).json(result)
    }
    catch (err) {   
        res.status(400).send(`${err}`)
    } 
}

export const getAllCredits = async(req:Request,res:Response) => {
    try {
        const result = await CreditService.getAllCredits()
        res.status(200).json(result)
    }
    catch (err) {   
        res.status(400).send(`${err}`)
    } 
}

export const getCreditesByUser = async(req:Request,res:Response) => {
    try {
        const result = await CreditService.getCreditByUser(req.params.id)
        res.status(200).json(result)
    }
    catch (err) {   
        res.status(400).send(`${err}`)
    } 
}