import mongoose from "mongoose";
import { UserDB, userSchema } from "../types/Schema/userSchema";
import IUserDTO from "../types/DTO.models/UserDTO";
import { ICredit } from "../types/interfaces/credit.Interface";
import ICreditDTO from "../types/DTO.models/CreditDTO";
import { IUser } from "../types/interfaces/user.interface";

export default class DataLayer {
    public static checkIfExist = async<T>(item: string | ICreditDTO, category: mongoose.Model<T>): Promise<T | null> => {

        return await category.findOne({
            personalnumber:item
            })
    }

    public static findOneItemById = async<T>(id: mongoose.Types.ObjectId | string, category: mongoose.Model<T>): Promise<T | null> => {
        return await category.findById(id)
    }

    public static findAllRelevanteItems = async<T>(properties: unknown, category: mongoose.Model<T>): Promise<unknown[]> => {
        return await category.find(properties as Object)
    }
    public static createItem = async<T>(item: IUserDTO | ICreditDTO, category: mongoose.Model<T>): Promise<T> => {
        try {
            const newItem = new category(item)
            await newItem.save()
            return newItem
        } catch (error) {
            throw new Error(`${error}`)
        }
    }


    public static deleteItem = async<T>(item: IUserDTO | ICreditDTO, category: mongoose.Model<T>): Promise<void> => {
        try {
            await category.deleteOne(item)
        }
        catch (error) {
            throw new Error(`${error}`)
        }
    }

    public static updateItem = async<T>(itemUpdated: IUserDTO | ICreditDTO|IUser|ICredit, id: mongoose.Types.ObjectId, category: mongoose.Model<T>): Promise<void> => {
        try {
            await category.updateOne({ _id: id }, itemUpdated)
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