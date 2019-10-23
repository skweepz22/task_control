import { Component, OnInit } from '@angular/core';
import { TaskControlService } from './task-control.service'
import { faHome, faTasks } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  faHome = faHome;
  faTasks = faTasks
  globalTasks;
  personalTasks; 

  constructor(private service: TaskControlService){}

  ngOnInit(){
    this.setTasks(this.service.getJsonData())
  }

  setTasks(data) {
    for (let i = 0; i < data.tasks.length; i++) {
      if (data.tasks[i].isGlobal) this.service.globalTaskCount++
      else this.service.personalTaskCount++
    }

    this.globalTasks = this.service.globalTaskCount;
    this.personalTasks = this.service.personalTaskCount;
  }
}
