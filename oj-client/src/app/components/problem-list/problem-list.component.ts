import { Component, OnInit, OnDestroy } from '@angular/core';
import { Problem } from '../../models/problem.model';
import { DataService } from '../../services/data.service';
import { Subscription } from "rxjs/Subscription";
import { InputService } from "../../services/input.service";

@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.css']
})
export class ProblemListComponent implements OnInit, OnDestroy {
  //private problems list inside the component
  problems: Problem[];

  subscriptionProblems: Subscription;
  // inject data service in constructor
  // private: only avaliable in this component

  searchTerm: string = '';
  subscriptionInput: Subscription;

  constructor(private dataService: DataService,
               private inputService: InputService
              ) { }

  ngOnInit() { //
    //init problems list
    this.getProblems();
    this.getSearchTerm();
  }

  ngOnDestroy() {
    this.subscriptionProblems.unsubscribe();
  }

  getProblems() {
    this.subscriptionProblems = this.dataService.getProblems()
      .subscribe(problems => this.problems = problems);
  }

  getSearchTerm(): void {
    this.subscriptionInput = this.inputService.getInput().subscribe(
      inputTerm => this.searchTerm = inputTerm);
  }

}
