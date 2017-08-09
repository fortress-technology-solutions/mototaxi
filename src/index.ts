import { SynchronousCommandDispatcher } from './dispatchers/SynchronousCommandDispatcher';
import { AsynchronousCommandDispatcher } from './dispatchers/AsynchronousCommandDispatcher';
import { IMotoTaxiConfig } from './IMotoTaxiConfig';
import { AwsEventEmitter } from './aws/AwsEventEmitter';
import { IEventEmitter } from './IEventEmitter';
import { DefaultResolver } from './DefaultResolver';
import { ConfigurableResolver } from './ConfigurableResolver';
import { DefaultLogger } from './DefaultLogger';
import * as EventEmitter from 'events';
import * as AWS from 'aws-sdk';
import 'rxjs/Rx';

const getDispatcher = (config?: IMotoTaxiConfig) => {
  config = config || {};
  let eventEmitter: IEventEmitter = new EventEmitter();
  const resolver = config.resolve
    ? new ConfigurableResolver(config.resolve)
    : new DefaultResolver();
  const logger = config.log ? { log: config.log } : new DefaultLogger();
  if (config.sqs) {
    const sqs = new AWS.SQS({ region: config.sqs.region });
    eventEmitter = new AwsEventEmitter(sqs, config.sqs, logger);
    return new AsynchronousCommandDispatcher(eventEmitter, logger);
  }
  return new SynchronousCommandDispatcher(
    config.commandHandlers || [],
    resolver,
    logger,
  );
};

export { getDispatcher };
