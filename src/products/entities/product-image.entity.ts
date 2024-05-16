import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name:"product_images"})
export class ProductImage {

    @ApiProperty({
        example: "123e4567-e89b-12d3-a456-426614174000",
        description: "ID único de la imagen del producto",
    })
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @ApiProperty({
        example: "https://example.com/image.jpg",
        description: "URL de la imagen del producto",
    })
    @Column("text")
    url: string;

    @ApiProperty({
        description: "Producto al que pertenece la imagen",
        type: () => Product
    })
    @ManyToOne(
        () => Product,
        (product) => product.images,
        {onDelete: "CASCADE"}
    )
    product: Product

}
