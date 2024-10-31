import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid'; // Import the dayGrid plugin
import timeGridPlugin from '@fullcalendar/timegrid'; // Import the timeGrid plugin
import interactionPlugin from '@fullcalendar/interaction'; // Import the interaction plugin
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Employee } from '../../core/employee';

@Component({
  selector: 'app-employee-attendance',
  templateUrl: './employee-attendance.component.html',
  styleUrl: './employee-attendance.component.scss'
})
export class EmployeeAttendanceComponent {


  selectedEmployee: Employee;
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: [
      {
        title: 'Event 1',
        start: '2024-08-20',
        color: '#FF5733' // Red color
      },
      {
        title: 'Event 2',
        start: '2024-08-20',
        color: '#33FF57' // Green color
      },
      {
        title: 'Event 3',
        start: '2024-08-20',
        color: '#3357FF' // Blue color
      },
      {
        title: 'Event 4',
        start: '2024-08-20',
        color: '#F5A623' // Orange color
      },
      // Repeat for other days or events as needed
    ],
    editable: true,
    selectable: true
  };
  constructor(public ref: DynamicDialogRef, private config: DynamicDialogConfig) {
    if(JSON.stringify(this.config.data)){
      this.selectedEmployee = <Employee>this.config.data;
      console.log(this.selectedEmployee)
    }
   }

  // On click on confirmation button
  confirmDeleteItem(status: boolean){
    this.ref.close(status);
  }
  
}
