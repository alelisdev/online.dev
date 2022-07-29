import React, { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
// import localizer from 'react-big-calendar/lib/localizers/globalize';
// import * as dates from '../../../utils/date';
import './index.scss';
import { useContext } from 'react';
import { ThemeContext } from '../../../themeProvider';

// @ts-expect-error replace similar calendar
const DragAndDropCalendar = withDragAndDrop(Calendar);
// const allViews = Object.keys(Views).map((k) => Views[k]);
const localizer = momentLocalizer(moment);

// const ColoredDateCellWrapper = ({ children }: any) =>
//   React.cloneElement(React.Children.only(children), {
//     style: {
//       backgroundColor: 'lightblue',
//     },
//   });

//TODO import main colours from SCSS here or change color schema here also

const style = {
  height: 600,
  color: '#000',
};

const ReactBigCalendar = ({
  events,
  onSelectSlot,
  onSelectEvent,
  onEventDrop,
  onResizeEvent,
  dragFromOutsideItem,
  onDropFromOutside,
  handleDragStart,
  formats,
  views,
}: any) => {
  const { theme } = useContext(ThemeContext);
  //TODO style here
  return (
    <DragAndDropCalendar
      className={`${theme === 'Light' ? 'light-mode' : null}`}
      selectable
      resizable
      popup
      showMultiDayTimes
      localizer={localizer}
      events={events}
      onEventDrop={onEventDrop}
      onSelectEvent={onSelectEvent}
      onSelectSlot={onSelectSlot}
      onEventResize={onResizeEvent}
      onDragStart={console.log}
      defaultView={Views.WEEK}
      defaultDate={new Date()}
      dragFromOutsideItem={dragFromOutsideItem}
      onDropFromOutside={onDropFromOutside}
      handleDragStart={handleDragStart}
      style={style}
      formats={formats}
      views={views}
    />
  );
};

export default ReactBigCalendar;
