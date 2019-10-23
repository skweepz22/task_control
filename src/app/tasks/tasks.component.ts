import { Component, OnInit} from '@angular/core';
import { TaskControlService } from '../task-control.service';
import { Task } from '../taskModel';
import { Router } from '@angular/router'

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  allTasks;
  modal = false;

  newTask = new Task();

  personalTasks = [];
  leaderTasks = [];
  notMyTasks = [];

  showAll = true;
  showPersonal = false;
  showLeader = false;
  showNotMe = false;

  errMsg = {
    err: false,
    msg: "Please fill in all inputs for new task!"
  };

  constructor(private service: TaskControlService, private router: Router) { }

  ngOnInit() {
    let tasks = this.service.getJsonData();
    this.allTasks = tasks.tasks;
    this.setTasks(tasks);
  }

  setTasks(data) {
    for(let i = 0; i < data.tasks.length; i++) {
      if (data.tasks[i].isGlobal) this.notMyTasks.push(data.tasks[i])
      if (!data.tasks[i].isGlobal) this.personalTasks.push(data.tasks[i]);
      if (data.tasks[i].isLeader) this.leaderTasks.push(data.tasks[i])
    }
  }

  addNewTask(){
    if(
      this.newTask.creator === "" ||
      this.newTask.isGlobal === undefined ||
      this.newTask.isLeader === undefined ||
      this.newTask.end === "" ||
      this.newTask.start === "" ||
      this.newTask.text === ""
    ) this.errMsg.err = true;
    else {
      this.errMsg.err = false;
      this.modal = false;
      this.service.addNew(this.newTask)
      this.router.navigateByUrl("/tasks")
    }
  }

  taskComplete(task){
    this.service.taskComplete(task);
  }

  setTeam() {
    this.showAll = false
    this.showLeader = false;
    this.showPersonal = false;
    this.showNotMe = true;
  }

  setPersonal() {
    this.showAll = false;
    this.showLeader = false;
    this.showPersonal = true;
    this.showNotMe = false;
  }

  setLeader() {
    this.showAll = false;
    this.showLeader = true;
    this.showPersonal = false;
    this.showNotMe = false;
  }

  setAll() {
    this.showAll = true;
    this.showLeader = false;
    this.showPersonal = false;
    this.showNotMe = false;
  }
}
