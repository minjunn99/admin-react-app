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

function getMonthVal(month) {
    let value = 0;
    switch (month) {
        case "Jan":
            value = 1;
            break;
        case "Feb":
            value = 2;
            break;
        case "Mar":
            value = 3;
            break;
        case "Apr":
            value = 4;
            break;
        case "May":
            value = 5;
            break;
        case "Jun":
            value = 6;
            break;
        case "Jul":
            value = 7;
            break;
        case "Aug":
            value = 8;
            break;
        case "Sep":
            value = 9;
            break;
        case "Oct":
            value = 10;
            break;
        case "Nov":
            value = 11;
            break;
        case "Dec":
            value = 12;
            break;
        default:
            value = 0;
    }

    return value;
}

export function dateToTimestamp(date) {
    const dateArr = date.replaceAll(",", "").split(" ");
    dateArr[0] = getMonthVal(dateArr[0]);
    const dateFormatRs = `${dateArr[2]}-${dateArr[0]}-${dateArr[1]}`;
    const timestamp = new Date(dateFormatRs).valueOf();

    return timestamp;
}

export default function dateFormat(timestamp) {
    const date = new Date(+timestamp);

    const day = date.getUTCDate();
    const month = getMonthName(date.getMonth() + 1);
    const year = date.getFullYear();

    const formatDate = `${month} ${day}, ${year}`;

    return formatDate;
}
