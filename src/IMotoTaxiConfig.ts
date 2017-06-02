import { ISqsConfig } from './aws/ISqsConfig';
import { ISnsConfig } from './aws/ISnsConfig';

export interface IMotoTaxiConfig {
    commandHandlers?: any[];
    sqs?: ISqsConfig;
    sns?: ISnsConfig;
}
