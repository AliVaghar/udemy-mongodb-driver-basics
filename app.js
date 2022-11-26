const MongoClient = require("mongodb").MongoClient;
const assert = require("assert")

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "fruitsDB"

// Create a new MongoClient
const client = new MongoClient(url);

// Connect to Server
client.connect(function(err){
    assert.equal(null, err);
    console.log("Connected Successfully to the Server!")
    const db = client.db(dbName);
    // insertDocument(db, function() {
    //     client.close();
    // });
    findDocuments(db, function() {
        client.close();
    })
});

// Insert Data
const insertDocument =  function(db, callback) {    
    const collection = db.collection("fruits");
    const doc = {name: "Apple", price: 12}
    collection.insertOne(doc, function(err, result) {
        assert.equal(err, null);
        console.log(result)        
        console.log('writing done!')
        callback(result)
    });    
};

// Find Data
const findDocuments = function(db, callback) {
    const collection = db.collection("fruits");
    collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("found the following record:");
        console.log(docs);
        callback(docs);
    });
}
