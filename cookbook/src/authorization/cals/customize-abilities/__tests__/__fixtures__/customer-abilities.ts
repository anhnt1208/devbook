import {subject} from '@casl/ability';
import {
  AbilityFixture,
  orderFixture,
  productFixture,
  shopFixture,
  userFixture,
} from './fixtures';
import {Role} from '../../../types';
import defineAbilityFor from '../../abilities';

const customer = userFixture<Role.Customer>({role: Role.Customer});
const anotherCustomer = userFixture<Role.Customer>({role: Role.Customer});
export const customerAbilities = defineAbilityFor(customer);
export const fixtures: Array<AbilityFixture> = [
  {
    name: 'can view Shop',
    configs: {action: 'Read', subject: 'Shop'},
    expected: true,
  },
  {
    name: 'can not Create Shop',
    configs: {action: 'Create', subject: 'Shop'},
    expected: false,
  },
  {
    name: 'can not Update Shop',
    configs: {action: 'Update', subject: subject('Shop', shopFixture())},
    expected: false,
  },
  {
    name: 'can not Delete Shop',
    configs: {action: 'Delete', subject: 'Shop'},
    expected: false,
  },
  {
    name: 'can view any Shop products',
    configs: {action: 'Read', subject: subject('Product', productFixture())},
    expected: true,
  },
  {
    name: 'can not Create Shop products',
    configs: {action: 'Create', subject: 'Product'},
    expected: false,
  },
  {
    name: 'can not Update Shop products',
    configs: {action: 'Update', subject: 'Product'},
    expected: false,
  },
  {
    name: 'can not Delete Shop products',
    configs: {action: 'Delete', subject: 'Product'},
    expected: false,
  },
  {
    name: 'can Create new Order',
    configs: {action: 'Create', subject: 'Order'},
    expected: true,
  },
  {
    name: 'can Read owned Order',
    configs: {action: 'Read', subject: orderFixture({customer})},
    expected: true,
  },
  {
    name: 'can not Read another Order',
    configs: {
      action: 'Read',
      subject: orderFixture({customer: anotherCustomer}),
    },
    expected: false,
  },
  {
    name: 'can Update Orders product',
    configs: {
      action: 'Update',
      subject: orderFixture({customer}),
      field: 'products',
    },
    expected: true,
  },
  {
    name: 'can not Update Orders status only when status not is placing',
    configs: {
      action: 'Update',
      subject: orderFixture({customer, status: 'paid'}),
      field: 'status',
    },
    expected: false,
  },
  {
    name: 'can Delete the Order when status is placing',
    configs: {
      action: 'Delete',
      subject: orderFixture({customer, status: 'placing'}),
    },
    expected: true,
  },
];
