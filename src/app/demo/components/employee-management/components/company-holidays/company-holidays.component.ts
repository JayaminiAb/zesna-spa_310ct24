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
  allOverallHolidays: EventHoliday[] = [];
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
    eventContent: (arg) => {
      const { event } = arg;
      const eventContentContainer = document.createElement('div');
      eventContentContainer.classList.add('event-content'); // Add CSS class for styling
      
      // Determine the background color based on taskcheck and current date
      // Set the inner HTML for the event content
      eventContentContainer.innerHTML = `
        <div style='text-align:center'>
          Holiday
        </div>
      `;

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
    this.zesnaEstateModel = new ZesnaEstateModel(this._zesnaCommonService);
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
    const eventExists = this.allOverallHolidays.some(event => {
      const holidayDate = new Date(event.HolidayDate); // Convert string to Date object
      const formattedDate = `${holidayDate.getFullYear()}-${String(holidayDate.getMonth() + 1).padStart(2, '0')}-${String(holidayDate.getDate()).padStart(2, '0')}`;
      return formattedDate === info.dateStr;
    });

    if (!eventExists) {
      // Add the event only if it doesn't already exist
      this.addEvent({
        id: new Date().getTime().toString(), // Unique ID for the event
        title: 'Holiday', // Default title for the event
        start: info.dateStr, // Use the clicked date
        allDay: true
      });
    } else {
      // const eventsArray = this.calendarOptions.events as any[]; // Cast to array
      const clickedEvent = this.allOverallHolidays.find(event => {
        const holidayDate = new Date(event.HolidayDate); // Convert string to Date object
        const formattedDate = `${holidayDate.getFullYear()}-${String(holidayDate.getMonth() + 1).padStart(2, '0')}-${String(holidayDate.getDate()).padStart(2, '0')}`;
        return formattedDate === info.dateStr;
      });
      // Access the `id` from `extendedProps`
      const eventId = clickedEvent.Id;

      let eventHol = {
        Id: eventId,
        HolidayDate: new Date(),
        Name: "Holiday"
      };
      this.zesnaEmployeeModel.SetAllHolidays(eventHol, new Date().toString(), this.selectedEstate.Id, 'REMOVE').then(
        (data) => {
          this.getHolidays(this.currentYear, this.currentMonth);
        }

      );
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
    eventHol = {
      Id: 0,
      HolidayDate: new Date(),
      Name: "Holiday"
    };
    this.zesnaEmployeeModel.SetAllHolidays(eventHol, event.start.toString(), this.selectedEstate.Id, 'INSERT').then(
      (data) => {
        this.getHolidays(this.currentYear, this.currentMonth);
      }

    );
  }

  getHolidays(currentYear: number, currentMonth: number) {
    this.calendarOptions = {
      ...this.calendarOptions,
      events: [] // Clear all events
    };
    this.zesnaEmployeeModel.GetAllEventHoliday(currentYear, currentMonth, this.selectedEstate.Id).then(
      (data) => {
        let allHolidays: EventHoliday[] = <EventHoliday[]>data;
        this.allOverallHolidays = allHolidays;

        allHolidays.forEach(obj => {
          let calendarEvents = allHolidays.map(task => {

            // Parse the task's due date and add one day to make it inclusive
            const dueDate = new Date(task.HolidayDate);
            dueDate.setDate(dueDate.getDate() + 1); // Increment the due date by one day

            return {
              title: "Holiday",
              start: new Date(task.HolidayDate).toISOString(), // Convert to ISO string
              end: new Date(dueDate).toISOString(), // Use the incremented due date and convert to ISO string
              extendedProps: {
                id: task.Id
              }
            };
          });
          // Update calendarOptions with the new events
          this.calendarOptions = { ...this.calendarOptions, events: calendarEvents };
        });
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
    let eventHol: EventHoliday = { Id: 0, Name: 'Holiday', HolidayDate: new Date() };
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
