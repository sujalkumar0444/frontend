import moment from 'moment'
import './style.scss';
import './style.css'
import { useState } from 'react';


const DayNames = {
  1: '',
  3: '',
  5: ''
}

function Cell({ color, count }) {
  let style = {
    backgroundColor: color
  };

  // setIsNewMonth(count.date);

  
  console.log(parseInt(JSON.stringify(count.date).substring(9, 11)))
  
  return (
    <div
      className='timeline-cells-cell'
      style={{
        ...style,
        marginLeft: parseInt(JSON.stringify(count.date).substring(9, 11)) == 1 ? '40px' : '0'
      }}
      title={`Date : ${JSON.stringify(count.date).substring(1, 11)} \nSolved : ${JSON.stringify(count.value)}`}
    ></div>
  )
  
  
}


function Month({ startDate, index }) {
  let date = moment(startDate).add(index * 7, 'day');
  let monthName = date.format('MMM');

  return (
    <div className={`timeline-months-month ${monthName}`}>
      {monthName}
    </div>
  )
}

function WeekDay({ index }) {
  return (
    <div className='timeline-weekdays-weekday'>
      {DayNames[index]}
    </div>
  )
}

function Timeline({ range, data, colorFunc }) {
  let days = Math.abs(range[0].diff(range[1], 'days'));
  let cells = Array.from(new Array(days));
  let weekDays = Array.from(new Array(7));
  let months = Array.from(new Array(Math.floor(days / 7)));

  let min = Math.min(0, ...data.map(d => d.value));
  let max = Math.max(...data.map(d => d.value));

  let colorMultiplier = 1 / (max - min);

  let startDate = range[0];
  const DayFormat = 'DDMMYYYY';


  return (
    <div className='timeline'>

      <div className="timeline-months">
        {months.map((_, index) => <Month key={index} index={index} startDate={startDate} />)}
      </div>

      <div className="timeline-body">

        <div className="timeline-weekdays">
          {weekDays.map((_, index) => <WeekDay key={index} index={index} startDate={startDate} />)}
        </div>

        <div className="timeline-cells">
          {cells.map((_, index) => {
            let date = moment(startDate).add(index, 'day');
            // console.log(date)
            let dataPoint = data.find(d => moment(date).format(DayFormat) === moment(d.date).format(DayFormat));
            let alpha = colorMultiplier * dataPoint.value;
            let color = colorFunc({ alpha });

            return (
              <Cell
                key={index}
                index={index}
                date={date}
                color={color}
                count = {dataPoint}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Heatmap() {

  // const [isNewMonth, setIsNewMonth] = useState(false);
  // 1 year range
  let startDate = moment().add(-120, 'days');
  let dateRange = [startDate, moment()];


  let data = Array.from(new Array(365)).map((_, index) => {
    return {
      date: moment(startDate).add(index, 'day'),
      value: Math.floor(Math.random() * 100)
    };
  });
  //replace with actual data

  return (
    <>
      <Timeline range={dateRange} data={data} colorFunc={({ alpha }) => `rgba(5, 5,  200, ${alpha})`} />
    </>
  )
}

export default Heatmap;