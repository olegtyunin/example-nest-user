import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags, ApiImplicitParam } from '@nestjs/swagger';
import { PaginationQueryDto } from '../../common/dto';
import { TransformInterceptor } from '../../common/interceptors';
import { PaginatedResponseInterface, RequestWithUserInterface } from '../../common/interfaces';
import { IntPipe } from '../../common/pipes';
import { AdminGuard, UserGuard } from '../../core/guards';
import { SetUserGeneralInfoDto } from '../dto/request';
import { GetUserDto, GetUserListForAdminDto } from '../dto/response';
import { GetUserInterface } from '../interfaces';
import { UserService } from '../services';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
@ApiUseTags('user')
@ApiBearerAuth()
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {
  }

  @Get('/me')
  @UseGuards(new UserGuard())
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new TransformInterceptor(GetUserDto))
  @ApiOperation({ title: 'get user by jwt token' })
  @ApiResponse({ status: HttpStatus.OK, type: GetUserDto })
  public async getMe(
    @Req() req: RequestWithUserInterface<GetUserInterface>,
  ): Promise<GetUserInterface> {
    return this.userService.getUserById(req.user.id);
  }

  @Post('/general-info')
  @UseGuards(new UserGuard())
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ title: 'set user general info' })
  @ApiResponse({ status: HttpStatus.OK, type: null })
  public async setUserGeneralInfo(
    @Req() req: RequestWithUserInterface<GetUserInterface>,
    @Body() body: SetUserGeneralInfoDto,
  ): Promise<void> {
    await this.userService.setUserGeneralInfo(req.user.id, body);
  }

  // FOR admin
  @Get('/:id')
  @UseGuards(new AdminGuard())
  @UseInterceptors(new TransformInterceptor(GetUserDto))
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ title: 'get user by id' })
  @ApiResponse({ status: HttpStatus.OK, type: GetUserDto })
  @ApiImplicitParam({ name: 'id', type: 'integer', required: true, description: 'userId' })
  public async getUserById(
    @Param('id', new IntPipe()) id: number,
  ): Promise<GetUserInterface> {
    return this.userService.getUserById(id);
  }

  // FOR admin
  @Get('/:id/general-info')
  @UseGuards(new AdminGuard())
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ title: 'get user general info by id' })
  @ApiResponse({ status: HttpStatus.OK, type: SetUserGeneralInfoDto })
  @ApiImplicitParam({ name: 'id', type: 'integer', required: true, description: 'userId' })
  public async getUserByIdGeneralInfo(
    @Param('id', new IntPipe()) id: number,
  ): Promise<any> {
    return this.userService.getUserByIdGeneralInfo(id);
  }

  // FOR admin
  @Get('')
  @UseGuards(new AdminGuard())
  @UseInterceptors(new TransformInterceptor(GetUserListForAdminDto))
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ title: 'get users paginated list' })
  @ApiResponse({ status: HttpStatus.OK, type: GetUserListForAdminDto })
  public async getUsersList(
    @Query() query: PaginationQueryDto,
  ): Promise<PaginatedResponseInterface<GetUserInterface>> {
    return this.userService.getUserListWithPagination(query);
  }
}
