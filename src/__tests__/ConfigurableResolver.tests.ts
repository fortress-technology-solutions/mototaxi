/* tslint:disable:only-arrow-functions */

import { ConfigurableResolver } from '../ConfigurableResolver';

describe('The Configurable Resolver', () => {
  describe('when resolving a type using the given resolve method', () => {
    const resolver = new ConfigurableResolver(type => new type());
    const testType = function testConstructor() {
      return { test: 123 };
    };
    const resolvedType = resolver.resolve(testType);
    it('should return the resolved type', () => {
      expect(resolvedType.test).toBe(123);
    });
  });
});
