import { Controller, Get } from '@nestjs/common';

import { Auth } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';

import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  // @Auth(ValidRoles.admin)
  executeSeed(){
    return this.seedService.runSeed()
  }
}
