const sinon = require('sinon');
const assert = require('assert');
const service = require('../Services/studentRequestsService');

describe('Student service request test', () => {
    it('getAllStudentRequests works as expected on local mongo db', () => {
       var serviceMock = new service();
        serviceMock.getAllStudentRequests((data) => assert.notEqual(data,null));
    });

    it('getAllStudentRequests works as expected with mocked data', () => {
        const testData = 'mockdata';
        const dao = {
            findStudentRequests: function ({}, callback) {
                return callback({data: testData});
            }
        }
        var serviceMock = new service(dao);
        serviceMock.getAllStudentRequests((data) => assert.equal(data.data,testData, 'Data.data should equal mockdata'));
    })
    it('getAllStudentRequests behaves as expected', () => {
        var dao = {findStudentRequests:function({},callback){callback();}}
        var daoMock = sinon.mock(dao);
        daoMock.expects('findStudentRequests').once();
        var serviceMock = new service(dao);
        serviceMock.getAllStudentRequests((data) => {});
        console.log(daoMock.verify());
    });
});