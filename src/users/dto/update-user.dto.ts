import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    first_name?: string;
    last_name?: string;
    username?: string;
    password?: string;
    authStrategy?: string;
}
