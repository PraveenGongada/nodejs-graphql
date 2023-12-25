export const typeDefs = `#graphql
  type Game {
    id: ID!
    title: String!
    platform: [String!]!
    reviews: [Review!]
  }
  type Review {
    id: ID!
    rating: Int!
    content: String!
    game: Game!
    author: Author!
  }
  type Author {
    id: ID!
    name: String!
    verified: Boolean!
    reviews: [Review!]
  }
  type Query {
    games: [Game]
    reviews: [Review]
    authors: [Author]
    review(reviewId: ID!): Review
    game(gameId: ID!): Game
    author(authorId: ID!): Author
  }

  type Mutation {
    deleteGame(id: ID!): [Game]
    addGame(game: AddGameReq!): Game
    updateGame(id: ID!, update: UpdateGameReq!): Game
  }

  input AddGameReq {
    title: String!
    platform: [String!]!
  }

  input UpdateGameReq {
    title: String
    platform: [String!]
  }
`