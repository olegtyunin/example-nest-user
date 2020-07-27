import { UpdateAdminInterface } from './update-admin.interface';

export interface UpdateUserInterface extends UpdateAdminInterface {
  dnaFileUrl?: string;
}
