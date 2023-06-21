export enum Role {
  Customer = 'customer',
  ShopOwner = 'shop_owner',
  Operator = 'operator',
}
export interface User<T extends Role = Role.Customer> {
  userId: string;
  role: T;
  email: string;
}
export interface Shop {
  shopId: string;
  shopOwner: User<Role.ShopOwner>;
  name: string;
  status: 'active' | 'deactive';
}
export interface Product {
  productId: string;
  price: number;
  shop: Shop;
}

export type OrderStatus = 'placing' | 'paid' | 'invoiced' | 'completed';
export interface Order {
  orderId: string;
  customer: User<Role.Customer>;
  products: Product[];
  status: OrderStatus;
}

export type Actions = 'Create' | 'Read' | 'Update' | 'Delete';
export type Subjects = 'Shop' | 'Product' | 'Order';
