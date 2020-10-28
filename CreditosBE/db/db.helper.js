const mysql = require("mysql");

let DataBaseHelper = (function() {

    let instance
    let connection = null
    let result = null

    function init() { //private function to create methods and properties
        console.log('DataBaseHelper Init')

          connection = mysql.createConnection({
              host: 'database-1.c5oq4teyxyp2.us-east-2.rds.amazonaws.com',
              database: 'database-1',
              user: 'admin',
              password: 'admin123',
              port: 1433,
              
          });

          connection.connect(function(error){
            if(error){
               throw error;
            }else{
               console.log('Conexion correcta.');
            }
         });



     
        /**
         * User for Select insert, delete and updates in data base
         * result 1 - the query was succesfull
         */
        let query = async(sql) => {
            try {
                await connection.query('BEGIN')
                let queryResult = await connection.query(`${sql} RETURNING`)
                result = queryResult.rows[0]
                await connection.query('COMMIT')

            } catch (e) {
                await connection.query('ROLLBACK')
                throw e
            }

            return result
        }

        /**
         * User for Select querys in data base,
         */
        let select = async(sql) => {
            try {
                await connection.query('BEGIN')
                result = await connection.query(sql)
                await connection.query('COMMIT')
            } catch (e) {
                await connection.query('ROLLBACK')
                throw e
            }

            return result.rows
        }

        return {
            query: query,
            select: select
        }
    }

    return {
        getInstance: function() {
            if (!instance) {
                instance = init()
            }

            return instance
        }
    }
})()

module.exports = DataBaseHelper;