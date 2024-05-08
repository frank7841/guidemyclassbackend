const AccResolver = require("./login-signupquery");
const ReferenceResolver = require("./referencequery");
const OrderResolver = require("./orderquery");
const AccMutation = require("./login-signupmutation");
const ReferenceMutation = require("./referencemutation");
const OrderMutation = require("./ordermutation");
const SystemSettingMutation = require("./systemsettingmutation");
const SystemSettingResolver = require("./systemsettingquery");

const resolvers = {
  Query: {
    ...AccResolver,
    ...ReferenceResolver,
    ...OrderResolver,
    ...SystemSettingResolver,
  },
  Mutation: {
    ...AccMutation,
    ...ReferenceMutation,
    ...OrderMutation,
    ...SystemSettingMutation,
  },
};

module.exports = resolvers;
