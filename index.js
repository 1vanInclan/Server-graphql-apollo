import { gql, ApolloServer } from "apollo-server"


const persons = [
    {
        name: "Ivan",
        phone: "554458888913",
        street: "Calle Frontend",
        city: "Barcelona",
        id: "51531351ddededed1531dede"
    },
    {
        name: "Youseff",
        phone: "5544458913",
        street: "Avenida fullstack",
        city: "Mataro",
        id: "5153dedededeede"
    },
    {
        name: "Xochitl",
        street: "Calle Frontend",
        city: "Ibiza",
        id: "515313-51-ddede-ded1531dede"
    },
]

// Definir elementos
const typeDefinitions = gql`

    type Address {
        street: String!
        city: String!
    }

    type Person {
        name: String!
        phone: String
        address: Address!
        id: ID!
    }

    type Query {
        personCount: Int!
        allPersons: [Person]!
        findPerson(name: String): Person
    }
`
// Como resolver los datos
const resolvers = {
    Query: {
        personCount: () => persons.length,
        allPersons: () => persons,
        findPerson: (root, args) => {
            const {name} = args
            return persons.find(person => person.name === name)
        }
    },
    Person: {
        address: (root) => {
            return {
                street: root.street,
                city: root.city
            }
        }
    }
}

// Definir apollo-server
const server = new ApolloServer({
    typeDefs: typeDefinitions,
    resolvers
})

// Inicializar servidor
server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`)
})