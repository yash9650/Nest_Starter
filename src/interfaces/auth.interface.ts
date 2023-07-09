import { UserEntity } from 'src/entities/user.entity';

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
  STAFF = 'staff',
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type PartialBy<T, K extends keyof T> = Omit<T, K>;

export interface IUserPayload extends PartialBy<UserEntity, 'password'> {}
