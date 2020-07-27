import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ValidationConstants } from '../../../common/constants';
import { ValidationErrorCodes } from '../../../common/enums/errors';

export class SetUserPasswordDto {
  @IsNotEmpty({ message: ValidationErrorCodes.EMPTY_FIELD })
  @IsString({ message: ValidationErrorCodes.IS_NOT_STRING })
  @MinLength(ValidationConstants.MIN_PASSWORD_LENGTH, { message: ValidationErrorCodes.MIN_LENGTH })
  @MaxLength(ValidationConstants.MAX_PASSWORD_LENGTH, { message: ValidationErrorCodes.MAX_LENGTH })
  @ApiModelProperty({ type: 'string', minLength: ValidationConstants.MAX_PASSWORD_LENGTH })
  readonly password: string;
}
