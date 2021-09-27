import moment from 'moment';
import 'moment/locale/ru';

const formattedDate = {
  fromNow(date: string): string {
    return moment(date, 'YYYYMMDD, hh:mm:ss').fromNow();
  },
  dateNow(): string {
    console.log(moment().format('YYYYMMDD, HH:MM:SS'));
    return moment().format('YYYYMMDD, hh:mm:ss');
  },
};
export default formattedDate;
