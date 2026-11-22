const router = require('express').Router();

const {createDept, getAllDept, getOneDept, updateDept, deleteDept} = require('../controllers/departmentController')

const {departmentValidator}= require('../middleware/validation')

router.post('/createdept', departmentValidator, createDept);
router.get('/getalldept', getAllDept);
router.get('/getonedept/:id', getOneDept);
router.patch('/updatedept/:id', departmentValidator, updateDept);
router.delete('/deletedept/:id', deleteDept)




module.exports = router