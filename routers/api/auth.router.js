const router = require("express").Router();
const authController = require("../../controllers/api/auth.controller");

/**
 * @swagger
 * /log/log:
 *  post:
 *      tags:
 *        - Login
 *      summary: Login
 *      consumes:
 *          - application/json
 *      parameters:
 *        - in: body
 *          name: body
 *          description: Please Login
 *          schema:
 *              type: object
 *              required:
 *                  - username
 *                  - password
 *              properties:
 *                  username:
 *                      type: string
 *                  password:
 *                      type: string
 *      responses:
 *          200:
 *              description: Login Successfully
 *       
*/
router.post("/log", authController.log);

router.post("/signup", authController.signup);

module.exports = router;
