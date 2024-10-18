import mongoose from "mongoose";
import DataLayer from "../DataLayer/dataLayerFile";
import IUserDTO from "../types/DTO.models/UserDTO";
import { IUser } from "../types/interfaces/user.interface";
import { UserDB } from "../types/Schema/userSchema";

export default class UserService {
    public static checkResquest(user: IUserDTO) {
        const { username, personalnumber } = user
        if (!username || !personalnumber) {
            throw  ("Username and personal number are required")
        }
        return user
    }

    public static async findUser(user: IUserDTO): Promise<IUser | null> {
        this.checkResquest(user)
        const { username, personalnumber } = user
        const userFromDB = await DataLayer.checkIfExist<IUser>({ username, personalnumber }, UserDB)
        return userFromDB
    }

    public static async createUser(user: IUserDTO):Promise<string> {
        try {
            this.checkResquest(user)
            if ((await this.findUser(user))) {
                throw  ("User already exists")
            }
            await DataLayer.createItem<IUser>(user, UserDB)
            return "User created"
        }
        catch (err) {
            throw  Error(`${err}`)
        }
    }

    public static async deleteUser(user: IUserDTO) :Promise<string> {
        this.checkResquest(user)
        try {
            const userFromDB: IUser | null = await this.findUser(user)
            if (!userFromDB) {
                throw new Error("User dosn't exists")
            }
            await DataLayer.deleteItem(user, UserDB)
            return "User deleted"

        } catch (err) {
            throw new Error(`${err}`)
        }
    }

    public static async updateUser(user: IUserDTO, idUser: string):Promise<string> {
        this.checkResquest(user)
        try {
            const ObjId = new mongoose.Types.ObjectId(idUser)
            const userFromDB: IUser | null = await DataLayer.findItemById<IUser>(ObjId, UserDB)
            if (!userFromDB) {
                throw new Error("User dosn't exists")
            }
            await DataLayer.updateItem<IUser>(user, userFromDB._id!, UserDB)
            return "User updated"

        } catch (err) {
            throw  Error(`${err}`)
        }
    }

    public static async getUserById(idUser: string): Promise<IUser> {
        const ObjId = new mongoose.Types.ObjectId(idUser)
        try {
            const userFromDB: IUser | null = await DataLayer.findItemById<IUser>(ObjId, UserDB)
            if (!userFromDB) {
                throw new Error("User dosn't exists")
            }
            return userFromDB
        }
        catch (err) {
            throw new Error(`${err}`)
        }
    }

    public static async getAllUsers() {
        try {
            const usersFromDB: IUser[] = await DataLayer.findAllItems<IUser>(UserDB)
            return usersFromDB
        }
        catch (err) {
            throw new Error(`${err}`)
        }
    }
}