import { Injectable } from '@angular/core';
import { Problem } from '../models/problem.model';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import {_catch} from "rxjs/operator/catch";

@Injectable()
export class DataService {
  // private field start with _
  // BehavivorSubject: when subscribe, we can get the value that emitted last time.
   // Subject: when subscribe, we can only get the value that emitted after subscribe and we cannot get value that emitted before we subscribe
  private _problemSource = new BehaviorSubject<Problem[]>([]);

  constructor(private httpClient: HttpClient) { }

  //return a list of problems
  getProblems(): Observable<Problem[]> {
     this.httpClient.get('/api/v1/problems')
       .toPromise()
       .then((res: any) => {
       //.next: next data
       this._problemSource.next(res);
    })
       .catch(this.handleError);
     return this._problemSource.asObservable();
  }

  //input: id,
  //return a problem by id
  getProblem(id: number): Promise<Problem> {
    //for every problem, if problem.id === id, return this problem.
    //== : check value
    //=== : check value and type
    //1 == "1" => true
    //1 === "1" => false
    //arrow function
    return this.httpClient.get(`/api/v1/problems/${id}`)
      .toPromise()
      .then((res: any) => res)
      .catch(this.handleError);
  }

  addProblem(problem: Problem) {
    // "Content-Type" is case sensitive
    const options = { headers: new HttpHeaders( { 'Content-Type': 'application/json'})};
    return this.httpClient.post('api/v1/problems', problem, options)
      .toPromise()
      .then((res: any) => {
        // any: type, don't care the type
        // update the _problemSource
        this.getProblems();
        return res;
      })
      .catch(this.handleError);
  }

  buildAndRun(data): Promise<any> {

    // define the Content-Type in http request header
    // Content-Type declears the body type when you issue a POST request
    const options = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

    return this.httpClient.post('api/v1/build_and_run', data, options)
      .toPromise() // convert observable to promise
      .then(res => {
        console.log(res);
        return res;
      })
      .catch(this.handleError);
  }

  private handleError(err: any): Promise<any> {
    return Promise.reject(err.body || err);
  }


}
