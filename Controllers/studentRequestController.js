const srs = require('../Services/studentRequestsService');
const app = require('express');
const router = app.Router();

const studentService = new srs();

router.get('/',(req,res) => {
    if(req.query['studentId'] !== undefined){
        studentService.getRequestsByStudentId(req.query['studentId'],(data) => {
            res.status(200).send(data);
        })
    }
    else{
        studentService.getAllStudentRequests(data => {
            res.status(200).send(data)
        });
    }
});

router.get('/getCommentableStudentRequests',(req,res) => {
    studentService.getCommentableStudentRequests(data => {
        res.status(200).send(data);
    })
})
router.post('/createRequest',(req,res) => {
    if(!validateStudentRequestObject(req.body) || req.body.errors !== undefined && req.body.errors.length > 0) {
        res.status(400).send(req.body.errors.reduce((acc,curr) => acc + ' - ' + curr));
        return;
    }
    studentService.createStudentRequest(
        {student:req.body['student'], desc:req.body['desc']},
        (message) => res.status(200).send(message));
});



function validateStudentRequestObject(obj){
    let isValid = true;
    obj.errors = [];
    if(obj['student'] === undefined){
        isValid = false;
        obj.errors.push('a student must be defined');
        return isValid;
    }

    if(obj['student']['name'] === undefined || obj['student']['name'].length === 0  || obj['student']['name'] === ''){
        isValid = false;
        obj.errors.push('Student name must be filled');
    }

    if(obj['student']['studentId'] === undefined || obj['student']['studentId'].length === 0  || obj['student']['studentId'] === ''){
        isValid = false;
        obj.errors.push('StudentId must be filled')
    }

    if(obj['student']['programme'] === undefined || obj['student']['programme'].length === 0  || obj['student']['programme'] === ''){
        isValid = false;
        obj.errors.push('Programme must be filled')
    }

    if(obj['desc'] === undefined || obj['desc'].length === 0  || obj['desc'] === ''){
        isValid = false;
        obj.errors.push('Desc must be filled')
    }

    return isValid;

}
module.exports = router;