const express = require('express');
const mongoose = require('mongoose')
const schema = require('./schema')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();

const { ApolloServer } = require('apollo-server-express')
const url = "mongodb://localhost:27017/moviesdb"

const connect = mongoose.connect(url,{useNewUrlParser: true});
connect.then((db) => {
    console.log('Connected correctly to server!')
}, 
(err)=> {
    console.log(err)
});

const server = new ApolloServer({
    typeDefs: schema.typeDefs,
    resolvers: schema.resolvers
})

app.use(bodyParser.json())
app.use('*',cors())
server.applyMiddleware({app: app});

app.listen({port: 4000},() => {
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
});