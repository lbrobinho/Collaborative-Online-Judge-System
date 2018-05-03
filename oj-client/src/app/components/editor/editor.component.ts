import { Component, OnInit } from '@angular/core';
import { CollaborationService } from "../../services/collaboration.service";
import { ActivatedRoute, Params } from "@angular/router";
import { DataService } from '../../services/data.service';

declare var ace: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  editor: any;
  public languages: string[] = ['Java', 'Python'];
  language: string = 'Java';
  sessionId: string;
  output: string = '';

  defaultContent = {
    'Java': `public class Example {
      public static void main(String[] args) {
      //type your Java code here
      }
    }`,
    'Python':  `class Solution:
            def example():
              # write your python code here.
            `
  };
  constructor(private collaborationService: CollaborationService,
              private route:ActivatedRoute,
              private dataService: DataService) { }

  ngOnInit() {

    // use problem id as session id
    // since we subscribe the changes, every time the params changes
    // sessionId will be updated and the editor will be initilized
    this.route.params.subscribe(params => {
      this.sessionId = params['id'];
      this.initEditor();
    });

    this.collaborationService.restoreBuffer();
  }

  initEditor(): void {
    this.editor = ace.edit("editor");
    this.editor.setTheme("ace/theme/eclipse");
    this.resetEditor();
    // setup collaboration socket
    this.collaborationService.init(this.editor, this.sessionId);
    this.editor.lastAppliedChange = null;
    //registrer change callback
    this.editor.on("change", (e) => {
      console.log('editor changes:' + JSON.stringify(e));
      // check if the change is same as last change,
      // if they are the same, skip this change
      if(this.editor.lastAppliedChange != e) {
        this.collaborationService.change(JSON.stringify(e));
      }
    })
  }

  resetEditor(): void {
    this.editor.setValue(this.defaultContent[this.language]);
    this.editor.getSession().setMode("ace/mode" + this.language.toLowerCase());
  }

  setLanguage(language: string): void {
    this.language = language;
    this.resetEditor();
  }

  submit(): void {
    let userCode = this.editor.getValue();
    console.log(userCode);

    // create object that contains user's code and language
    // send this to server

    const data ={
      user_code: userCode,
      lang: this.language.toLocaleLowerCase()
    };

    // buildAndRun return a Promise
    this.dataService.buildAndRun(data).then(
      res => this.output = res);
  }

}
