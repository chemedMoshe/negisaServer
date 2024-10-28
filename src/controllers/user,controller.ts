import { Request,Response } from "express"
import UserService from "../service/userService"
import { mongo, MongooseError } from "mongoose";

export const createNewUser = async(req:Request,res:Response) =>{
    try {
        const result = await UserService.createUser(req.body)
        res.status(201).json({err:false,result})
    }
    catch (err) {  
        
        res.status(400).json({err:true,result:{message:`${err}`}})
    } 
}

export const deleteUser = async(req:Request,res:Response) => {
    try {
        const result = await UserService.deleteUser(req.body)
        res.status(200).json(result)
    }
    catch (err) {  
        res.status(400).json({err:true,message:`${err}`})
    } 
}

export const updateUser = async(req:Request,res:Response) => {
    try {
        const result = await UserService.updateUser(req.body,req.params.id)
        res.status(200).json({err:false,result})
    }
    catch (err) {   
        res.status(400).json({err:true,message:`${err}`})
    } 
}

export const getUserById = async(req:Request,res:Response) => {
    try {
        const result = await UserService.getUserById(req.body)
        res.status(200).json(result)
    }
    catch (err) {   
        res.status(400).send(`${err}`)
    } 
}

export const getAllUsers = async(req:Request,res:Response) => {
    try {
        const result = await UserService.getAllUsers()
        res.status(200).json(result)
    }
    catch (err) {   
        res.status(400).send(`${err}`)
    } 
}

export const searchUser = async(req:Request,res:Response) => {
    try {
        const result = await UserService.searchUser(req.body)
        res.status(200).json({err:false,result})
    }
    catch (err) {   
        res.status(400).json({err:true,message:`${err}`})
    } 
}