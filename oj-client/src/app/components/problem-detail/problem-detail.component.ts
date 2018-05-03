import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { Problem } from '../../models/problem.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-problem-detail',
  templateUrl: './problem-detail.component.html',
  styleUrls: ['./problem-detail.component.css']
})
export class ProblemDetailComponent implements OnInit {
  problem: Problem;

  constructor(private dataService: DataService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    //subscribe: when params changes, this.problem will be  updated
    //+: cover string to int
    this.route.params.subscribe(params => {
       this.dataService.getProblem(+params['id'])
         .then(problem => this.problem = problem);
    })
  }

}
