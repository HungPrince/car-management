import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Injectable } from '@angular/core';

@Injectable()
export class Database {

    public db: SQLiteObject;

    constructor(public sqlLite: SQLite) {

    }

    createDatabase() {
        this.sqlLite.create({
            name: 'car.sqlite.sqlite',
            location: 'default'
        }).then((db: SQLiteObject) => {
            db.executeSql('create table car (name VARCHAR(32))', {})
                .then(() => console.log('Executed sql'))
                .catch(e => console.log(e));
        }).catch(e => console.log(e));
    }
}