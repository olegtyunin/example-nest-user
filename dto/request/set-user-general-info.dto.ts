import { ApiModelProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import { ValidationConstants } from '../../../common/constants';
import { ValidationErrorCodes } from '../../../common/enums/errors';
import { Ethnicity, UserSex } from '../../enums';

export class SetUserGeneralInfoDto {
  @IsNotEmpty({ message: ValidationErrorCodes.EMPTY_FIELD })
  @IsInt({ message: ValidationErrorCodes.IS_NOT_INTEGER })
  @IsPositive({ message: ValidationErrorCodes.NUMBER_IS_NOT_POSITIVE })
  @Min(ValidationConstants.MIN_BORN_YEAR, { message: ValidationErrorCodes.MIN_VALUE })
  @Max(ValidationConstants.MAX_BORN_YEAR, { message: ValidationErrorCodes.MAX_VALUE })
  @ApiModelProperty({ type: 'number', minimum: ValidationConstants.MIN_BORN_YEAR, maximum: ValidationConstants.MAX_BORN_YEAR })
  readonly bornYear: number;

  @IsNotEmpty({ message: ValidationErrorCodes.EMPTY_FIELD })
  @IsEnum(UserSex, { message: ValidationErrorCodes.NOT_IN_ENUM })
  @ApiModelProperty({ type: 'enum', enum: UserSex })
  readonly sex: UserSex;

  @IsNotEmpty({ message: ValidationErrorCodes.EMPTY_FIELD })
  @IsString({ message: ValidationErrorCodes.IS_NOT_STRING })
  @MinLength(ValidationConstants.MIN_STRING_LENGTH, { message: ValidationErrorCodes.MIN_LENGTH })
  @MaxLength(ValidationConstants.MAX_STRING_LENGTH, { message: ValidationErrorCodes.MAX_LENGTH })
  @ApiModelProperty({ type: 'string', minLength: ValidationConstants.MIN_STRING_LENGTH, maxLength: ValidationConstants.MAX_STRING_LENGTH })
  readonly country: string;

  @IsNotEmpty({ message: ValidationErrorCodes.EMPTY_FIELD })
  @IsEnum(Ethnicity, { message: ValidationErrorCodes.NOT_IN_ENUM })
  @ApiModelProperty({ type: 'enum', enum: Ethnicity })
  readonly ethnicity: Ethnicity;

  @IsOptional()
  @IsNotEmpty({ message: ValidationErrorCodes.EMPTY_FIELD })
  @IsString({ message: ValidationErrorCodes.IS_NOT_STRING })
  @MinLength(ValidationConstants.OPTIONAL_MIN_STRING_LENGTH, { message: ValidationErrorCodes.MIN_LENGTH })
  @MaxLength(ValidationConstants.MAX_STRING_LENGTH, { message: ValidationErrorCodes.MAX_LENGTH })
  @ApiModelProperty({
    type: 'string',
    required: false,
    minLength: ValidationConstants.OPTIONAL_MIN_STRING_LENGTH,
    maxLength: ValidationConstants.MAX_STRING_LENGTH
  })
  readonly otherEthnicity?: string;
}
