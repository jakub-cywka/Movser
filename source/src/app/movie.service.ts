import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private httpClient: HttpClient) { }

  public apiKey = '261bc538';
  public apiUrl = `http://www.omdbapi.com/?apikey=${this.apiKey}`;

  public getVideo(title: string): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}&t=${title}`);
  }
}
