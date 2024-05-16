import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class LoginUserDto {

    @ApiProperty({
        description: "Email address of the user",
        format: "email",
        example: "user@example.com"
    })
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: "Password for the user account",
        minLength: 6,
        maxLength: 50,
        format: "password",
        example: "Password123"
    })
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;

}