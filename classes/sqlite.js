import * as SQLite from "expo-sqlite";

export default class Sqlite{
    constructor(db) {
        this.db = SQLite.openDatabase(db)
    }

    async get_all(table){
        return await new Promise((resolve, reject)=>{
            this.db.transaction(transaction => {
                transaction.executeSql("select * from ".concat(table, ";"), null, (t, result)=>resolve(result), (t, error)=>reject(error))
            })
        })
    }

    async exec(sql, args){
        return await new Promise((resolve, reject)=>{
            this.db.transaction(transaction => {
                transaction.executeSql(sql, args, (t, result)=>resolve(result), (t, error)=>reject(error))
            })
        })
    }

    async close(){
        await this.db.closeAsync()
    }
}