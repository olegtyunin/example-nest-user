import { BaseEntityLikeInterface } from '../../common/interfaces';

export interface GetAdminUserInterface extends BaseEntityLikeInterface {
  readonly email: string;
  readonly isEmailConfirmed: boolean;
}
