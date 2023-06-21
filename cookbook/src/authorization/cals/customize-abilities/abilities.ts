import {
  PureAbility,
  AbilityBuilder,
  AbilityTuple,
  MatchConditions,
  FieldMatcher,
} from '@casl/ability';
import {Order, Role, User} from '../types';

type AppAbility = PureAbility<AbilityTuple, MatchConditions>;
type DefinePermissions<T extends Role> = (
  user: User<T>,
  builder: AbilityBuilder<AppAbility>
) => void;

const lambdaMatcher = (matchConditions: MatchConditions) => matchConditions;
const fieldMatcher: FieldMatcher = fields => field => fields.includes(field);

/**
 * Define abilities for user
 * @param user
 * @returns
 */
export default function defineAbilityFor<T extends Role>(user: User<T>) {
  const builder = new AbilityBuilder<AppAbility>(PureAbility);

  if (typeof rolePermissions[user.role] === 'function') {
    rolePermissions[user.role](user, builder);
  } else {
    throw new Error(`Trying to use unknown role "${user.role}"`);
  }

  return builder.build({
    conditionsMatcher: lambdaMatcher,
    fieldMatcher,
  });
}
const rolePermissions: {[k in Role]: DefinePermissions<k>} = {
  // Customer can
  [Role.Customer](user: User<Role.Customer>, {can}) {
    can('Read', 'Shop');
    can('Read', 'Product');
    can('Create', 'Order');
    can<Order>('Read', 'Order', undefined, order => {
      return user.userId === order.customer.userId;
    });
    can<Order>('Update', 'Order', ['products', 'status'], order => {
      return (
        user.userId === order.customer.userId && order.status === 'placing'
      );
    });
    can<Order>('Delete', 'Order', undefined, order => {
      return (
        user.userId === order.customer.userId && order.status === 'placing'
      );
    });
  },

  [Role.ShopOwner](user: User<Role.ShopOwner>, {can}) {
    can('Read', 'Shop');
    can('Update', 'Shop', ['name'], ({shopOwnerId}) => {
      return user.userId === shopOwnerId;
    });

    can('Create', 'Product');
    can(['Update', 'Delete'], 'Product', undefined, ({shopOwnerId}) => {
      return user.userId === shopOwnerId;
    });

    can<Order>('Read', 'Order', undefined, ({products}) => {
      return (
        products.find(
          product => user.userId === product.shop.shopOwner.userId
        ) !== undefined
      );
    });
    can<Order>('Update', 'Order', undefined, ({status, products}) => {
      return (
        status === 'paid' &&
        products.find(
          product => user.userId === product.shop.shopOwner.userId
        ) !== undefined
      );
    });
  },

  [Role.Operator](user, {can}) {
    can(['Create', 'Read', 'Update', 'Delete'], 'Shop');
    can('Read', 'Product');
    can('Read', 'Order');
  },
};
