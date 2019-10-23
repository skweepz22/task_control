import { Component, OnInit } from '@angular/core';
import { TaskControlService } from '../task-control.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  globalTasks = [];
  personalTasks = [];
  leaderTasks = [];
  global = true;
  personal = false;
  leader = false;

  constructor(private service: TaskControlService) { }

  ngOnInit() {
    this.setTasks(this.service.getJsonData());
  }

  setTasks(data) {
    for(let i = 0; i < data.tasks.length; i++) {
      if (data.tasks[i].isGlobal) this.globalTasks.push(data.tasks[i])
      if (!data.tasks[i].isGlobal) this.personalTasks.push(data.tasks[i]);
      if (data.tasks[i].isLeader) this.leaderTasks.push(data.tasks[i])
    }
  }

  setGlobal() {
    this.global = true;
    this.personal = false;
    this.leader = false;
  }

  setPersonal() {
    this.global = false;
    this.personal = true;
    this.leader = false;
  }

  setLeader() {
    this.global = false;
    this.personal = false;
    this.leader = true;
  }

  taskComplete(task){
    this.service.taskComplete(task);
  }
}
