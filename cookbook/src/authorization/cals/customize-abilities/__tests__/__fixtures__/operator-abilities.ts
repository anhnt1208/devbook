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

const operator = userFixture<Role.Operator>({role: Role.Operator});
export const operatorAbilities = defineAbilityFor(operator);
export const fixtures: Array<AbilityFixture> = [
  {
    name: 'can Create Shop',
    configs: {action: 'Create', subject: 'Shop'},
    expected: true,
  },
  {
    name: 'can View Shop data',
    configs: {action: 'Read', subject: 'Shop'},
    expected: true,
  },
  {
    name: 'can Update Shop data',
    configs: {action: 'Update', subject: 'Shop'},
    expected: true,
  },
  {
    name: 'can Delete Shop data',
    configs: {action: 'Delete', subject: 'Shop'},
    expected: true,
  },
  {
    name: 'can only View Product',
    configs: {
      action: 'Read',
      subject: subject('Product', productFixture()),
    },
    expected: true,
  },
  {
    name: 'can not Create Product',
    configs: {
      action: 'Create',
      subject: 'Product',
    },
    expected: false,
  },
  {
    name: 'can not Update Product',
    configs: {
      action: 'Update',
      subject: subject('Product', productFixture()),
    },
    expected: false,
  },
  {
    name: 'can not Delete Product',
    configs: {
      action: 'Delete',
      subject: 'Product',
    },
    expected: false,
  },
  {
    name: 'can only View Order',
    configs: {
      action: 'Read',
      subject: subject('Order', orderFixture()),
    },
    expected: true,
  },
  {
    name: 'can not Create Order',
    configs: {
      action: 'Create',
      subject: 'Order',
    },
    expected: false,
  },
  {
    name: 'can not Update Order',
    configs: {
      action: 'Update',
      subject: subject('Order', productFixture()),
    },
    expected: false,
  },
  {
    name: 'can not Delete Order',
    configs: {
      action: 'Delete',
      subject: 'Order',
    },
    expected: false,
  },
];
