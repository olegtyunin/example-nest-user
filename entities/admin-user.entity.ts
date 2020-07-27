import { Column, Entity } from 'typeorm';
import { BaseUserModel } from './base-user.model';

@Entity({ name: 'admins' })
export class AdminUser extends BaseUserModel {
  @Column({ name: 'email', type: 'varchar', nullable: false, unique: true })
  public readonly email: string;

  @Column({ name: 'password_hash', type: 'varchar', nullable: true })
  public passwordHash?: string;

  @Column({ name: 'is_email_confirmed', type: 'boolean', nullable: false, default: false })
  public isEmailConfirmed: boolean;

}
