// SPDX-FileCopyrightText: 2022 2023 Samir Romdhani <samir.romdhani1994@gmail.com>
//
// SPDX-License-Identifier: MIT license

import { Controller, Get, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { Response } from "express";
import { AppService } from './app.service';
import { _SCLType, _tIED } from '@opentemplate/scl-lib';
import { ScllibService } from '@opentemplate/scl-lib-rest';
import { map, tap } from 'rxjs';
import { SCLElement } from '@opentemplate/scl-lib-adapter-way';

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

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @HttpCode(HttpStatus.OK)
  @Get('test1')
  async test1(@Res() response: Response) {
    const scl: SCLElement = this.appService.init();
    this.appService.init2().subscribe((res)  => {
      for (let index = 0; index < 1; index++) {
        scl.addIED(res, "TEST"+index);
      };
      try {
        return this.scllibService.marshalDocument({ SCL: scl.getElement() })
          .pipe(
            map((data) => {
              console.log("DONE");
              response.set('Content-Type', 'text/xml');
              return response.status(200).send(data.toString());
            }),
            tap({
              error:(err: Error) =>  {
                return response.status(500).send(err.message);
              }
            }))
          .subscribe()
      } catch (err) {
        throw err;
      } 
    });
  }

  @HttpCode(HttpStatus.OK)
  @Get('test2')
  async test2(@Res() res: Response) {
    const testFile1 = `https://raw.githubusercontent.com/open-template/open-template/main/projects/scllib/src/tests/files/samples/test1.xml`;
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