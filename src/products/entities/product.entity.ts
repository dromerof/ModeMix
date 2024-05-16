import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

import { ProductImage } from "./";
import { User } from "../../auth/entities/user.entity";

@Entity({name:"products"})
export class Product {

    @ApiProperty({
        example: "1f158f4c-9305-4068-883f-45292d4a9c9b",
        description: "Product ID",
        uniqueItems: true
    })
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ApiProperty({
        example: "Men's 3D Large Wordmark Tee",
        description: "Product Title",
        uniqueItems: true
    })
    @Column("text", {
        unique: true,
    })
    title: string;

    @ApiProperty({
        example: 35,
        description: "Product price",
    })
    @Column("float", {
        default: 0
    })
    price: number;

    @ApiProperty({
        example:"Designed for fit, comfort and style, the Men's 3D Large Wordmark Tee is made from 100% Peruvian cotton with a 3D silicone-printed Tesla wordmark printed across the chest.",
        description: "Product description",
        default: null,
    })
    @Column("text",{
        
        nullable: true
    })
    description: string

    @ApiProperty({
        example: "men_3d_large_wordmark_tee",
        description: "Product slug",
        uniqueItems: true,
    })
    @Column("text", {
        unique: true
    })
    slug: string

    @ApiProperty({
        example: 12,
        description: "Product stock",
        default: 0,
    })
    @Column("int", {
        default: 0
    })
    stock: number;

    @ApiProperty({
        example: ["XS, S, M"],
        description: "Product sizes",
    })
    @Column("text", {
        array: true
    })
    sizes: string[];

    @ApiProperty({
        example: "men",
        description: "Product gender",
    })
    @Column("text")
    gender: string;

    @ApiProperty({
        example: "shirt",
        description: "Product tags",
        default: []

    })
    @Column("text", {
        array: true,
        default: []
    })
    tags: string[];

    @ApiProperty({
        example: [
            "8764734-00-A_0_2000.jpg",
            "8764734-00-A_1.jpg"
        ],
        description: "Product images"
    })
    @OneToMany(
        () => ProductImage,
        (productImage) => productImage.product,
        {cascade: true, eager: true} 
    )
    images?: ProductImage[];

    @ManyToOne(
        () => User, 
        (user) => user.product,
        {eager: true}
    )
    user: User



    @BeforeInsert()
    checkSlugBeforeInsert() {

      if (!this.slug){
          this.slug = this.title;
      }
   
      this.slug = this.slug
        .toLowerCase()
        .replaceAll("'","")
        .replace(/[~`!@#$%^&*()+={}\[\];:\'\"<>.,\/\\\?/\s/]/g, '_');
    }

    @BeforeUpdate()
    checkSlugUpdate() {

        this.slug = this.slug
        .toLowerCase()
        .replaceAll("'","")
        .replace(/[~`!@#$%^&*()+={}\[\];:\'\"<>.,\/\\\?/\s/]/g, '_');
    }
}
