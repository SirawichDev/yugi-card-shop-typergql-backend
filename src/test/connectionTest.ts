import { createConnection } from "typeorm"

export const connectionTest =  (isDrop: boolean = false) => {
    return createConnection({
        "type": "postgres",
        "name": "default",
        "host": "localhost",
        "port": 5432,
        "username": "postgres",
        "password": "postgres",
        "database": "yugi-collection-test",
        "dropSchema": isDrop,
        "synchronize": isDrop,
        "entities": ["/../src/entity/*.*"]
   
    })
}