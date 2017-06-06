import { ISqsConfig } from './aws/ISqsConfig';
import { ILogger } from './ILogger';

export interface IMotoTaxiConfig {
    commandHandlers?: any[];
    sqs?: ISqsConfig;
    logger?: ILogger;
}
