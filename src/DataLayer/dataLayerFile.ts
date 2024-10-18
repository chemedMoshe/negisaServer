import mongoose from "mongoose";
import { UserDB, userSchema } from "../types/Schema/userSchema";
import IUserDTO from "../types/DTO.models/UserDTO";

export default class DataLayer {
    public static checkIfExist = async<T>(item: IUserDTO, category: mongoose.Model<T>): Promise<T | null> => {

        return await category.findOne(item)
    }

    public static findItemById = async<T>(id: mongoose.Types.ObjectId, category: mongoose.Model<T>): Promise<T | null> => {
        return await category.findById(id)
    }
    public static createItem = async<T>(item: IUserDTO, category: mongoose.Model<T>): Promise<void> => {
        try {
            const newItem = new category(item)
            await newItem.save()
        } catch (error) {
            throw new Error(`${error}`)
        }
    }
   
   
    public static deleteItem = async<T>(item: IUserDTO, category: mongoose.Model<T>): Promise<void> => {
        try {
            await category.deleteOne(item)
        }
        catch (error) {
            throw new Error(`${error}`)
        }
    }

    public static updateItem = async<T>(itemUpdated: IUserDTO,id:mongoose.Types.ObjectId, category: mongoose.Model<T>): Promise<void> => {
        try {
            await category.updateOne({_id:id}, itemUpdated)
        }
        catch (error) {
            throw new Error(`${error}`)
        }
    }

    public static findAllItems = async<T>(category: mongoose.Model<T>): Promise<T[]> => {
        try {
            return await category.find({})
        }
        catch (error) {
            throw new Error(`${error}`)
        }
    }
}