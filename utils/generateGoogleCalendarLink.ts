interface Payload {
  title: string;
  startDate: Date;
  endDate: Date;
  location: string;
  description: string;
}

export const generateGoogleCalendarLink = ({
  title,
  startDate,
  endDate,
  location,
  description,
}: Payload) => {
  const encodedTitle = encodeURIComponent(title);
  const encodedLocation = encodeURIComponent(location);
  const encodedDescription = encodeURIComponent(description);

  const startDateUTC = startDate.toISOString().replace(/-|:|\.\d+/g, '');
  const endDateUTC = endDate.toISOString().replace(/-|:|\.\d+/g, '');

  const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodedTitle}&dates=${startDateUTC}/${endDateUTC}&location=${encodedLocation}&details=${encodedDescription}`;

  return url;
};
