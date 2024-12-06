import { Component, ViewChild } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';

@Component({
  selector: 'app-company-holidays',
  templateUrl: './company-holidays.component.html',
  styleUrls: ['./company-holidays.component.scss']
})
export class CompanyHolidaysComponent {
  @ViewChild('fullCalendar') calendarComponent!: FullCalendarComponent;

  events: EventInput[] = []; // Store events

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
  };

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
    console.log(this.calendarOptions.events)
  }

  /**
   * Method to remove an event by its ID
   * @param id The ID of the event to remove
   */
  removeEvent(id: string) {
    this.events = this.events.filter(event => event.id !== id); // Remove the event by ID
    this.calendarOptions.events = [...this.events]; // Refresh the calendar options
  }

  /**
   * Custom render function to add delete button to events
   */
  renderEventContent(eventInfo: any) {
    const deleteButton = document.createElement('i');
    deleteButton.classList.add('fa', 'fa-times');
   
    deleteButton.onclick = () => this.removeEvent(eventInfo.event.id);

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
}
