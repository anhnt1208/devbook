import {fixtures, customerAbilities} from './__fixtures__/customer-abilities';

describe.each(fixtures)('Customer abilities', ({name, configs, expected}) => {
  test(name, () => {
    expect(
      customerAbilities.can(
        configs.action,
        configs.subject,
        configs.field ?? undefined
      )
    ).toBe(expected);
  });
});
describe.each(fixtures)('Shopowner abilities', ({name, configs, expected}) => {
  test(name, () => {
    expect(
      customerAbilities.can(
        configs.action,
        configs.subject,
        configs.field ?? undefined
      )
    ).toBe(expected);
  });
});
