// tslint:disable
import * as mototaxi from '../index';
import { SynchronousCommandDispatcher } from '../dispatchers/SynchronousCommandDispatcher';
import { AsynchronousCommandDispatcher } from '../dispatchers/AsynchronousCommandDispatcher';
import { IMotoTaxiConfig } from '../IMotoTaxiConfig';
import { AwsEventEmitter } from '../aws/AwsEventEmitter';
import { DefaultResolver } from '../DefaultResolver';
import { ConfigurableResolver } from '../ConfigurableResolver';
import { DefaultLogger } from '../DefaultLogger';

describe('Getting a Dispatcher', () => {
  describe('with no config', () => {
    const dispatcher = mototaxi.getDispatcher();
    it('should have the default resolver', () => {
      const resolver = (dispatcher as any).resolver;
      expect(resolver).not.toBeUndefined();
      expect(resolver).toBeInstanceOf(DefaultResolver);
    });
    it('should have the default logger', () => {
      const logger = (dispatcher as any).logger;
      expect(logger).not.toBeUndefined();
      expect(logger).toBeInstanceOf(DefaultLogger);
    });
    it('should return the syncronous dispatcher', () => {
      expect(dispatcher).toBeInstanceOf(SynchronousCommandDispatcher);
    });
  });
  describe('with custom resolver', () => {
    const config: IMotoTaxiConfig = {
      resolve: () => 123
    };
    const dispatcher = mototaxi.getDispatcher(config);
    it('should have the configurable resolver', () => {
      const resolver = (dispatcher as any).resolver;
      expect(resolver).not.toBeUndefined();
      expect(resolver).toBeInstanceOf(ConfigurableResolver);
      expect(resolver.resolve()).toEqual(123);
    });
  });
  describe('with custom logger', () => {
    var loggedMessage = '';
    const config: IMotoTaxiConfig = {
      log: msg => {
        loggedMessage = msg;
      }
    };
    const dispatcher = mototaxi.getDispatcher(config);
    it('should have the custom logger', () => {
      const logger = (dispatcher as any).logger;
      expect(logger).not.toBeUndefined();
      logger.log('testing');
      expect(loggedMessage).toEqual('testing');
    });
  });
  describe('with sqs config', () => {
    const config: IMotoTaxiConfig = {
      sqs: {
        eventQueueUrl:
          'https://sqs.us-east-1.amazonaws.com/487799950234/nonexistent',
        commandQueueUrl:
          'https://sqs.us-east-1.amazonaws.com/487799950234/nonexistent',
        access: 'access',
        region: 'us-east-1',
        secret: 'secret'
      }
    };
    const dispatcher = mototaxi.getDispatcher(config);
    it('should return the dispatcher with the aws event emitter', () => {
      expect(dispatcher).toBeInstanceOf(AsynchronousCommandDispatcher);
      const emitter = (dispatcher as any).eventEmitter;
      expect(emitter).toBeInstanceOf(AwsEventEmitter);
    });
  });
});
