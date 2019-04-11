import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import * as moments from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TaskListService {
  
  constructor(protected http: HttpClient) { 

  }

  get(url: string, body: any): Promise<any> {
  	body = this.normalBody(body);
  	const pars = this.getUrlParams(body);

    return this.http.get(url).toPromise().then(res => res);
  }

  post(url: string, body: any): Promise<any> {
  	body = this.normalBody(body);

  	return this.http.post(url, body).toPromise().then(res => res);
  }

  del(url: string, body: any): Promise<any> {
    body = this.normalBody(body);

    return this.http.delete(url, body).toPromise().then(res => res);
  }

  // TODO: understand this
  formatDate(date: Date) {
    return moments(date).format('YYYY-MM-DD');
	}

  private normalBody(body: any): any {
    if (!body) {
      body = {};
    }
    for (const key in body) {
      if (!body.hasOwnProperty(key)) {
        continue;
      }
      if (body[key] instanceof Date) {
        body[key] = this.formatDate(body[key]);
      }
    }
    return body;
	}

	private getUrlParams(body: any): HttpParams {
    let params = new HttpParams();
    for (const key in body) {
      if (!body.hasOwnProperty(key)) {
        continue;
      }
      params = params.append(key, body[key]);
    }
    return params;
}

}