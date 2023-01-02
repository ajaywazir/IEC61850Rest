// SPDX-FileCopyrightText: 2022 2023 Samir Romdhani <samir.romdhani1994@gmail.com>
//
// SPDX-License-Identifier: MIT license

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScllibService } from '@opentemplate/scl-lib-rest';
import { ProductModule } from './product/product.module';

@Module({
  imports: [ProductModule],
  controllers: [AppController],
  providers: [AppService, ScllibService],
})
export class AppModule {}
