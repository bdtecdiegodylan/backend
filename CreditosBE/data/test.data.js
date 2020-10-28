const dbHelper = require('../db/db.helper').getInstance()

find = async() => {

    try {
        let result = await dbHelper.select(`
            SELECT 
                Usuario 
            FROM  
                dbo.Usuario
           
        `)

        return result

    } catch (e) {
        // Mandamos el log del error, para luego poder guardarlo
        console.log("error find: " + e)

        // Siempre mandemos el error 
        throw e
    }
}

module.exports = {
    find
};