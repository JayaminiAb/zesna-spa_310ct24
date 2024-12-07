import { Component, ViewChild } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { ZesnaCommonService } from 'src/app/demo/service/zesna-services/zesna-common.service';
import { ZesnaEmployeeService } from 'src/app/demo/service/zesna-services/zesna-employee.service';
import { OverallCookieModel } from 'src/app/demo/model/zesna-cookie-model';
import { ZesnaEmployeeModel } from 'src/app/demo/model/zesna-employee-model';
import { ZesnaEstateModel } from 'src/app/demo/model/zesna-estate-model';
import { OverallCookies } from 'src/app/demo/core/overall-cookies';
import { EventHoliday } from 'src/app/demo/core/employee/employee-details';
import { EstateDetails } from 'src/app/demo/core/estate/estate-details';


@Component({
  selector: 'app-company-holidays',
  templateUrl: './company-holidays.component.html',
  styleUrls: ['./company-holidays.component.scss']
})
export class CompanyHolidaysComponent {
  @ViewChild('fullCalendar') calendarComponent!: FullCalendarComponent;

  events: EventInput[] = []; // Store events
  //Store estate model
  zesnaEstateModel: ZesnaEstateModel;
  zesnaEmployeeModel: ZesnaEmployeeModel;
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    editable: false, // Disable drag-and-drop
    droppable: false, // Prevent external drops
    selectable: true, // Allow selecting dates
    dateClick: this.onDateClick.bind(this), // Bind dateClick to a function
    events: this.events, // Bind the event array to the calendar
    eventContent: this.renderEventContent.bind(this), // Use a custom render function
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
  //Store logged user details
  loggedUserId: number = 0;
  loggedUserRole: string = '';
  // Store the cookie interface
  overallCookieInterface: OverallCookies;
  selectedEstate: EstateDetails = {
    Id: 0,
    Name: '',
    AddressDetails: '',
    ContactNumber: '',
    OtherDetails: '',
    Balance: 0,
    Total: 0
  };
  estateList: EstateDetails[] = [];
  currentYear: number = new Date().getFullYear();
  currentMonth: number = new Date().getMonth();
  constructor(
    private _zesnaCommonService: ZesnaCommonService,
    private _zesnaEmployeeService: ZesnaEmployeeService,) {
    this.zesnaEmployeeModel = new ZesnaEmployeeModel(this._zesnaEmployeeService);
    this.overallCookieInterface = new OverallCookieModel();
    this.loggedUserId = +this.overallCookieInterface.GetUserId();
    this.loggedUserRole = this.overallCookieInterface.GetUserRole();
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
    this.getEstateListByUserId();
   
  }

  /**
   * Event handler for clicking on a date
   */
  onDateClick(info: any) {
    // Check if an event already exists for the clicked date
    const eventExists = this.events.some(event => event.start === info.dateStr);
  
    if (!eventExists) {
      // Add the event only if it doesn't already exist
      this.addEvent({
        id: new Date().getTime().toString(), // Unique ID for the event
        title: 'Holiday', // Default title for the event
        start: info.dateStr, // Use the clicked date
        allDay: true
      });
    } else {
      alert('An event already exists for this day!');
    }
  }

  /**
   * Method to programmatically add an event
   * @param event The event object to add
   */
  addEvent(event: EventInput) {
    this.events = [...this.events, event]; // Add the new event to the array
    this.calendarOptions.events = [...this.events]; // Refresh the calendar options
    let eventHol: EventHoliday;
    this.zesnaEmployeeModel.SetAllHolidays(eventHol, event.start.toString(), this.selectedEstate.Id, 'INSERT').then(
      (data) => {
       this.getHolidays(this.currentYear, this.currentMonth);
      }

    );
  }

  getHolidays(currentYear: number, currentMonth: number){
    this.zesnaEmployeeModel.GetAllEventHoliday(currentYear, currentMonth, this.selectedEstate.Id, 'INSERT').then(
      (data) => {
      
      }

    );// Refresh the calendar options
  }
  onEstateChange(event: any) {

    const calendarApi = this.calendarComponent.getApi();
    calendarApi?.today();
    this.updateCurrentViewInfo(calendarApi);
  }
  /**
   * Method to remove an event by its ID
   * @param id The ID of the event to remove
   */
  removeEvent(event: EventInput) {
    let eventHol: EventHoliday = {Id: 0, Name: 'Holiday' };
    this.zesnaEmployeeModel.SetAllHolidays(eventHol, event.start.toString(), this.selectedEstate.Id, 'INSERT').then(
      (data) => {
       this.getHolidays(this.currentYear, this.currentMonth);
      }

    );// Refresh the calendar options
  }

  /**
   * Custom render function to add delete button to events
   */
  renderEventContent(eventInfo: any) {
    const deleteButton = document.createElement('i');
    deleteButton.classList.add('fa', 'fa-times');
   
    deleteButton.onclick = () => this.removeEvent(eventInfo.event);

    const eventTitle = document.createElement('span');
    eventTitle.innerText = eventInfo.event.title;

    const eventWrapper = document.createElement('div');
    eventWrapper.style.display = 'flex';
    eventWrapper.style.alignItems = 'center';

    eventWrapper.style.justifyContent = 'space-between';

    eventWrapper.style.padding = '3px 10px';

    
    eventWrapper.appendChild(eventTitle);
    eventWrapper.appendChild(deleteButton);

    return { domNodes: [eventWrapper] };
  }


  getEstateListByUserId() {
    this.zesnaEstateModel.GetAllEstatesByUserId(this.loggedUserId).then(
      (data) => {
        if (data) {
          this.estateList = data;
          this.selectedEstate = this.deep(this.estateList[0]);
          const calendarApi = this.calendarComponent.getApi();
          calendarApi?.today();
          this.updateCurrentViewInfo(calendarApi);
        }
      }
    );
  }
   // Making a deep copy
   deep<T extends any>(source: T): T {
    return JSON.parse(JSON.stringify(source));
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
      this.getHolidays(this.currentYear, this.currentMonth);
    }
  }
}
