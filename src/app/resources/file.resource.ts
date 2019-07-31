import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { RequestMethod } from '@angular/http';
import { HttpClient, RequestBuilder, AuthenticationService } from 'app/core';
import { FileUrlUploadResponse } from 'app/models';
import { BearerHeadersAppender } from './resource-headers.appender';
import { API_URL } from './constants';

const ENDPOINTS = {
  GET_UPLOAD_URL: 'media/signed-url',
};

@Injectable()
export class FileResource {

  constructor(
    private httpClient: HttpClient,
    private authService: AuthenticationService,
  ) {}

  getUploadUrl(fileName: string): Observable<FileUrlUploadResponse> {
    let requestBuilder = new RequestBuilder(RequestMethod.Post, API_URL, ENDPOINTS.GET_UPLOAD_URL)
                              .withHeader(new BearerHeadersAppender(this.authService.getToken()))
                              .withBody({ fileName });
    return this.httpClient.request(requestBuilder).map(response => response.data);
  }

  upload(file: File, urlToUpload: string): Observable<any> {
    let requestBuilder = new RequestBuilder(RequestMethod.Put, urlToUpload)
                              .withBody(file);
    return this.httpClient.request(requestBuilder);
  }
}
