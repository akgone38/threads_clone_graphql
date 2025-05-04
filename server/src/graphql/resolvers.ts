import { IResolvers } from '@graphql-tools/utils';
import { prismaClient } from '../lib/db.js';

export const resolvers: IResolvers = {
  Query: {
    hello: () => 'Hello from graphql TypeScript schema!',
    say: (_,{name}:{name:string})=>`Hey ${name}, How are you?`
  },
  Mutation:{
    createUser: async(_,
      {
        firstName,
        lastName,
        email,
        password
      }:{
        firstName:string;
        lastName:string;
        email:string;
        password:string;
      }
      )=>{
        await prismaClient.user.create({
          data:{
            email,
            firstName,
            lastName,
            password,
            salt:"random_salt",
          },
      });
      return true;
      }
  }
};
