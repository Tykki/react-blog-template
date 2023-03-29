import fs from 'fs'
import path from 'path'
import admin from 'firebase-admin'
import express from 'express'
import 'dotenv/config'
import {db, connectToDB} from './db.js'

import {fileURLToPath} from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const creds = JSON.parse(fs.readFileSync('./creds.json'))
admin.initializeApp({
    credential: admin.credential.cert(creds)
})

const app = express()
const port = process.env.PORT || 8000 
app.use(express.json())
app.use(express.static(path.join(__dirname, '../dist')))

app.get(/^(?!\/api).+/, (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.use(async (req, res, next) =>{
    const {authtoken} = req.headers

    authtoken
        ? req.user = await admin.auth().verifyIdToken(authtoken).catch(() => {return res.sendStatus(400)})
        : false
        req.user = req.user || {}
    next()
})

app.get('/api/articles/:name', async (req, res) => {
    const {name} = req.params
    const {uid} = req.user

    const article = await db.collection('articles').findOne({name})
    if (article) {
        const upvoteIds = article.upvoteIds || []
        article.canUpvote = uid && !upvoteIds.includes(uid)
        res.json(article)
    } else {
        res.sendStatus(404)
    }
})

app.use((req, res, next) =>{
    req.user ? next() : res.sendStatus(401)
})

app.put('/api/articles/:name/upvote', async (req, res) => {
    const {name} = req.params
    const {uid} = req.user
    
    const article = await db.collection('articles').findOne({name})
    if (article) {
        const upvoteIds = article.upvoteIds || []
        const canUpvote = uid && !upvoteIds.includes(uid)
        if (canUpvote) {
            await db.collection('articles').updateOne({name}, {
                $inc: { upvotes: 1 },
                $push: {upvoteIds: uid }
            })
            
        }
    const updatedArticle = await db.collection('articles').findOne({name})
    res.json(updatedArticle)

    } else {
        res.send('Article Does Not Exist')
    }
    
})

app.post('/api/articles/:name/comments', async (req, res) => {
    const {name} = req.params
    const {text} = req.body
    const {email}= req.user

    await db.collection('articles').updateOne({name}, {
        $push: { comments: {postedBy: email, text} }
    })
    const article = await db.collection('articles').findOne({name})

    article ?
    res.json(article):
    res.send('Article does not exist')
})

connectToDB(()=>{
    console.log('Connected to DB')
    app.listen(port, () => {
        console.log(`Server is listining on port: ${port}`)
    })

})