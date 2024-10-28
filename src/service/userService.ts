import mongoose from "mongoose";
import DataLayer from "../DataLayer/dataLayerFile";
import IUserDTO from "../types/DTO.models/UserDTO";
import { IUser } from "../types/interfaces/user.interface";
import { UserDB } from "../types/Schema/userSchema";
import ISearchDTO from "../types/DTO.models/searchDTO";

export default class UserService {
    public static checkResquest(user: IUserDTO) {
        const { username, personalnumber } = user
        if (!username || !personalnumber) {
            throw ("היי.. שמנו לב שלא מלאת את כל הפרטים ההכרחיים")
        }
        return user
    }

    public static async findUser(user: IUserDTO): Promise<IUser | null> {
        this.checkResquest(user)
        const { personalnumber } = user
        const userFromDB = await DataLayer.checkIfExist<IUser>( personalnumber , UserDB)
       
        return userFromDB
    }

    public static async createUser(user: IUserDTO): Promise<{ message: string, user: IUserDTO }> {
        try {
            this.checkResquest(user)
            if ((await this.findUser(user))) {
                throw ("המספר כבר קיים במערכת")
            }
            await DataLayer.createItem<IUser>(user, UserDB)
            return {message:"User created",user}
        }
        catch (err) {
            throw Error(`${err}`)
        }
    }

    public static async deleteUser(user: IUserDTO): Promise<{err:boolean,message:string}> {
        this.checkResquest(user)
        try {
            const userFromDB: IUser | null = await this.findUser(user)
            if (!userFromDB) {
                throw new Error("סועד לא קיים במערכת")
            }
            await DataLayer.deleteItem(user, UserDB)
            return {err:false,message:`סועד ${user.username} נמחק בהצלחה`}

        } catch (err) {
            throw new Error(`${err}`)
        }
    }

    public static async updateUser(user: IUserDTO | IUser, idUser: string | mongoose.Types.ObjectId): Promise<string> {
        try {
            const ObjId = new mongoose.Types.ObjectId(idUser)
            const userFromDB: IUser | null = await DataLayer.findOneItemById<IUser>(ObjId, UserDB)
            if (!userFromDB) {
                throw new Error("User dosn't exists")
            }
            const phoneExist:IUser|null = await DataLayer.checkIfExist<IUser>(user.personalnumber, UserDB)
            
            if (phoneExist && phoneExist._id!.toString()! != userFromDB._id!.toString()) {
                throw ("מספר הטלפון כבר קיים במערכת")
            }
            await DataLayer.updateItem<IUser>(user, userFromDB._id! as mongoose.Types.ObjectId, UserDB)
            return "User updated"

        } catch (err) {
            throw Error(`${err}`)
        }
    }

    public static async getUserById(idUser: string | mongoose.Types.ObjectId): Promise<IUser> {
        const ObjId = new mongoose.Types.ObjectId(idUser)
        try {
            const userFromDB: IUser | null = await DataLayer.findOneItemById<IUser>(ObjId, UserDB)
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

    public static async searchUser(user: ISearchDTO) {
        try {
            
            const userFromDB: IUser[] = await DataLayer.searchItems<IUser>(UserDB, "username", user.username)
            return userFromDB||[]
        }
        catch (err) {
            throw (`${err}`)
        }
    }
}