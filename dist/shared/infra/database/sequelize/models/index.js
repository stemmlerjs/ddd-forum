"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const config_1 = __importDefault(require("../config/config"));
const Sequelize = __importStar(require("sequelize"));
const sequelize = config_1.default.connection;
// turns base_user => BaseUser
function toCamelCase(str) {
    const _ = str.indexOf("_");
    if (~_) {
        return toCamelCase(str.substring(0, _)
            + str.substring(_ + 1)
                .substring(0, 1)
                .toUpperCase()
            + str.substring(_ + 2));
    }
    else {
        return str.substring(0, 1).toUpperCase() + str.substring(1);
    }
}
let models = {};
let modelsLoaded = false;
const createModels = () => {
    if (modelsLoaded)
        return models;
    // Get all models
    const modelsList = fs.readdirSync(path.resolve(__dirname, "./"))
        .filter((t) => ~t.indexOf('.ts') && !~t.indexOf("index") && !~t.indexOf(".map"))
        .map((model) => sequelize.import(__dirname + '/' + model));
    // Camel case the models
    for (let i = 0; i < modelsList.length; i++) {
        const modelName = toCamelCase(modelsList[i].name);
        models[modelName] = modelsList[i];
    }
    // Create the relationships for the models;
    Object.keys(models).forEach((modelName) => {
        if (models[modelName].associate) {
            models[modelName].associate(models);
        }
    });
    models['sequelize'] = sequelize;
    models['Sequelize'] = Sequelize;
    modelsLoaded = true;
    return models;
};
exports.createModels = createModels;
exports.default = createModels();
//# sourceMappingURL=index.js.map