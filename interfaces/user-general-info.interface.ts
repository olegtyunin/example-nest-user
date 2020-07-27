import { Ethnicity, UserSex } from '../enums';

export interface UserGeneralInfoInterface {
  readonly bornYear: number;
  readonly sex: UserSex;
  readonly country: string;
  readonly ethnicity: Ethnicity;
  readonly otherEthnicity?: string;
}
