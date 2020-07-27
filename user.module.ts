import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from '../core/core.module';
import { AdminUserController, UserController } from './controllers';
import { AdminUser, User, UserGeneralInfo } from './entities';
import { AdminUserService, UserService } from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserGeneralInfo,
      AdminUser,
    ]),
    CoreModule,
  ],
  providers: [
    UserService,
    AdminUserService,
  ],
  controllers: [
    UserController,
    AdminUserController,
  ],
  exports: [
    UserService,
    AdminUserService,
  ],

})
export class UserModule {
}
