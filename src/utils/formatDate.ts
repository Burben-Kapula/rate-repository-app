import { format, parseISO } from 'date-fns';

const formatDate = (dateString: string): string => {
  return format(parseISO(dateString), 'd.M.yyyy');
};

export default formatDate;
