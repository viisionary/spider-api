import {join} from "path";
import {loggerConfig} from "./logger";
import mongooseConfig from "./mongoose";

const {version} = require("../../package.json");
export const rootDir = join(__dirname, "..");

export const config: Partial<TsED.Configuration> = {
  version,
  rootDir,
  logger: loggerConfig,
  mongoose: mongooseConfig,
    componentsScan: [
        `${rootDir}/graphql/**/*.ts` // add this pattern to scan resolvers or datasources
    ],
  graphql: {
    default: {
      path: "/graphql",
        buildSchemaOptions: {
      }
    }
  }
  // additional shared configuration
};
