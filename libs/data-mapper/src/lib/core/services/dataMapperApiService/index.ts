import type { FunctionManifest } from '../../../models/Function';
import type { DataMapperApiServiceOptions } from './DataMapperApiService';
import { DataMapperApiService } from './DataMapperApiService';
import { AssertionErrorCode, AssertionException } from '@microsoft-logic-apps/utils';

let service: IDataMapperApiService;

export const defaultDataMapperApiServiceOptions = {
  baseUrl: 'http://localhost:7071',
  accessToken: '',
};

export interface IDataMapperApiService {
  getFunctionsManifest(): Promise<FunctionManifest>;
  getSchemas(): Promise<SchemaInfoProperties[]>;
  getSchemaFile(schemaName: string): Promise<any>;
  generateDataMapXslt(dataMapDefinition: string): Promise<string>;
  testDataMap(dataMapXsltFilename: string, schemaInputValue: string): Promise<TestMapResponse>;
}

export const InitDataMapperApiService = (options: DataMapperApiServiceOptions) => {
  service = new DataMapperApiService(options);
};

export const InitOtherDMService = (newService: IDataMapperApiService) => {
  service = newService;
};

export const DataMapperApiServiceInstance = (): IDataMapperApiService => {
  if (!service) {
    throw new AssertionException(AssertionErrorCode.SERVICE_NOT_INITIALIZED, 'DataMapperApiService needs to be initialized before using');
  }

  return service;
};

export interface SchemaInfoProperties {
  name: string;
  size: number;
  mtime: string;
  crtime: string;
  mime: string;
  href: string;
  path: string;
}

export enum ResourceType {
  schemaList = 'schemaList',
}

export interface GenerateXsltResponse {
  xsltContent: string;
}

export interface TestMapResponse {
  statusCode: number;
  statusText: string;
  outputInstance?: {
    $content: string;
    '$content-type': string;
  };
}
