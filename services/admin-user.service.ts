import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PasswordService } from '../../core/services';
import { AdminUser } from '../entities';
import { BaseUserService } from './base-user.service';

@Injectable()
export class AdminUserService extends BaseUserService<AdminUser> {
  constructor(
    @InjectRepository(AdminUser)
    protected readonly userRepository: Repository<AdminUser>,
    protected readonly passwordService: PasswordService,
  ) {
    super(userRepository, passwordService);
  }
}
