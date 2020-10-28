const ejData = require('../data/test.data')

class TestController {

    /**
     * Default constructor
     **/
    constructor() {}

    getMsj = async(req, res) => {
        try {
            let result = await ejData.find();   

            let response = {
                body:result[0].Usuario
                
            }

            res.setHeader('Content-Type', 'application/json')
            return res.status(200).send(JSON.stringify(response))
        } catch (e) {
            let error = {
                code: e.code,
                message: e.message
            }

            res.setHeader('Content-Type', 'application/json')
            return res.status(500).send(JSON.stringify(error))
        }
    }

}

module.exports = TestController;