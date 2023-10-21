import {randomUUID} from 'node:crypto';
import {
  Actions,
  Order,
  OrderStatus,
  Product,
  Role,
  Shop,
  User,
} from '../../../types';

export type AbilityFixture = {
  name: string;
  configs: {
    action: Actions;
    subject: string | Record<string, unknown>;
    field?: string;
  };
  expected: boolean;
};
export const userFixture = <T extends Role>(
  props: {role: T} & Partial<User<T>>
): User<T> => {
  const uuid = randomUUID();
  const defaults: User<T> = {
    userId: uuid,
    role: props.role,
    email: `${uuid}@example.com`,
  };

  return {...defaults, ...props};
};

export const shopFixture = (props: Partial<Shop> = {}): Shop => {
  const defaults: Shop = {
    shopId: randomUUID(),
    name: 'shop_name',
    status: 'active',
    shopOwner: userFixture({role: Role.ShopOwner}),
  };

  return {...defaults, ...props};
};

export const productFixture = (props: Partial<Product> = {}): Product => {
  const defaults: Product = {
    productId: randomUUID(),
    shop: shopFixture(),
    price: 0,
  };

  return {...defaults, ...props};
};

class OrderClass implements Order {
  public orderId: string;
  public customer: User<Role.Customer>;
  public products: Product[];
  public status: OrderStatus;
  constructor(args: Order) {
    this.orderId = args.orderId;
    this.customer = args.customer;
    this.products = args.products;
    this.status = args.status;
  }
  static get modelName() {
    return 'Order';
  }
}
export const orderFixture = (props: Partial<Order> = {}): Order => {
  const defaults: Order = {
    orderId: randomUUID(),
    customer: userFixture({role: Role.Customer}),
    products: [productFixture()],
    status: 'placing',
  };
  return new OrderClass({...defaults, ...props});
};
