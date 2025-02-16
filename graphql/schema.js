const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
  }

  type Employee {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    designation: String!
    salary: Float!
    date_of_joining: String!
    department: String!
    employee_photo: String
  }

  type Query {
    login(username: String!, password: String!): String
    getAllEmployees: [Employee]
    searchEmployeeById(id: ID!): Employee
    searchEmployeeByDesignationOrDept(designation: String, department: String): [Employee]
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): User
    addEmployee(first_name: String!, last_name: String!, email: String!, gender: String!, designation: String!, salary: Float!, date_of_joining: String!, department: String!, employee_photo: String): Employee
    updateEmployee(id: ID!, first_name: String, last_name: String, email: String, gender: String, designation: String, salary: Float, date_of_joining: String, department: String, employee_photo: String): Employee
    deleteEmployee(id: ID!): String
  }
`;
