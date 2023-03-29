import {MongoClient} from 'mongodb'
let db

const connectToDB = async (cb) => {
    const client = new MongoClient(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@blog-db.zrrisd4.mongodb.net/?retryWrites=true&w=majority`)
    await client.connect()
    db = client.db('blog-db') // use blog-db
    cb()
}

export { db, connectToDB }