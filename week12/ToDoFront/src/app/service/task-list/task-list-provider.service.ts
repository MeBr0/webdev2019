import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskListProviderService {

  constructor(protected http: HttpClient) { 

  }

  get(url: string, body: any): Promise<any> {
    return this.http.get(url).toPromise().then(res => res);
  }


}
