require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const cors = require('cors');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));
  
  // Setup Apollo GraphQL Server
  const server = new ApolloServer({ typeDefs, resolvers });
  server.start().then(() => {
    server.applyMiddleware({ app });
    app.listen(4000, () => {
      console.log(`Server running at http://localhost:4000${server.graphqlPath}`);
    });
  });
  