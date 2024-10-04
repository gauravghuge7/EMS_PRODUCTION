import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import { styled } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import axios from 'axios'

import convertToSimpleDate from "../components/Admin/TimeSetting/SetDate";


dayjs.extend(isBetweenPlugin);

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== 'isSelected' && prop !== 'isHovered' && prop !== 'isInRange',
})(({ theme, isSelected, isHovered, isInRange, day }) => ({
  borderRadius: 0,
  ...(isSelected && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.main,
    },
  }),
  ...(isHovered && {
    backgroundColor: theme.palette.action.hover,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.action.hover,
    },
  }),
  ...(isInRange && {
    backgroundColor: theme.palette.primary.light,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.light,
    },
  }),
  ...(day.day() === 0 && {
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
  }),
  ...(day.day() === 6 && {
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
  }),
}));

function Day(props) {
  const { day, selectedDay, startDate, endDate, hoveredDay, ...other } = props;
  const isInRange = day.isBetween(startDate, endDate, null, '[]');
  const isSelected = day.isSame(startDate, 'day') || day.isSame(endDate, 'day');

  return (
    <CustomPickersDay
      {...other}
      day={day}
      sx={{ px: 2.5 }}
      disableMargin
      selected={false}
      isSelected={isSelected}
      isInRange={isInRange}
      isHovered={!isSelected && !isInRange && day.isSame(hoveredDay, 'day')}
    />
  );
}

export default function Calendar() {
  const [date, setDate] = useState(dayjs());
  useEffect(() => {
    getEmployeeHistory();
  }, []);

  const [employeeHistory, setEmployeeHistory] = useState();
  const [startDate, setStartDate] = useState(dayjs(employeeHistory?.startDate));
  const [endDate, setEndDate] = useState(dayjs(employeeHistory?.endDate));
  const [dailyReport, setDailyReport] = useState([]);
  const [openOnClick, setOpenOnClick] = useState(false);

  const handleDailyClick = async(date) => {
    console.log(date)
    setOpenOnClick(true)
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };
      const body = {
        date: date,
      };
      const response = await axios.post(`/api/v1/user/getDailyReport`, body, config);
      console.log(response.data.data);
      setDailyReport(response.data.data);
    } 
    catch (error) {
      console.error('Error fetching employee history:', error);
    }
  }

  const getEmployeeHistory = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };
      const response = await axios.get(`/api/v1/admin/getLeaveEmployee`, config);
      console.log(response.data.data.at(-1));
      setStartDate(dayjs(response.data.data.at(-1).startDate))
      setEndDate(dayjs(response.data.data.at(-1).endDate))
    } catch (error) {
      console.error('Error fetching employee history:', error);
    }
  };

  return (
    <div className='pt-32 z-10 lg:scale-150 md:scale-125 sm:scale-100'>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={startDate}
          onChange={(e) => handleDailyClick(`${e.$y}-${e.$M + 1}-${e.$D}`)}
          showDaysOutsideCurrentMonth
          displayWeekNumber
          slots={{ day: Day }}
          slotProps={{
            day: (ownerState) => ({
              selectedDay: startDate,
              startDate: startDate,
              endDate: endDate,
            }),
          }}
        />
      </LocalizationProvider>

      <dialog open={openOnClick} className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
  <div className="relative bg-black text-white rounded-lg w-10/12 sm:w-8/12 md:w-1/2 lg:w-1/3 p-6 overflow-auto max-h-[80vh]">
    {dailyReport.length !== 0 ? (
      dailyReport.map((report, i) => (
        <div key={i} className="flex flex-col items-center space-y-4">
          <h3 className="text-center text-lg font-semibold">Today's Report</h3>
          <h1 className="text-center text-xl font-bold">{report.projectName}</h1>
          <h2 className="text-center text-blue-400 underline">{report.workUrl}</h2>
          <h2 className="text-center">{convertToSimpleDate(report.time)}</h2>
          <ul className="list-disc px-6 text-lg">
            <li>{report.report}</li>
          </ul>
          <button className="absolute top-2 right-4 text-xl" onClick={() => setOpenOnClick(false)}>x</button>
        </div>
      ))
    ) : (
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-center text-lg">No Daily Reports</h1>
        <button className="absolute top-2 right-4 text-xl" onClick={() => setOpenOnClick(false)}>x</button>
      </div>
    )}
  </div>
</dialog>


    </div>
  );
}
