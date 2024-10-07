import React, {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import dayjs from 'dayjs';
import isBetweenPlugin from 'dayjs/plugin/isBetween';

import { styled } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import convertToSimpleDate from '../TimeSetting/SetDate';

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

    // eslint-disable-next-line react/prop-types
    const isInRange = day.isBetween(startDate, endDate, null, '[]');
    // eslint-disable-next-line react/prop-types
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


export default function AdminCalendar() {

    useEffect(() => {
        getEmployeeHistory();
    }, []);



    const [employeeHistory, setEmployeeHistory] = useState();
    const [startDate, setStartDate] = React.useState(dayjs(employeeHistory?.startDate));
    const [endDate, setEndDate] = React.useState(dayjs(employeeHistory?.endDate));
    const [dailyReport, setDailyReport] = useState("Nikhil");
    const [openOnClick, setOpenOnClick] = useState(false);
    const handleDailyClick = (date) => {
        console.log(date)
        setOpenOnClick(true)
        // fetch the data from api
        setDailyReport(date)


    }

    const getEmployeeHistory = async () => {
        try {
        const config = {
            headers: {
            'Content-Type': 'application/json',
            },
            withCredentials: true,
        };
        const response = await axios.get("/api/v1/admin/getLeaveEmployee", config);
        console.log(response.data.data.at(-1));

        setStartDate(dayjs(response.data.data.at(-1).startDate))
        setEndDate(dayjs(response.data.data.at(-1).endDate))
        } 
        catch (error) {
            console.error('Error fetching employee history:', error);
        }
    };



    return (
        <div className='align-center bg-gray-500 w-[50%] scale-[1] '>
        <LocalizationProvider dateAdapter={AdapterDayjs} className='w-[70%] align-center scale-[2] '>
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
        <dialog open={openOnClick} className='rounded-lg absolute z-50 w-11/12 md:w-3/4 lg:w-1/2 min-h-[300px] top-0 mt-44 bg-black text-white'>

        <section className='flex flex-col items-center justify-center p-4'>

            <h3 className='mt-8 text-center text-lg'>Todays Report</h3>

                {dailyReport.length !== 0 ? (
                dailyReport.map((report, i) => (
                <div
                    key={i}
                    className='w-full bg-white rounded-xl shadow-lg overflow-hidden p-6 mb-4 max-w-md mx-auto sm:max-w-sm md:max-w-lg lg:max-w-xl'
                >
                    <div className='text-center mb-4'>
                    <h1 className='text-2xl font-semibold text-gray-800 mb-1'>
                        {report.projectName}
                    </h1>
                    <a
                        href={report.workUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-blue-500 hover:underline break-words'
                    >
                        {report.workUrl}
                    </a>
                    <p className='text-sm text-gray-500 mt-2'>
                        {convertToSimpleDate(report.time)}
                    </p>
                    </div>

                    <div className='bg-gray-100 p-4 rounded-lg shadow-inner'>
                    <p className='text-gray-700 text-lg leading-relaxed'>{report.report}</p>
                    </div>

                    <button
                    className='absolute top-2 right-4 text-gray-500 hover:text-gray-800 transition-colors duration-300 focus:outline-none'
                    onClick={() => setOpenOnClick(false)}
                    >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                    </button>
                </div>

                ))
            ) : (
                <div className='bg-black h-auto w-full rounded-lg overflow-hidden pt-8'>
                <h1 className='text-center text-lg'>No Daily Reports</h1>
                <button className='absolute top-2 right-4' onClick={() => setOpenOnClick(false)}>x</button>
                </div>
            )}

        </section>

        


    </dialog>   
        </div>
    );
}   