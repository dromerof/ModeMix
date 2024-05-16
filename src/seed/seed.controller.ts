import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';

import { Auth } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';

import { SeedService } from './seed.service';

@ApiTags("Seed")
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  @ApiOperation({ summary: 'Execute seed data population.' }) // Documentamos la operación con una descripción resumida
  @ApiResponse({ status: 200, description: 'Seed data execution successful.' }) // Documentamos la respuesta exitosa
  // @Auth(ValidRoles.admin) // Descomenta esta línea para habilitar la autenticación y autorización basadas en roles
  executeSeed(){
    return this.seedService.runSeed()
  }
}
