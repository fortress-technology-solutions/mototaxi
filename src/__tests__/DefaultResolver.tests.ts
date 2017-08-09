// tslint:disable
import { DefaultResolver } from '../DefaultResolver';
import 'rxjs/add/operator/filter';

describe('The Default Resolver', () => {
  describe('when resolving an instantiatable type', () => {
    const resolver = new DefaultResolver();
    const handlerType = { test: 123 };
    const obj = resolver.resolve(handlerType);

    it('should return the instantiated object', () => {
      expect(obj).toEqual(handlerType);
    });
  });
});
