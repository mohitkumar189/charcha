const express = require('express');
const router = express.Router();
const Controller = require('./controller');
const apiResponse = require('../../../helpers/apiResponse');

router.route('/')
    .all((req, res, next) => {
        //next();
        return apiResponse.sendJson(req, res, 200);
    })
    .get(Controller.getAll)
    .post(Controller.save)
    .put(Controller.updateAll)
    .patch(Controller.patchUpdateAll)
    .delete(Controller.deleteAll);

module.exports = router;
