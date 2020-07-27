import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { PaginationQueryDto } from '../../common/dto';
import { TransformInterceptor } from '../../common/interceptors';
import { PaginatedResponseInterface, RequestWithUserInterface } from '../../common/interfaces';
import { IntPipe } from '../../common/pipes';
import { AdminGuard } from '../../core/guards';
import { SetUserPasswordDto } from '../dto/request';
import { GetAdminUserDto, GetAdminUserListDto } from '../dto/response';
import { GetAdminUserInterface } from '../interfaces';
import { AdminUserService } from '../services';

@Controller('admin-user')
@UseGuards(AuthGuard('jwt'), new AdminGuard())
@ApiUseTags('admin-user')
@ApiBearerAuth()
export class AdminUserController {
  constructor(
    private readonly userService: AdminUserService,
  ) {
  }

  @Get('/me')
  @UseInterceptors(new TransformInterceptor(GetAdminUserDto))
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ title: 'get admin by jwt token' })
  @ApiResponse({ status: HttpStatus.OK, type: GetAdminUserDto })
  public async getMe(
    @Req() req: RequestWithUserInterface<GetAdminUserInterface>,
  ): Promise<GetAdminUserInterface> {
    return this.userService.getUserById(req.user.id);
  }

  @Get('/:id')
  @UseInterceptors(new TransformInterceptor(GetAdminUserDto))
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ title: 'get admin by id' })
  @ApiResponse({ status: HttpStatus.OK, type: GetAdminUserDto })
  public async getUserById(
    @Param('id', new IntPipe()) id: number,
  ): Promise<GetAdminUserInterface> {
    return this.userService.getUserById(id);
  }

  @Get('')
  @UseInterceptors(new TransformInterceptor(GetAdminUserListDto))
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ title: 'get admins paginated list' })
  @ApiResponse({ status: HttpStatus.OK, type: GetAdminUserListDto })
  public async getUsersList(
    @Query() query: PaginationQueryDto,
  ): Promise<PaginatedResponseInterface<GetAdminUserInterface>> {
    return this.userService.getUserListWithPagination(query);
  }

  @Patch('/password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ title: 'change admin password' })
  @ApiResponse({ status: HttpStatus.OK, type: null })
  public async updateUserPassword(
    @Req() req: RequestWithUserInterface<GetAdminUserInterface>,
    @Body() body: SetUserPasswordDto,
  ): Promise<void> {
    await this.userService.updateUserPassword(req.user.id, body.password);
  }
}
