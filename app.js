const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

const _uri = `mongodb+srv://graphqluser:MgtFP6PhjkEqwupB@cluster0.itbz4.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(_uri)
mongoose.connection.once('open', () => {
    console.log("Connected to database")
})

// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});
