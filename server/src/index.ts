//ES Module syntax
import express, { Request, Response } from 'express';
import { ApolloServer } from '@apollo/server';
import {expressMiddleware} from '@apollo/server/express4';
import cors from 'cors';
import { json } from 'body-parser';
import { Server } from 'http';
import { typeDefs } from './graphql/schema.js';
import { resolvers } from './graphql/resolvers.js';

async function init(){
    const app = express();
    const PORT = Number(process.env.PORT)||8000

    app.use(cors());
    app.use(express.json());

    //create server
    const gqlServer = new ApolloServer({
        typeDefs,
        resolvers,
    })

    //start server
    await gqlServer.start();

    app.get('/', (req: Request, res: Response) => {
        res.json({ message: 'Server is up and running' });
      });

    app.use(
        '/graphql',
        expressMiddleware(gqlServer, {
            context: async ({ req }: { req: Request }) => ({})
        })
      );
      
    app.listen(PORT,()=>console.log(`Server started at PORT:${PORT}`));
}
init();