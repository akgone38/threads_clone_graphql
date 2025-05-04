import { IResolvers } from '@graphql-tools/utils';

export const resolvers: IResolvers = {
  Query: {
    hello: () => 'Hello from graphql TypeScript schema!',
    say: (_,{name}:{name:string})=>`Hey ${name}, How are you?`
  },
};
