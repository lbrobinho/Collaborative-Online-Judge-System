import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataService } from './services/data.service';
import { routing } from './app.route';
import { AppComponent } from './app.component';
import { ProblemListComponent } from './components/problem-list/problem-list.component';
import { ProblemDetailComponent } from './components/problem-detail/problem-detail.component';
import { NewProblemComponent } from './components/new-problem/new-problem.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { EditorComponent } from './components/editor/editor.component';
import { CollaborationService } from './services/collaboration.service';
import { SearchPipe } from './pipe/search.pipe';
import {InputService} from "./services/input.service";
@NgModule({
  declarations: [
    AppComponent,
    ProblemListComponent,
    ProblemDetailComponent,
    NewProblemComponent,
    NavbarComponent,
    EditorComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    DataService,
    CollaborationService,
    InputService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
