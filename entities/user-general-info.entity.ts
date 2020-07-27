import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { Column } from 'typeorm/decorator/columns/Column';
import { BaseEntityModel } from '../../common/models';
import { Ethnicity, UserSex } from '../enums';
import { User } from './user.entity';

@Entity({ name: 'user_general_info' })
export class UserGeneralInfo extends BaseEntityModel {
  @Column({ name: 'born_year', type: 'int', nullable: false })
  public readonly bornYear: number;

  @Column({ name: 'sex', type: 'enum', enum: UserSex, nullable: false })
  public readonly sex: UserSex;

  @Column({ name: 'country', type: 'varchar', nullable: false })
  public readonly country: string;

  @Column({ name: 'ethnicity', type: 'enum', enum: Ethnicity, nullable: false })
  public readonly ethnicity: Ethnicity;

  @Column({ name: 'other_ethnicity', type: 'varchar', nullable: true })
  public readonly otherEthnicity?: string;

  @Column({ name: 'user_id', type: 'int', nullable: false })
  public readonly userId: number;

  @OneToOne(() => User, { nullable: false, persistence: false })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  public readonly user: User;
}
