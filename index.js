import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

// data
import db from './db.js'

// types
import { typeDefs } from './schema.js'

// resolvers
const resolvers = {
    Query: {
        games() {
            return db.games
        },
        authors() {
            return db.authors
        },
        reviews() {
            return db.reviews
        },
        review(parent, args, context) {
            return db.reviews.find((review) => review.id === args.reviewId);
        },
        game(parent, args, context) {
            return db.games.find((game) => game.id === args.gameId);
        },
        author(parent, args, context) {
            return db.authors.find((author) => author.id === args.authorId);
        }
    },
    Game: {
        reviews(parent) {
            return db.reviews.filter((r) => r.game_id === parent.id);
        }
    },
    Author: {
        reviews(parent) {
            return db.reviews.filter((r) => r.author_id === parent.id);
        }
    },
    Review: {
        game(parent) {
            return db.games.find((game) => game.id === parent.game_id);
        },
        author(parent) {
            return db.authors.find((author) => author.id === parent.author_id);
        }
    },
    Mutation: {
        deleteGame(_, args) {
            return db.games.filter((game) => game.id !== args.id);
        },
        addGame(_, args) {
            let game = {
                ...args.game,
                id: Math.floor(Math.random() * 1000).toString()
            }
            db.games.push(game);
            return game;
        },
        updateGame(_, args) {
            db.games = db.games.map((game) => {
                if (game.id === args.id) {
                    return { ...game, ...args.update };
                }

                return game;
            });

            return db.games.find((game) => game.id === args.id);
        }
    }
}

// server setup
const server = new ApolloServer({
    typeDefs,
    resolvers
})

const { url } = await startStandaloneServer(server, {
    listen: { port: 8000 }
})

console.log(`Server ready at: ${url}`)
