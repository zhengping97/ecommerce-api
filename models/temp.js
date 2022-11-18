import { MongoClient } from 'mongodb';
import {
    ObjectId
} from 'mongodb';

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const agg = [
    {
        '$match': {
            'product': new ObjectId('636f3a1e745231b1f1308629')
        }
    }, {
        '$group': {
            '_id': null,
            'averageRating': {
                '$avg': '$rating'
            },
            'numOfReviews': {
                '$sum': 1
            }
        }
    }
];

const client = await MongoClient.connect(
    '',
    { useNewUrlParser: true, useUnifiedTopology: true }
);
const coll = client.db('').collection('');
const cursor = coll.aggregate(agg);
const result = await cursor.toArray();
await client.close();