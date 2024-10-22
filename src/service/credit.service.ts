import mongoose, { plugin } from "mongoose";
import DataLayer from "../DataLayer/dataLayerFile";
import { CreditDB } from "../types/Schema/ctrdit.schema";
import ICreditDTO from "../types/DTO.models/CreditDTO";
import { ICredit } from "../types/interfaces/credit.Interface";
import userService from "./userService";
import { IUser } from "../types/interfaces/user.interface";
export default class CreditService {
    public static checkRequest(newCredit: ICreditDTO, _idCredit: null | mongoose.Types.ObjectId | string = null) {
        {
            const { value, iduser } = newCredit
            if (!value || !iduser) {
                throw ("Credit value and idUser is required")
            }
            if (_idCredit) {
                const { _id } = newCredit
                if (!_id) {
                    throw ("Credit id is required")
                }
                return newCredit
            }
        }
    }

    public static async findCredit(credit: ICreditDTO): Promise<ICredit | null> {
        this.checkRequest(credit)
        const { value, iduser } = credit
        const creditFromDB = await DataLayer.checkIfExist<ICredit>({ iduser, value }, CreditDB)
        return creditFromDB
    }

    public static async createCredit(credit: ICreditDTO): Promise<string> {
        try {
            const { value, iduser } = credit
            console.log(value, iduser);
            this.checkRequest(credit)

            const newCredit = await DataLayer.createItem<ICredit>(credit, CreditDB)

            const userFromDB = await userService.getUserById(credit.iduser)
            userFromDB.sumcredit += credit.value
            userFromDB.historycredits.push(newCredit._id!)
            await userService.updateUser(userFromDB, userFromDB._id as mongoose.Types.ObjectId)
            return "Credit created"
        }
        catch (err) {
            throw Error(`${err}`)
        }
    }

    public static async deleteCredit(credit: ICreditDTO | ICredit): Promise<string> {
        try {
            this.checkRequest(credit)
            const creditFromDB: ICredit | null = await DataLayer.findOneItemById<ICredit>(credit._id!, CreditDB)
            if (!creditFromDB) {
                throw new Error("Credit dosn't exists")
            }
            await DataLayer.deleteItem(creditFromDB, CreditDB)

            const userFromDB = await userService.getUserById(credit.iduser)
            userFromDB.sumcredit -= credit.value
            const indexOfCredit = userFromDB.historycredits.indexOf(creditFromDB._id!)
            userFromDB.historycredits.splice(indexOfCredit, indexOfCredit + 1)
            await userService.updateUser(userFromDB, userFromDB._id as mongoose.Types.ObjectId)
            return "Credit deleted"

        } catch (err) {
            throw new Error(`${err}`)
        }
    }

    public static async updateCredit(credit: ICreditDTO, idCredit: string): Promise<string> {
        this.checkRequest(credit)
        try {
            const ObjId = new mongoose.Types.ObjectId(idCredit)
            const creditFromDB: ICredit | null = await DataLayer.findOneItemById<ICredit>(ObjId, CreditDB)
            if (!creditFromDB) {
                throw new Error("Credit dosn't exists")
            }

            await DataLayer.updateItem<ICredit>(credit, creditFromDB._id!, CreditDB)
            const userFromDB = await userService.getUserById(credit.iduser)
            userFromDB.sumcredit += credit.value - creditFromDB.value
            await userService.updateUser(userFromDB, userFromDB._id as mongoose.Types.ObjectId)

            return "Credit updated"

        } catch (err) {
            throw Error(`${err}`)
        }
    }

    public static async getCreditById(idCredit: string): Promise<ICredit> {
        const ObjId = new mongoose.Types.ObjectId(idCredit)
        try {
            const creditFromDB: ICredit | null = await DataLayer.findOneItemById<ICredit>(ObjId, CreditDB)
            if (!creditFromDB) {
                throw new Error("Credit dosn't exists")
            }
            return creditFromDB
        }
        catch (err) {
            throw new Error(`${err}`)
        }
    }

    public static async getAllCredits() {
        try {
            const creditsFromDB: ICredit[] = await DataLayer.findAllItems<ICredit>(CreditDB)
            return creditsFromDB
        }
        catch (err) {
            throw new Error(`${err}`)
        }
    }
    public static async getCreditByUser(idUser: string): Promise<ICredit[]> {
        try {
            const creditsByUser: ICredit[] | null = await DataLayer.findAllRelevanteItems<ICredit>({iduser:idUser}, CreditDB) as ICredit[] | null
            return creditsByUser ? creditsByUser : []
        }
        catch (err) {
            throw new Error(`${err}`)
        }
    }
}