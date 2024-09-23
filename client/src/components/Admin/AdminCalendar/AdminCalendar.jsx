import * as React from 'react';

import dayjs from 'dayjs';
import isBetweenPlugin from 'dayjs/plugin/isBetween';

import { styled } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';

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

export default function RangePicker() {

    const [startDate, setStartDate] = React.useState(dayjs('2024-06-12'));
    const [endDate, setEndDate] = React.useState(dayjs('2024-06-16'));



    return (
        <div className='pt-44'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
                value={startDate}
                // onChange={handleDateChange}
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
        </div>
    );
    
}   