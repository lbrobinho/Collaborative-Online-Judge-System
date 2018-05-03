import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";

@Injectable()
export class InputService {
  private inputSubject$ = new BehaviorSubject<string>('');

  constructor() { }

  changeInput(term) {
    this.inputSubject$.next(term);
  }

  getInput(): Observable<string> {
    return this.inputSubject$.asObservable();
  }
}
