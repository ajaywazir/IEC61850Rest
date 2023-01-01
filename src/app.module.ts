// SPDX-FileCopyrightText: 2023 Samir Romdhani <samir.romdhani1994@gmail.com>
//
// SPDX-License-Identifier: MIT license

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScllibService } from '@opentemplate/scl-lib-rest';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ScllibService],
})
export class AppModule {}
