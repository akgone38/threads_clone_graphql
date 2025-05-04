export const resolvers = {
    Query: {
        hello: () => 'Hello from graphql TypeScript schema!',
        say: (_, { name }) => `Hey ${name}, How are you?`
    },
};
