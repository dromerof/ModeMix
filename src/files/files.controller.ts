import { Controller, Post, Get, UploadedFile, UseInterceptors, BadRequestException, Param, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { Response } from 'express';
import { diskStorage } from 'multer';
import { FilesService } from './files.service';

import { fileFilter, fileNamer } from './helpers';

@ApiTags("Files - Get and Upload")
@Controller('files')
export class FilesController {
  constructor(
  private readonly filesService: FilesService,
  private readonly configService: ConfigService,
  ){}

  @Get("/product/:imageName")
  @ApiOperation({ summary: 'Retrieve the product image.' })
  @ApiResponse({ status: 200, description: 'Retrieve the product image.' }) 
  findProductImage(
    @Res() res: Response,
    @Param("imageName") imageName: string
  ){

    const path = this.filesService.getStaticProductImage(imageName)

    res.sendFile(path);
  }

  @Post("product")
  @ApiOperation({ summary: 'Upload a product image.' })
  @UseInterceptors(FileInterceptor("file", {
    fileFilter: fileFilter,
    storage: diskStorage({
      destination: "./static/products",
      filename: fileNamer
    })
  }))

  uploadProductImage(
    @UploadedFile() file: Express.Multer.File)
  {

    if (!file) {
      throw new BadRequestException("Make sure that the file is an image")
    }

    const secureUrl = `${this.configService.get("HOST_API")}/files/product/${file.filename}`

    return {secureUrl};
  }
}
