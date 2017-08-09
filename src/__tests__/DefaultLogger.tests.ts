// tslint:disable
import { DefaultLogger } from '../DefaultLogger';

describe('The Default Logger', () => {
  describe('when logging a message', () => {
    const logger = new DefaultLogger();
    it('should do nothing', () => {
      logger.log('test');
    });
  });
});
