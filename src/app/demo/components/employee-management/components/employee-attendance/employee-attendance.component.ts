import { Component, ViewChild } from '@angular/core';
import { CalendarOptions, DatesSetArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid'; // Import the dayGrid plugin
import timeGridPlugin from '@fullcalendar/timegrid'; // Import the timeGrid plugin
import interactionPlugin from '@fullcalendar/interaction'; // Import the interaction plugin
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Employee } from '../../core/employee';
import { ZesnaEmployeeModel } from 'src/app/demo/model/zesna-employee-model';
import { ZesnaEmployeeService } from 'src/app/demo/service/zesna-services/zesna-employee.service';
import { OverallCookies } from 'src/app/demo/core/overall-cookies';
import { OverallCookieModel } from 'src/app/demo/model/zesna-cookie-model';
import { EmployeeAttendance } from 'src/app/demo/core/employee/employee-details';
import { DatePipe } from '@angular/common';
import { FullCalendarComponent } from '@fullcalendar/angular';

@Component({
  selector: 'app-employee-attendance',
  templateUrl: './employee-attendance.component.html',
  styleUrl: './employee-attendance.component.scss',
  providers: [DatePipe]
})
export class EmployeeAttendanceComponent {
  @ViewChild('fullCalendar') calendarComponent!: FullCalendarComponent;
  zesnaEmployeeModel: ZesnaEmployeeModel;
  selectedEmployee: Employee;
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    // datesSet: this.onDatesSet.bind(this),
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
    selectable: true,
    eventContent: (arg) => {
      const { event } = arg;
      const { Status, onTime, address, offTime, taskId, statusCode } = event.extendedProps;
      const eventContentContainer = document.createElement('div');
      eventContentContainer.classList.add('event-content'); // Add CSS class for styling

      // Determine the background color based on taskcheck and current date
      const isToday = new Date().toISOString().split('T')[0] === event.startStr;
      let backgroundColor = '#F0F3F8';
      let color = '#070807';

      if (isToday) {
        backgroundColor = '#0c66c5'; // Blue color for current date
        color = '#ffffff'; // White text color for better contrast on blue background
      } else {
        backgroundColor = '#cfded8'; // Blue color for current date
      }

      // Apply background color
      eventContentContainer.style.backgroundColor = backgroundColor;
      eventContentContainer.style.color = color;
      eventContentContainer.style.marginBottom = '4px';

      // Set the inner HTML for the event content

      eventContentContainer.innerHTML = `
        <div class="event-stage" style='    font-size: 10pt;
    text-align: center;
    padding-top: 5px;
    padding-bottom: 5px;'>${Status === 'S' ? 'Not Updated' :
          Status === 'P' ? 'Present' :
            Status === 'A' ? 'Absent' :
              Status === 'HD' ? 'Half Day' :
                Status === 'L' ? 'Full Day Leave' :
                  Status === 'SL' ? 'Sick Leave' :
                    Status === 'CL' ? 'Casual Leave' :
                      Status === 'EL' ? 'Earned Leave' :
                        Status === 'WFH' ? 'Work From Home' :
                          Status === 'PH' ? 'Public Holiday' :
                            Status === 'OD' ? 'On Duty' :
                              Status === 'CO' ? 'Compensatory Off' :
                                Status === 'T' ? 'Training' :
                                  'Unknown Status'}</div>
        <div style='display:flex;align-items:center;    justify-content: center;
    padding-bottom: 5px;'>
          <b style='padding-left:7px' class="${statusCode}">${new DatePipe('en-US').transform(onTime, 'hh:mm:ss')}</b>
          <b style='padding-left:7px' class="${statusCode}">${new DatePipe('en-US').transform(offTime, 'hh:mm:ss')}</b>
        </div>
      `;

      // Enable text wrapping
      eventContentContainer.style.wordWrap = 'break-word';
      eventContentContainer.style.whiteSpace = 'normal'; // Ensure normal whitespace behavior

      // Adjust width and font size
      eventContentContainer.style.width = '100%'; // Adjust width as needed
      eventContentContainer.style.fontSize = '12px'; // Adjust font size as needed

      return { domNodes: [eventContentContainer] };
    },
    customButtons: {
      next: {
        click: this.nextMonth.bind(this),
      },
      prev: {
        click: this.prevMonth.bind(this),
      },
      today: {
        click: this.currentMonthEvent.bind(this),
        text: 'Today'
      },
    }
  };
  // Store the cookie interface
  overallCookieInterface: OverallCookies;
  //Store logged user details
  loggedUserId: number = 0;
  loggedUserRole: string = '';
  currentYear: number = 2024;
  currentMonth: number = 11;
  estateId: number = 0;


  constructor(public ref: DynamicDialogRef, private config: DynamicDialogConfig,
    private _zesnaEmployeeService: ZesnaEmployeeService, private datePipe: DatePipe
  ) {
    if (JSON.stringify(this.config.data)) {
      this.selectedEmployee = <Employee>this.config.data['employee'];
      this.estateId = this.config.data['estateId'];
      console.log(this.selectedEmployee)
      this.zesnaEmployeeModel = new ZesnaEmployeeModel(this._zesnaEmployeeService);
      this.overallCookieInterface = new OverallCookieModel();
      this.loggedUserId = +this.overallCookieInterface.GetUserId();
      this.loggedUserRole = this.overallCookieInterface.GetUserRole();
    }

    //this.calendarOptions = { initialView: 'dayGridMonth', datesSet: this.onDatesSet.bind(this), };
  }

  ngOnInit() {
    const currentDate = new Date();
    this.currentYear = currentDate.getFullYear(); // Get the current year
    this.currentMonth = currentDate.getMonth() + 1; // Get the current month (0-based index)
    // Getting all the events
    //this.getAllEvents();
  }

  ngAfterViewInit() {
    // Wait for the calendar to initialize, then access its internal API
    // const calendarApi = this.fullCalendar.getCalendar();

    // if (calendarApi) {
    //   const currentDate = calendarApi.getDate(); // Current displayed date in the center of the view
    //   this.currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed
    //   this.currentYear = currentDate.getFullYear();

    //   console.log('Initial View Month:', this.currentMonth);
    //   console.log('Initial View Year:', this.currentYear);
    // }

  }

  // On click on confirmation button
  confirmDeleteItem(status: boolean) {
    this.ref.close(status);
  }

  // Getting all the events
  getAllEvents() {
    this.zesnaEmployeeModel.GetEmployeeAttendanceReportForMonth(this.selectedEmployee.Id, this.currentYear, this.currentMonth, this.estateId).then(
      (data: EmployeeAttendance[]) => {
        // Transform tasks into FullCalendar events with date ranges and additional properties
        let calendarEvents = data.map(task => {
          // Parse the task's due date and add one day to make it inclusive

          return {
            title: task.AttendanceSattus,
            start: new Date(task.AddedDate).toISOString(), // Convert to ISO string
            end: new Date(task.AddedDate).toISOString(), // Use the incremented due date and convert to ISO string
            extendedProps: {
              taskId: task.EmpoyeeId, // Include task ID here
              Status: task.AttendanceSattus,
              onTime: task.OnTime,
              offTime: task.OffTime
            }
          };
        });

        // Update calendarOptions with the new events
        this.calendarOptions = { ...this.calendarOptions, events: calendarEvents };
      }
    );
  }

  onDatesSet(dateInfo: { start: Date; end: Date }) {
    const selectedYear = dateInfo.start.getFullYear();
    const selectedMonth = dateInfo.start.getMonth(); // Note:
    this.currentYear = selectedYear;
    this.currentMonth = selectedMonth;
    this.getAllEvents(); // Fetch events for the new month
  }

  nextMonth() {
    const calendarApi = this.calendarComponent.getApi();
    calendarApi?.next();

    this.updateCurrentViewInfo(calendarApi);
  }

  prevMonth() {
    const calendarApi = this.calendarComponent.getApi();
    calendarApi?.prev();

    this.updateCurrentViewInfo(calendarApi);
  }

  currentMonthEvent() {
    const calendarApi = this.calendarComponent.getApi();
    calendarApi?.today();

    this.updateCurrentViewInfo(calendarApi);
  }

  updateCurrentViewInfo(calendarApi: any) {
    if (calendarApi) {
      const currentView = calendarApi.view;
      const currentYear = currentView.currentStart.getFullYear();
      const currentMonth = currentView.currentStart.getMonth() + 1; // Month is 0-based

      this.currentYear = currentYear;
      this.currentMonth = currentMonth;

      // Getting all the events
      this.getAllEvents();
    }
  }


}
