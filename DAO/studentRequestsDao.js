const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const dbName = 'mydb';
const collectionName = 'requests';
const dbUri = process.env.DB_URI || 'mongodb://localhost:27017';

function findStudentRequests(findParams, callback){
    var client = new MongoClient(dbUri);
    client.connect((err) => {
        assert.equal(null,err);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        collection.find(findParams).toArray((err,data) => {
            assert.equal(null,err);
            callback(data);
        });

       client.close();

    })
}

function insertRequest(requestObject, callback){
    var client = MongoClient(dbUri);
    client.connect((err) => {
        assert.equal(null,err);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        collection.insertOne(requestObject)
            .then(result =>callback(result.insertedId))
            .catch(err => console.log(err));

        client.close();
    })
}

function getCommentableStudentRequests(callback){
    var client = MongoClient(dbUri);
    client.connect((err) => {
        assert.equal(null, err);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        collection.find({"comments":{$exists:true}})
            .toArray((err,data) => {
                assert.equal(null,err);
                callback(data);
            });
        client.close();
    });
}


module.exports = {
    findStudentRequests:findStudentRequests,
    insertRequest: insertRequest,
    getCommentableStudentRequests:getCommentableStudentRequests
};