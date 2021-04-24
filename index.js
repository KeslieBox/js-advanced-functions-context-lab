/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function createEmployeeRecord(empArray) {
    // console.log(this)

   return {
        firstName: empArray[0],
        familyName: empArray[1],
        title: empArray[2],
        payPerHour: empArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrayObjects){
    return arrayObjects.map(e => {
        return createEmployeeRecord(e)
    })
}

function createTimeInEvent(dateStamp) {

    let [date, hour] = dateStamp.split(' ')

   this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    })

    return this
}

function createTimeOutEvent(dateStamp) {

    let [date, hour] = dateStamp.split(' ')

   this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    })

    return this
}

function hoursWorkedOnDate(dateStamp) {
    // console.log(this)
    // console.log(dateStamp)

    let dateIn = this.timeInEvents.find(e => {
        return e.date === dateStamp
    })
    let dateOut = this.timeOutEvents.find(e => {
        return e.date === dateStamp
    })

    return (dateOut.hour - dateIn.hour) / 100
}

function wagesEarnedOnDate(dateStamp) {

    const pay = this.payPerHour
   return hoursWorkedOnDate.call(this, dateStamp) * pay
}

function findEmployeeByFirstName(empArray, name) {
    return empArray.find(e => {
        return e.firstName === name
    })
}

function calculatePayroll(empArray) {
   return empArray.reduce(function(accum, rec) {
       return accum += allWagesFor.call(rec)  
   }, 0)
}