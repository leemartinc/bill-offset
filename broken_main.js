document.getElementById("error").innerHTML = " ";

//console.log(Date.parse("12/3/2020"));

function treatAsUTC(date) {
    var result = new Date(date);
    result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
    return result;
}

function daysBetween(startDate, endDate) {
    var millisecondsPerDay = 24 * 60 * 60 * 1000;
    return Math.floor((treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay);
}

var demarcationdate = new Date("10-11-2019"),
    today = new Date(),
    days = daysBetween(demarcationdate, today),
    daystill = 14 - days % 14,
    rec = days % 14 == 0,
    d = new Date(),
    d_prev_prev = new Date(),
    d_future = new Date(),
    d_future_future = new Date(),
    d_prev = new Date();

d.setDate(today.getDate() + daystill);
var nextDate = ((d.getMonth() + 1) + "/" + (d.getDate()) + "/" + d.getFullYear());
d_prev.setDate(d.getDate() - 14);
var previousDate = ((d_prev.getMonth() + 1) + "/" + (d_prev.getDate()) + "/" + d_prev.getFullYear());
d_prev_prev.setDate(d_prev.getDate() - 14);
var previousPastDate = ((d_prev_prev.getMonth() + 1) + "/" + (d_prev_prev.getDate()) + "/" + d_prev_prev.getFullYear());
d_future.setDate(d.getDate() + 14);
var nextFutureDate = ((d_future.getMonth() + 1) + "/" + (d_future.getDate()) + "/" + d_future.getFullYear());

d_future_future.setDate(d.getDate() + 28);

var nextFutureDate_future = ((d_future_future.getMonth() + 1) + "/" + (d_future_future.getDate()) + "/" + d_future_future.getFullYear());

console.log()


//console.log("Days diff = " + days + ". Recurs today = " + rec + ". Next in " + daystill + " days (" + nextDate.toString() + ").");

//document.getElementById('day_diff').innerHTML = days;
//document.getElementById('paid_boolean').innerHTML = rec;
document.getElementById('prev').innerHTML = previousDate.toString();
document.getElementById('countdown').innerHTML = nextDate.toString();
document.getElementById('prev_prev').innerHTML = previousPastDate.toString();
document.getElementById('future').innerHTML = nextFutureDate.toString();
document.getElementById('future2').innerHTML = nextFutureDate_future.toString();







var bills = {
    rent: {
        date: 1,
        amount: 1561
    },
    spotify: {
        date: 9,
        amount: 10
    },
    heroku: {
        date: 10,
        amount: 7
    },
    republic: {
        date: 20,
        amount: 160
    },
    car_insurance: {
        date: 12,
        amount: 451
    },
    internet: {
        date: 14,
        amount: 60
    },
    car_note: {
        date: 20,
        amount: 535
    },
    electricity: {
        date: 27,
        amount: 150
    },
    discord: {
        date: 30,
        amount: 10
    },
}

var past_total_paid = 0;
var total_paid = 0;
var total_to_be_paid = 0;
var future_total_paid = 0
var tmp_date_up = new Date();
var tmp_date_down = new Date();

for (var key in bills) {
    //past
    /*
    var date1 = Date.parse(((d_prev_prev.getMonth() + 1) + "/" + bills[key]['date'] + "/" + d_prev_prev.getFullYear()).toString())

    console.log(new Date(date1))

    var date2 = Date.parse(previousPastDate.toString())

    console.log(new Date(date2))

    var date3 = Date.parse(((d_prev.getMonth() + 1) + "/" + bills[key]['date'] + "/" + d_prev.getFullYear()).toString())

    //console.log(new Date(date3))

    var date4 = Date.parse(previousDate.toString());

    //console.log(new Date(date4))
    */
    //console.log(Number(d_prev.getDate()))

    if (d_prev_prev.getMonth() == d_prev.getMonth()) {
        if (bills[key]['date'] >= Number(d_prev_prev.getDate()) && bills[key]['date'] <= Number(d_prev.getDate())) {
            document.getElementById("prev_paid").innerHTML += key + ", ";
            past_total_paid = past_total_paid + bills[key]['amount'];
            //console.log("passedDate");
        }
    }

    if (d_prev_prev.getMonth() != d_prev.getMonth()) {
        if (bills[key]['date'] >= Number(d_prev_prev.getDate()) || bills[key]['date'] <= Number(d_prev.getDate())) {
            document.getElementById("prev_paid").innerHTML += key + ", ";
            past_total_paid = past_total_paid + bills[key]['amount'];
            //console.log("passedDate");
        }
    }

    //current

    if (d_prev.getMonth() == d.getMonth()) {
        if (bills[key]['date'] >= Number(d_prev.getDate()) && bills[key]['date'] <= Number(d.getDate())) {
            document.getElementById("paid").innerHTML += key + ", ";
            total_paid = total_paid + bills[key]['amount'];
            //console.log("passed");
        }
    }

    if (d_prev.getMonth() != d.getMonth()) {
        if (bills[key]['date'] >= Number(d_prev.getDate()) || bills[key]['date'] <= Number(d.getDate())) {
            document.getElementById("paid").innerHTML += key + ", ";
            total_paid = total_paid + bills[key]['amount'];
            //console.log("passed");
        }
    }

    //Next
    if (d.getMonth() == d_future.getMonth()) {
        if (bills[key]['date'] >= Number(d.getDate()) && bills[key]['date'] <= Number(d_future.getDate())) {
            document.getElementById("to_be_paid").innerHTML += key + ", ";
            total_to_be_paid = total_to_be_paid + bills[key]['amount'];
            //console.log("passed");
        }
    }

    if (d.getMonth() != d_future.getMonth()) {
        if (bills[key]['date'] >= Number(d.getDate()) || bills[key]['date'] <= Number(d_future.getDate())) {
            document.getElementById("to_be_paid").innerHTML += key + ", ";
            total_to_be_paid = total_to_be_paid + bills[key]['amount'];
            //console.log("passed");
        }
    }

    //future
    if (d_future.getMonth() == d_future_future.getMonth()) {
        if (bills[key]['date'] >= Number(d_future.getDate()) && bills[key]['date'] <= Number(d_future_future.getDate())) {
            document.getElementById("future_to_be_paid").innerHTML += key + ", ";
            future_total_paid = future_total_paid + bills[key]['amount'];
            //console.log("passed");
        }
    }

    if (d_future.getMonth() != d_future_future.getMonth()) {
        if (bills[key]['date'] >= Number(d_future.getDate()) || bills[key]['date'] <= Number(d_future_future.getDate())) {
            document.getElementById("future_to_be_paid").innerHTML += key + ", ";
            future_total_paid = future_total_paid + bills[key]['amount'];
            //console.log("passed");
        }
    }

}

document.getElementById("prev_paid").innerHTML += " -- TOTAL: " + past_total_paid;
document.getElementById("paid").innerHTML += " -- TOTAL: " + total_paid;
document.getElementById("to_be_paid").innerHTML += " -- TOTAL: " + total_to_be_paid;
document.getElementById("future_to_be_paid").innerHTML += " -- TOTAL: " + future_total_paid;

if (total_paid > 1700) {
    document.getElementById("error").innerHTML += "- total_paid is over the limit! Re adjust due dates<br>"
}
if (total_to_be_paid > 1700) {
    document.getElementById("error").innerHTML += "- total_to_be_paid is over the limit! Re adjust due dates<br>"
}

/*
let total = 0;
for (var key in bills) {
    //console.log("key " + key + " has value " + bills[key]['amount']);
    total = total + bills[key]['amount'];
    console.log(total);

}
*/


/*
var myArray = {id1: 100, id2: 200, "tag with spaces": 300};
myArray.id3 = 400;
myArray["id4"] = 500;

for (var key in myArray) {
  console.log("key " + key + " has value " + myArray[key]);
}
*/

//console.log(bills['rent']['amount']);
/*
for (var key in bills) {
    console.log("key " + key + " has value " + bills[key]['date']);
}
*/

/*
for (var key in bills) {
    console.log("key " + key + " has value " + bills[key]);
    for (var key2 in bills[key]) {
        console.log("key " + key2 + " has value " + bills[key][key2]);
    }
}
*/
