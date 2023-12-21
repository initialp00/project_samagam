import React, { useEffect ,useState, useRef } from 'react';
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { scheduleData } from '../data/dummy';
import { Header } from '../components';
import { saveAs } from 'file-saver';


// eslint-disable-next-line react/destructuring-assignment
const PropertyPane = (props) => <div className="mt-5">{props.children}</div>;

const Events = () => {
  const [scheduleObj, setScheduleObj] = useState();
  const [scheduleData, setScheduleData] = useState([]); //state to store schedule data 
  const eventIdCounter = useRef(0); //unique event id generator and counter 


  const change = (args) => {
    scheduleObj.selectedDate = args.value;
    scheduleObj.dataBind();
  };

  const onDragStart = (arg) => {
    // eslint-disable-next-line no-param-reassign
    arg.navigation.enable = true;
  };

  const handleFileChange = (event) => { 
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const content = event.target.result;
      try{
        const parsedData = JSON.parse(content);
        setScheduleData(parsedData);
      } catch(error) {
        console.error('Error parsing JSON:', error);
      }
    };
    reader.readAsText(file);
  };

  const handleEventCreate = (args) => {
    const eventData = args.data;
    const jsonData = JSON.stringify(eventData, null , 2);
    if (args.requestType === 'eventCreate') {
      console.log('New event created:', JSON.stringify(eventData, null, 2));  
    } else if (args.requestType ==='eventChange'){
      console.log('Event edited:', JSON.stringify(eventData, null,2));
    }
    
  const blob = new Blob([jsonData],{type: 'text/plain;charset=utf-8'});
    saveAs(blob, 'event_data.txt');
    console.log('event data:', jsonData); 

  };



  return (
    
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-orange-300 rounded-3xl">
      <Header category="App" title="Events" />
      <input type = "file" accept = ".txt" onChange={handleFileChange}/>
      <ScheduleComponent
        height="580px"
        ref={(schedule) => setScheduleObj(schedule)}
        selectedDate={new Date()}
        eventSettings={{ dataSource: scheduleData }}
        dragStart={onDragStart}
        actionBegin={(args) => {
          if (args.requestType === 'eventCreate') {
            handleEventCreate(args);
          }else if (args.requestType === 'eventChange'){
            handleEventCreate(args);
          }
        }}
        

        
      >

        <ViewsDirective>
          { ['Day', 'Week', 'WorkWeek', 'Month', 'Agenda'].map((item) => <ViewDirective key={item} option={item} />)}
        </ViewsDirective>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
        {/* make an event editable for only specific days not just all the days if its on repeat
       */}
      </ScheduleComponent>
      <PropertyPane>
        <table
          style={{ width: '100%', background: 'blurywood' }}
        >
          <tbody>
            <tr style={{ height: '50px' }}>
              <td style={{ width: '100%' }}>
                
                <DatePickerComponent
                  value={new Date()}
                  showClearButton={true}
                  placeholder="Current Date"
                  floatLabelType="Always"
                  change={change}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </PropertyPane>
    </div>
  );
};

export default Events;
