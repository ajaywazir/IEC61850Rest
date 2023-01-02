import { Injectable } from '@nestjs/common';
import { IType, _SCLType, _tIED } from '@opentemplate/scl-lib';
import { SCLElement } from '@opentemplate/scl-lib-adapter-way';
import { ScllibService } from '@opentemplate/scl-lib-rest';
import { map, Observable } from 'rxjs';
import * as uuid from "uuid";

const namespaces: any = {
  namespacePrefixes: {
    "http://www.iec.ch/61850/2003/SCL": "",
    "http://www.w3.org/2001/XMLSchema": "xs"
  },
  mappingStyle : "simplified"
};

@Injectable()
export class AppService {

  constructor(private readonly scllibService: ScllibService) {
      this.scllibService.setContext(namespaces);
    }
  
  getHello(): string {
    return 'Hello World!';
  }

  init(): SCLElement {
    const scl: _SCLType = {
      release: 4,
      revision: "B",
      version: "2007",
      header: null
    };
    let sclElement: SCLElement = new SCLElement(scl);
    sclElement.addHeaderElement(uuid.v4(), "v1", "v1");
    sclElement.getElement().ied = [] ;
    return sclElement;
  }

  init2(): Observable<_SCLType> {
    const testFile1 = `https://raw.githubusercontent.com/open-template/open-template/main/projects/scllib/src/tests/files/samples/test1.xml`;
    const testFile2 = `https://raw.githubusercontent.com/samirromdhani/Jaxb-PERF/testing/perf/src/test/resources/PERF/basic-7MB.xml`;
    return this.scllibService.unmarshalURL(testFile2)
    .pipe(map((data: IType) => {
      return data.SCL;
      }));
  }
}
