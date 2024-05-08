const express = require("express");
const mongoose = require("mongoose");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const typeDefs = require("./graph/schema/index");
const http = require("http");
const resolvers = require("./graph/resolvers/index");

const isAuth = require("./middleware/is-auth");
const isRole = require("./middleware/role");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { json } = require("body-parser");
var bodyParser = require("body-parser");
const { makeExecutableSchema } = require("@graphql-tools/schema");
// const { WebSocketServer } = require("ws");
// const { useServer } = require("graphql-ws/lib/use/ws");
const uploadFiles = require("./FetchApi/routes/uploadFiles");
const paymentsDetails = require("./FetchApi/routes/payments");

const port = 8080;
const hostname = "localhost";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));

var allowlist = [
  "https://irob-project-frontend.vercel.app",
  "https://guidemyclass.com",
  "*",
  "http://localhost:3000",
  "https://studio.apollographql.com",
];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = {
      origin: true,
      credentials: true,
      methods: "POST, GET ,PUT, OPTIONS, DELETE",
    }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(cors(corsOptionsDelegate));
app.use(cookieParser());

app.use(isAuth);
app.use(isRole);

// , upload.single('profileImage')
app.use("/upload", uploadFiles);
app.use("/payments", paymentsDetails);
async function startApolloServer(typeDefs, resolvers) {
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    cors: {
      origin: [
        "http://localhost:3000",
        "http://localhost:8080",
        "https://studio.apollographql.com",
        "https://irob-project-frontend.vercel.app",
        "https://guidemyclass.com",
        "*",
      ],
      credentials: true,
    },
    playground: true,

    plugins: [
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),
      // ApolloServerPluginLandingPageLocalDefault({ embed: true }),
      // ApolloServerPluginLandingPageProductionDefault({ embed: true }),

      // Proper shutdown for the WebSocket server.
      // {
      //   async serverWillStart() {
      //     return {
      //       async drainServer() {
      //         await serverCleanup.dispose();
      //       },
      //     };
      //   },
      // },
    ],
    // subscriptions: {
    //   path: "/subscriptions",
    // onConnect: (connectionParams, webSocket, context) => {},
    // onDisconnect: (webSocket, context) => {},
    // },
  });
  await server.start();
  app.use(
    "/api",
    cors({
      origin: [
        "http://localhost:3000",
        "http://localhost:8080",
        "https://studio.apollographql.com",
        "https://irob-project-frontend.vercel.app",
        "https://guidemyclass.com",
        "*",
      ],
      credentials: true,
    }),
    json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        return { req, res };
      },
    })
  ); 

  mongoose.set("strictQuery", false);
  mongoose
    .connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_ATLAS_PW}@${process.env.mongodb_clustername}.zzj9iuj.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,

      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      httpServer.listen(port, hostname, () => {
        console.log(`Server is now running on http://localhost:${port}/api`);
        // console.log(
        //   `🚀 Subscription endpoint ready at ws://localhost:${port}/api`
        // );
      });
    })
    .catch((err) => {
      console.log(err);
    });

  mongoose.Promise = global.Promise;
}
startApolloServer(typeDefs, resolvers);

mongoose.connection.on("error", function (err) {
  console.error("Failed to connect to DB " + hostname + " on startup ", err);
});

// When the connection is disconnected
mongoose.connection.on("disconnected", function () {
  console.log(
    "Mongoose default connection to DB :" + hostname + " disconnected"
  );
});

var gracefulExit = function () {
  mongoose.connection.close(function () {
    console.log(
      "Mongoose default connection with DB :" +
        hostname +
        " is disconnected through app termination"
    );
    process.exit(0);
  });
};
