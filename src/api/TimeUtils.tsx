export function epochTimeToDate(epoch : number) {
    return new Date(epoch * 1000); 
}

function plusDay(date : Date, days : number) : Date {
    return new Date(date.getTime() + (60 * 60 * 24 * 1000 * days));
}

function timeHumanReadable(t : number) {
    if (t < 60)
        return t + " seconds";

    if (t < 60 * 60)
        return (t / 60).toFixed(0) + " minutes";

    const hours = t / (60 * 60)
    let rtn = hours.toFixed(0);
    if (rtn === "1") {
        rtn += " hour "
    }else {
        rtn += " hours "
    }
    rtn += (60 * (hours - Math.trunc(hours))).toFixed(0);
    return rtn + " minutes";
}


const time12Hour = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true
});

export function getDateString(startEpoch : number | undefined, endEpoch : number | undefined) : string {    
    if (startEpoch === undefined || endEpoch === undefined)
        return "";
    const start = epochTimeToDate(startEpoch);
    const end = epochTimeToDate(endEpoch);

    const now = new Date();

    if (start.toDateString() === end.toDateString()) {
        let relativeDay = "";
        if (now.toDateString() === start.toDateString()) {
            relativeDay = "Today, "
        }else if (plusDay(now, 1).toDateString() === start.toDateString()) {
            relativeDay = "Tomorrow, "
        }

        return relativeDay + start.toLocaleDateString();
    }

    return start.toLocaleDateString() + " - " + end.toLocaleDateString();
}

export function getTimeString(startEpoch : number | undefined, endEpoch : number | undefined) : string {   
    if (startEpoch === undefined || endEpoch === undefined)
        return ""; 
    const start = epochTimeToDate(startEpoch);
    const end = epochTimeToDate(endEpoch);

    const duration = " (" + timeHumanReadable(endEpoch - startEpoch) + ")";
    
    return time12Hour.format(start) + " - " + time12Hour.format(end) + duration;
}
