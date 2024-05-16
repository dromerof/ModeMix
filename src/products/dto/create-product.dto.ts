import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsIn, IsInt, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class CreateProductDto {

    @ApiProperty({
        description: "Product title (unique)",
        nullable: false,
        minLength: 1
    })
    @IsString()
    @MinLength(1)
    title: string;

    @ApiProperty({
        description: "Product title",
        required: false,
    })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?: number;

    @ApiProperty({
        description: "Product description",
        required: false
    })
    @IsString()
    @IsOptional()
    description?: string;
    
    @ApiProperty({
        description: "Product slug",
        required: false,
    })
    @IsString()
    @IsOptional()
    slug?: string;

    @ApiProperty({
        description: "Product stock",
        required: false,
    })
    @IsInt()
    @IsPositive()
    @IsOptional()
    stock?: number;

    @ApiProperty({
        description: "Available sizes for the product",
        type: [String],
        example: ["S", "M", "L"]
    })
    @IsString({each: true})
    @IsArray()
    sizes: string[];

    @ApiProperty({
        description: "Gender for which the product is intended",
        enum: ["men", "women", "kid", "unisex"]
    })
    @IsIn(["men", "women", "kid", "unisex"])
    gender: string;

    @ApiProperty({
        description: "Tags associated with the product",
        type: [String],
        example: ["trendy", "summer", "new arrival"]
    })
    @IsString({each: true})
    @IsArray()
    @IsOptional()
    tags: string[];

    @ApiProperty({
        description: "URLs of images associated with the product",
        type: [String],
        example: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
    })
    @IsString({each: true})
    @IsArray()
    @IsOptional()
    images?: string[];

}
