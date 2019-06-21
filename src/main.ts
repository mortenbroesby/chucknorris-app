import Logger from "js-logger";

const logLevel = Logger.DEBUG;
Logger.useDefaults();
Logger.setLevel(logLevel);

Logger.info("Working");
