"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var apollo_server_express_1 = require("apollo-server-express");
require("./data/dbConnectors");
var query_1 = __importDefault(require("./typeDefs/query"));
var mutation_1 = __importDefault(require("./typeDefs/mutation"));
var enums_1 = __importDefault(require("./typeDefs/shared/enums"));
var interfaces_1 = __importDefault(require("./typeDefs/shared/interfaces"));
var scalars_1 = __importDefault(require("./typeDefs/shared/scalars"));
var user_1 = __importDefault(require("./typeDefs/user"));
var address_1 = __importDefault(require("./typeDefs/address"));
var jobOffer_1 = __importDefault(require("./typeDefs/jobOffer"));
var company_1 = __importDefault(require("./typeDefs/company"));
var file_1 = __importDefault(require("./typeDefs/file"));
var token_1 = __importDefault(require("./typeDefs/token"));
var pagination_1 = __importDefault(require("./typeDefs/pagination"));
var resolvers_1 = __importDefault(require("./resolvers"));
var config_1 = __importDefault(require("./config"));
var typeDefs = [
    query_1.default,
    mutation_1.default,
    enums_1.default,
    interfaces_1.default,
    scalars_1.default,
    user_1.default,
    address_1.default,
    jobOffer_1.default,
    company_1.default,
    file_1.default,
    token_1.default,
    pagination_1.default,
];
var context = function (_a) {
    var req = _a.req;
    return __awaiter(void 0, void 0, void 0, function () {
        var accessToken, verifiedAccessToken, isAccessTokenValid;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    accessToken = req.headers.accesstoken || '';
                    return [4, resolvers_1.default.Mutation.verifyAccessToken(null, {
                            accessToken: accessToken,
                        })];
                case 1:
                    verifiedAccessToken = _b.sent();
                    isAccessTokenValid = verifiedAccessToken.success;
                    if (isAccessTokenValid) {
                        return [2, { accessToken: accessToken }];
                    }
                    return [2, { accessToken: null }];
            }
        });
    });
};
var server = new apollo_server_express_1.ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers_1.default,
    context: context,
    debug: config_1.default.NODE_ENV === 'development',
});
var protocol = 'http';
var url = 'localhost';
var port = config_1.default.PORT;
var path = '/graphql';
var app = express_1.default();
app.use('*', cors_1.default());
server.applyMiddleware({ app: app, path: path });
app.listen({ port: port }, function () {
    console.log("Apollo Server is listening on " + protocol + "://" + url + ":" + port + path + ".");
});
