const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Employee = require('../models/Employee');

module.exports = {
  Query: {
    login: async (_, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user) throw new Error('User not found');
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error('Invalid credentials');
      return jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    },
    getAllEmployees: async () => await Employee.find(),
    searchEmployeeById: async (_, { id }) => {
      const employee = await Employee.findById(id);
      if (!employee) {
        throw new Error(`Employee with ID ${id} not found.`);
      }
      return employee;
    },
    searchEmployeeByDesignationOrDept: async (_, { designation, department }) => {
      return await Employee.find({ $or: [{ designation }, { department }] });
    },
  },
  Mutation: {
    signup: async (_, { username, email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, email, password: hashedPassword });
      return await newUser.save();
    },
    addEmployee: async (_, args) => {
      const newEmployee = new Employee(args);
      return await newEmployee.save();
    },
    updateEmployee: async (_, { id, ...updates }) => {
      return await Employee.findByIdAndUpdate(id, updates, { new: true });
    },
    deleteEmployee: async (_, { id }) => {
      await Employee.findByIdAndDelete(id);
      return 'Employee deleted';
    },
  },
};
