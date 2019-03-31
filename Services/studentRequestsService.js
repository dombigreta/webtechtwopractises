function StudentRequestsService(studentRequestDao){

    winston = require('winston');
    md5js = require('md5.js');

    this.logger = winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        defaultMeta: { service: 'user-service' },
        transports: [
            new winston.transports.File({ filename: 'error.log', level: 'error' }),
            new winston.transports.File({ filename: 'combined.log' })
        ]
    })

    if(studentRequestDao != undefined || studentRequestDao != null){
        this.studentRequestDao = studentRequestDao;
    }
    else{
        this.studentRequestDao = require('../DAO/studentRequestsDao');
    }

}


StudentRequestsService.prototype.getAllStudentRequests = function(callback){
    this.studentRequestDao.findStudentRequests({},(data) => {
        this.logger.info(`${data.length} requests were found`);
        callback(data);
    });
}

StudentRequestsService.prototype.getRequestsByStudentId = function(studentId, callback){
    this.studentRequestDao.findStudentRequests({"student.studentId":studentId}, (data) => {
        callback(data);
    })
}

StudentRequestsService.prototype.createStudentRequest = function(request, success){
    request.date = new Date().toUTCString();
    request.sign = new md5js().update(JSON.stringify(request.student)).digest('hex');

    this.studentRequestDao.insertRequest(request,(result) => {
        let message = `Request with the id:${result} was inserted`
        this.logger.info(message);
        success(message);
    });
}

StudentRequestsService.prototype.getCommentableStudentRequests = function(callback){
    this.studentRequestDao.getCommentableStudentRequests((data) => {
        this.logger.info(`${data.length} commentable requests were found`);
        callback(data);
    });
}

module.exports = StudentRequestsService;