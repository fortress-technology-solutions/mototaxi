import { ISqsConfig } from "./aws/ISqsConfig";

export interface IMotoTaxiConfig {
  commandHandlers?: any[];
  sqs?: ISqsConfig;
  log?: (message) => void;
  resolve?: (type) => any;
}
