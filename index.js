/* Your Code Here */

const createEmployeeRecord = function(employeeInfo) {
    return {
        firstName: employeeInfo[0],
        familyName: employeeInfo[1],
        title: employeeInfo[2],
        payPerHour: employeeInfo[3],
        timeInEvents: [],
        timeOutEvents: []
    };
};

const createEmployeeRecords = function(employeeInfoArray) {
    return employeeInfoArray.map((employeeInfo) => createEmployeeRecord(employeeInfo));
};


// Custom function created for timeIn and timeOut events
const createTimeEventType = function(dateStamp, timeEventType) {
    let timeEventArray;
    switch (timeEventType) {
        case "TimeIn":
            timeEventArray = this.timeInEvents;
            break;
        case "TimeOut":
            timeEventArray = this.timeOutEvents;
            break;
        default:
            throw error("Invalid argument for timeEventType passed.");
    }
    timeEventArray.push( {
        type: timeEventType,
        hour: Number.parseInt(dateStamp.slice(dateStamp.lastIndexOf(' ') + 1)),
        date: dateStamp.slice(0, dateStamp.lastIndexOf(' '))
    });
    return this;
}

const createTimeInEvent = function(dateStamp) {
    return createTimeEventType.call(this, dateStamp, "TimeIn");
}

const createTimeOutEvent = function(dateStamp) {
    return createTimeEventType.call(this, dateStamp, "TimeOut");
}

const hoursWorkedOnDate = function(date) {
    let index = 0;
    while (index < this.timeInEvents.length) {
        if (this.timeInEvents[index].date === date) {
            return (this.timeOutEvents[index].hour - this.timeInEvents[index].hour) / 100;
        }
        index++;
    }
    return 0;
};

const wagesEarnedOnDate = function(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour;
}

const findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find((employee) => employee.firstName === firstName);
}

const calculatePayroll = function(employeeRecords) {
    return employeeRecords.reduce(function (payroll, employeeRecord) {
        return payroll + allWagesFor.call(employeeRecord);
    }, 0);
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

