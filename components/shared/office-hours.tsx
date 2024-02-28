"use client"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle} from "@fortawesome/free-solid-svg-icons";
import {faCircle as faCircleR} from "@fortawesome/free-regular-svg-icons";

export default function OfficeHours() {

    const displayDay = new Intl.DateTimeFormat("en-AU", { weekday: "long", timeZone: "Australia/Brisbane" }).format(new Date());
    const displayTime = new Intl.DateTimeFormat("en-AU", { timeStyle: "short", timeZone: "Australia/Brisbane" }).format(new Date());
    const openHours = new Intl.DateTimeFormat("en-AU", { timeStyle: "medium", timeZone: "Australia/Brisbane", hourCycle: "h24" }).format(new Date('01/01/2024 9:00 am'));
    const closingHours = new Intl.DateTimeFormat("en-AU", { timeStyle: "medium", timeZone: "Australia/Brisbane", hourCycle: "h24" }).format(new Date('01/01/2024 5:00 pm'));
    const timestamp = new Intl.DateTimeFormat("en-AU", { timeStyle: "medium", timeZone: "Australia/Brisbane", hourCycle: "h24" }).format(new Date());

  if (displayDay.includes('Saturday') || displayDay.includes('Sunday')) {
    return (
        <p>{displayDay} {displayTime} <FontAwesomeIcon icon={faCircleR} className="text-yellow-500" /> gone for the weekend</p>
    );
  }

  return (
    <p>{displayDay} {displayTime} {timestamp > openHours && timestamp < closingHours ? <FontAwesomeIcon icon={faCircle} className="text-green-500" /> : <FontAwesomeIcon icon={faCircleR} className="text-yellow-500" />} {timestamp > openHours && timestamp < closingHours ? "available" : "gone for the day"}</p>
  );
}
