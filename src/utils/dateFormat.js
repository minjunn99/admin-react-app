function getMonthName(month) {
    let name = "";
    switch (month) {
        case 1:
            name = "Jan";
            break;
        case 2:
            name = "Feb";
            break;
        case 3:
            name = "Mar";
            break;
        case 4:
            name = "Apr";
            break;
        case 5:
            name = "May";
            break;
        case 6:
            name = "Jun";
            break;
        case 7:
            name = "Jul";
            break;
        case 8:
            name = "Aug";
            break;
        case 9:
            name = "Sep";
            break;
        case 10:
            name = "Oct";
            break;
        case 11:
            name = "Nov";
            break;
        case 12:
            name = "Dec";
            break;
        default:
            name = "Invalid month";
    }

    return name;
}

export default function dateFormat(timestamp) {
    const date = new Date(+timestamp);

    const day = date.getUTCDate();
    const month = getMonthName(date.getMonth() + 1);
    const year = date.getFullYear();

    const formatDate = `${month} ${day}, ${year}`;

    return formatDate;
}
