const Pool = require('pg').Pool

let DataBaseHelper = (function() {

    let instance
    let pool = null
    let result = null

    function init() { //private function to create methods and properties
        console.log('DataBaseHelper Init')

          pool = new Pool({
              host: 'database-1.c5oq4teyxyp2.us-east-2.rds.amazonaws.com',
              database: 'database-1',
              user: 'admin',
              password: 'admin123',
              port: 1433,
              max: 25 // max number of clients in the pool
          })
     
        /**
         * User for Select insert, delete and updates in data base
         * result 1 - the query was succesfull
         */
        let query = async(sql) => {
            try {
                await pool.query('BEGIN')
                let queryResult = await pool.query(`${sql} RETURNING`)
                result = queryResult.rows[0]
                await pool.query('COMMIT')

            } catch (e) {
                await pool.query('ROLLBACK')
                throw e
            }

            return result
        }

        /**
         * User for Select querys in data base,
         */
        let select = async(sql) => {
            try {
                await pool.query('BEGIN')
                result = await pool.query(sql)
                await pool.query('COMMIT')
            } catch (e) {
                await pool.query('ROLLBACK')
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