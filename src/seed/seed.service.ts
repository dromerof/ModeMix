import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from '../products/products.service';
import { initialData } from './data/seed-data';
import { User } from '../auth/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService {
  constructor (
    private readonly productsService: ProductsService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async runSeed() {

    await this.deleteTables();
    const adminUser = await this.insertUsers();
    await this.insertNewProducts(adminUser);

    return "SEED EXECUTED";
  }

  private async deleteTables(){
    
    await this.productsService.deleteAllProducts();

    const quertBuilder = this.userRepository.createQueryBuilder();
    await quertBuilder 
    .delete()
    .where({})
    .execute()
  }

  private async insertUsers() {
    const seedUsers = initialData.users;
 
    const users: User[] = [];
 
    seedUsers.forEach((user) => {
      user.password = bcrypt.hashSync(user.password, 10);
      users.push(this.userRepository.create(user));
    });
 
    await this.userRepository.save(users);
    return users[0];
  }

  private async insertNewProducts(user: User) {
    await this.productsService.deleteAllProducts();

    const products = initialData.products;

    const insertPromise = [];

    products.forEach(product => {
      insertPromise.push( this.productsService.create(product, user));
    })
    
    await Promise.all(insertPromise)

    return true;
  }

}
