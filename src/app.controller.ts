// SPDX-FileCopyrightText: 2023 Samir Romdhani <samir.romdhani1994@gmail.com>
//
// SPDX-License-Identifier: MIT license

import { Controller, Get, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { Response } from "express";
import { AppService } from './app.service';
import { _SCLType } from '@opentemplate/scl-lib';
import { ScllibService } from '@opentemplate/scl-lib-rest';
import * as uuid from "uuid";
import { map, tap } from 'rxjs';

const namespaces: any = {
  namespacePrefixes: {
    "http://www.iec.ch/61850/2003/SCL": "",
    "http://www.w3.org/2001/XMLSchema": "xs"
  },
  mappingStyle : "simplified"
};

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly scllibService: ScllibService) {
      this.scllibService.setContext(namespaces);
    }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @HttpCode(HttpStatus.OK)
  @Get('test1')
  async test1(@Res() res: Response) {
    const scl: _SCLType = {
      release: 4,
      revision: "B",
      version: "2007",
      header: {
        id: uuid.v4()
      }
    };
    try {
      return this.scllibService.marshalDocument({ SCL: scl })
        .pipe(
          map((data) => {
            res.set('Content-Type', 'text/xml');
            return res.status(200).send(data.toString());
          }),
          tap({
            error:(err: Error) =>  {
              return res.status(500).send(err.message);
            }
          }))
        .subscribe()
    } catch (err) {
      throw err;
    } 
  }

  @HttpCode(HttpStatus.OK)
  @Get('test2')
  async test2(@Res() res: Response) {
    const testFile1 = `https://raw.githubusercontent.com/romdhanisam/open-template/main/projects/scllib/src/tests/files/samples/test1.xml`;
    try {
      return this.scllibService.unmarshalURL(testFile1)
        .pipe(
          map((data) => {
            return res.status(200).send(data);
          }))
        .subscribe()
    } catch (err) {
      throw err;
    } 
  }
}