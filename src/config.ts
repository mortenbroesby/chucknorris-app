export interface ConfigInterface {
  api: {
    requestTimeout: number;
  };
}

let config: ConfigInterface = {
  api: {
    requestTimeout: 30000
  },
};

export default config;
