const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book')
const Author = require('../models/author')

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList, GraphQLInt } = graphql;

// dummy data
let books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorid: 1 },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorid: 2 },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorid: 1 },
    { name: 'The Fat Cow', genre: 'Sci-Fi', id: '4', authorid: 3 },
];

let author = [
    {
        name: 'Mujeeb Alabi',
        age: 40,
        id: 1
    },
    {
        name: 'Adio Ayokunle',
        age: 43,
        id: 2
    }
    ,
    {
        name: 'Adio Biodun',
        age: 55,
        id: 3
    }
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {

            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        id: { type: GraphQLID },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {

            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get data from db / other source
                // return _.find(books, { id: args.id });
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // return _.find(author, { id: args.id })
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve() {
                // return books
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: GraphQLString },
                age: { type: GraphQLInt}
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age
                })

                return author.save()
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: {type: GraphQLString},
                genre: {type: GraphQLString},
                authorId: {type: GraphQLID}
            },   
            resolve(parent, args) {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                })

                return book.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
