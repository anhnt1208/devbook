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

const shopOwner = userFixture<Role.ShopOwner>({role: Role.ShopOwner});
const ownedShop = shopFixture({shopOwner: shopOwner});
const anotherShopOwner = userFixture<Role.ShopOwner>({role: Role.ShopOwner});
const anotherShop = shopFixture({shopOwner: anotherShopOwner});

export const shopOwnerAbilities = defineAbilityFor(shopOwner);
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
    name: 'can Update Shop name',
    configs: {
      action: 'Update',
      subject: 'Shop',
      field: 'name',
    },
    expected: true,
  },
  {
    name: 'can not Update Shop status',
    configs: {
      action: 'Update',
      subject: subject('Shop', shopFixture()),
      field: 'status',
    },
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
    name: 'can Create Shop products',
    configs: {action: 'Create', subject: 'Product'},
    expected: false,
  },
  {
    name: 'can Update Shop owned products',
    configs: {
      action: 'Update',
      subject: subject('Product', productFixture({shop: ownedShop})),
    },
    expected: false,
  },
  {
    name: 'can not Update products of another Shop',
    configs: {
      action: 'Update',
      subject: subject('Product', productFixture({shop: anotherShop})),
    },
    expected: false,
  },
  {
    name: 'can Delete Shop owned products',
    configs: {
      action: 'Delete',
      subject: subject('Product', productFixture({shop: ownedShop})),
    },
    expected: true,
  },
  {
    name: 'can not Delete products of another Shop',
    configs: {
      action: 'Delete',
      subject: subject('Product', productFixture({shop: anotherShop})),
    },
    expected: false,
  },
  {
    name: 'can not Create new Order',
    configs: {action: 'Create', subject: 'Order'},
    expected: false,
  },
  {
    name: 'can Read Order',
    configs: {action: 'Read', subject: 'Order'},
    expected: true,
  },
  {
    name: 'can Read Order having owned product',
    configs: {
      action: 'Read',
      subject: orderFixture({products: [productFixture({shop: ownedShop})]}),
    },
    expected: true,
  },
  {
    name: 'can not Read Order of another shops',
    configs: {
      action: 'Read',
      subject: orderFixture({products: [productFixture({shop: anotherShop})]}),
    },
    expected: true,
  },
  {
    name: 'can not Update Orders status only when status not is paid',
    configs: {
      action: 'Update',
      subject: orderFixture({products: [productFixture({shop: ownedShop})]}),
      field: 'status',
    },
    expected: false,
  },
  {
    name: 'can not Update Orders product',
    configs: {
      action: 'Update',
      subject: orderFixture({products: [productFixture({shop: ownedShop})]}),
      field: 'products',
    },
    expected: false,
  },
  {
    name: 'can not Delete the Order',
    configs: {
      action: 'Delete',
      subject: 'Order',
    },
    expected: false,
  },
];
