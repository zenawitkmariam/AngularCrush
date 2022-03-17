import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TASKS } from '../../mock-tasks';
import { Task } from '../../Task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
 tasks : Task[] = TASKS;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks)=> {
      this.tasks = tasks;
    });
  }
  public onRemoveTask(task: Task){
      this.taskService.removeTask(task).subscribe(()=>
        this.tasks = this.tasks.filter(t=>t.id !== task.id)
      );
  }
  public toggleReminder(task:Task){
      task.reminder = !task.reminder;
      this.taskService.updateTask(task).subscribe((task)=> {

      });
  }
  public addTask(event:any){
    this.taskService.addTask(event).subscribe((task)=>{
      this.tasks.push(task);
    });
  }
}
