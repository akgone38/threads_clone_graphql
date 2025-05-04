var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//ES Module syntax
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import { typeDefs } from './graphql/schema.js';
import { resolvers } from './graphql/resolvers.js';
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = express();
        const PORT = Number(process.env.PORT) || 8000;
        app.use(cors());
        app.use(express.json());
        //create server
        const gqlServer = new ApolloServer({
            typeDefs,
            resolvers,
        });
        //start server
        yield gqlServer.start();
        app.get('/', (req, res) => {
            res.json({ message: 'Server is up and running' });
        });
        app.use('/graphql', expressMiddleware(gqlServer, {
            context: (_a) => __awaiter(this, [_a], void 0, function* ({ req }) { return ({}); })
        }));
        app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));
    });
}
init();
