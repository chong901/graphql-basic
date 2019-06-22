import { GraphQLServer, PubSub } from "graphql-yoga";
import { db } from "./db";
import { usersQuery } from "./Users/Query";
import { commentsQuery } from "./Comments/Query";
import { postsQuery } from "./Posts/Query";
import { Post } from "./Posts/Posts";
import { User } from "./Users/Users";
import { Comment } from "./Comments/Comments";
import { usersMutation } from "./Users/Mutation";
import { postsMutation } from "./Posts/Mutation";
import { commentsMutation } from "./Comments/Mutation";
import { Subscription } from "./Subscription";

const pubSub = new PubSub();
// Resolvers
const resolvers = {
  Query: {
    ...usersQuery,
    ...commentsQuery,
    ...postsQuery,
  },
  Post,
  User,
  Comment,
  Mutation: {
    ...usersMutation,
    ...postsMutation,
    ...commentsMutation,
  },
  Subscription: {
    ...Subscription,
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    db,
    pubSub,
  }
});

server.start(() => {
  console.log('server is up');
})
