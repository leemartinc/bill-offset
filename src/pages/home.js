import React, {useEffect, useState} from 'react';

import '../css/styles.css';

function Home() {

    const [payPeriods, setPayPeriods] = useState([]);
    const [amountBack, setAmountBack] = useState(2);
    const [amountForward, setAmountForward] = useState(4);

    useEffect(() => {
        getPayPeriods(amountBack,amountForward);
    },[amountBack, amountForward]);

    const daysBetween = (startDate, endDate) => {
        // Calculating the difference in timestamps 
        var diff = new Date(endDate) - new Date(startDate); 
        // 1 day = 24 hours 
        // 24 * 60 * 60 * 1000 = 86400000 milliseconds 
        return Math.abs(Math.round(diff / 86400000));
    } 
    
    var demarcationdate = new Date("04/01/2022").toLocaleDateString();
    var today = new Date().toLocaleDateString();
    var days = daysBetween(demarcationdate, today);
    
    //console.log(today);
    
    var days_till = 14 - days % 14;
    var rec = days % 14 == 0;
    
    var next_1_pay_date = new Date().getTime() + (days_till * 86400000);
    var last_pay_date = new Date(next_1_pay_date - (14 * 86400000));
    var last_2_pay_date = new Date(last_pay_date - (14 * 86400000));
    var next_2_pay_date = new Date(next_1_pay_date + (14 * 86400000));
    var next_3_pay_date = new Date(next_2_pay_date + (14 * 86400000));
    var next_4_pay_date = new Date(next_3_pay_date + (14 * 86400000));

    const getPayPeriods = (periodsBack, periodsForward) => {
        var payPeriods = [];
        var today = new Date().toLocaleDateString();
        var days = daysBetween(demarcationdate, today);
        var days_till_next_pay = 14 - days % 14;

        let next_pay_date_fromToday = new Date().getTime() + (days_till_next_pay * 86400000);
        //var last_pay_date = new Date(next_1_pay_date - (14 * 86400000));

        //console.log(new Date(test).toLocaleDateString());

        //Handles future pay periods
        if (periodsForward === 1){
            let date_computation = new Date().getTime() + (days_till_next_pay * 86400000);
            payPeriods.push(date_computation);
        }else if(periodsForward > 1){
            let date_computation = new Date().getTime() + (days_till_next_pay * 86400000);
            payPeriods.push(date_computation);
            for (let i = 1; i <= periodsForward; i++){
                //console.log(new Date(payPeriods[i-1]).getTime());
                date_computation = payPeriods[i-1] + (14 * 86400000);
                payPeriods.push(date_computation);
            }
        }

        //Handles past pay periods
        if (periodsBack === 1){
            let date_computation = next_pay_date_fromToday - (14 * 86400000);
            payPeriods.unshift(date_computation);
        }else if(periodsBack > 1){
            let date_computation = next_pay_date_fromToday - (14 * 86400000);
            payPeriods.unshift(date_computation);
            for (let i = 1; i <= periodsBack; i++){
                //console.log(new Date(payPeriods[i-1]).getTime());
                date_computation = payPeriods[0] - (14 * 86400000);
                payPeriods.unshift(date_computation);
            }
        }


        for(let date in payPeriods){
            //console.log("##############")
            //console.log(date)
            console.log(new Date(payPeriods[date]).toLocaleDateString());
        }
        //console.log(payPeriods);
        setPayPeriods(payPeriods);

        

    }

    




    class Bill {
        constructor(name, day, amount) {
            this.name = name;
            this.day = day;
            this.amount = amount;
        }
    }
    
    const rent = new Bill("Rent", 1, 1700);
    const spotify = new Bill("Spotify", 9, 10);
    const heroku = new Bill("Heroku", 10, 7);
    const oneMain = new Bill("OneMain Loan", 20, 333);
    const jag_repair_loan = new Bill("Jag Repair Loan", 15, 476);
    const car_insurance = new Bill("Car Insurance", 22, 247);
    const internet = new Bill("Internet", 14, 96);
    const car_note = new Bill("Car Note", 20, 1000);
    
    const bills = [rent, spotify, heroku, oneMain, jag_repair_loan, internet, car_note, car_insurance];
    



    const RenderBillBox = () => {

        if(Object.keys(payPeriods).length===0){
            return(
                <div>Loading...</div>
            )
        }else{

            let toDisplay = []
            for(let i = 0; i < payPeriods.length; i++){
                console.log("##############")
                let bills = billsForPayPeriod(payPeriods[i], payPeriods[i+1] );
                let bills_array = []

                for(let bill in bills){
                    if (bills.slice(-1)[0] != bills[bill]){
                        console.log(bills[bill] + ", ");
                        bills_array.push(
                            <tr>
                                <td>{bills[bill]}</td>
                            </tr>
                        );
                    }
                    
                }

                let total = bills.slice(-1)[0]
                
                console.log(bills);
                toDisplay.push(
                    <div className="example-block">
                        {new Date()< new Date(payPeriods[i+1]) && new Date() > new Date(payPeriods[i])
                        ? <div style={{backgroundColor:"green", color:"white", padding:"5px", borderRadius:"5px"}}>Current Pay Period</div>
                        : <div></div>}
                       <table style={{width:"100%"}}> 
                            <th>
                                <span style={{fontWeight:"900"}}>{new Date(payPeriods[i]).toLocaleDateString()}</span> - {new Date(payPeriods[i+1]).toLocaleDateString()}
                            </th>
                            {bills_array}
                            <tr>
                                <td style={{width:"100%", textAlign:"center"}}>
                                    Total: {total}
                                </td>
                            </tr>
                       </table>
                       
                    </div>
                )
            }

            return toDisplay
        }

       

    }

    const billsForPayPeriod = (lastPaidDate, nextPaidDate) => {
        var billsToPay = [];
        var totalAmount = 0;
    
        for (let bill of bills) {
            if (new Date(lastPaidDate).getMonth() == new Date(nextPaidDate).getMonth()) {
                if (bill.day >= new Date(lastPaidDate).getDate() && bill.day < new Date(nextPaidDate).getDate()) {
                    billsToPay.push(bill.name);
                    totalAmount += bill.amount;
                }
            } else if (new Date(lastPaidDate).getMonth() != new Date(nextPaidDate).getMonth()) {
                if (bill.day >= new Date(lastPaidDate).getDate() || bill.day < new Date(nextPaidDate).getDate()) {
                    billsToPay.push(bill.name);
                    totalAmount += bill.amount;
                }
            }
        }
    
        billsToPay.push(totalAmount);
    
        if (totalAmount > 2200) {
            console.log("Bills are high this pay period");
        }
    
        return billsToPay;
    }


    console.log("\n Todays Date: ", today);

console.log("\n");
console.log("------------------------------------------------");
console.log("\n");

let last_lastPayDate_array = billsForPayPeriod(last_2_pay_date, last_pay_date );

console.log("Date: ", last_2_pay_date.toLocaleDateString());
console.log("Bills to pay: ");
last_lastPayDate_array.forEach(function(item, index){
    if (last_lastPayDate_array.slice(-1)[0] != item){
        console.log(item + ", ");
    }
});
console.log("Total: ", last_lastPayDate_array.slice(-1)[0]);





    


    return (

<div className="container">
        <p>Period Backwards:</p>
        <input type="number" id="tentacles" name="tentacles" value={amountBack} onChange={e => setAmountBack(e.target.value)}
            min="1" max="100" />
        <p>Period Forward:</p>
       <input type="number" id="tentacles" name="tentacles" value={amountForward} onChange={e => setAmountForward(e.target.value)}
            min="1" max="100" />

   
  <div className="top">
    Todays Date: {today}
  </div>
  
  <div className="easy-grid">
    <RenderBillBox />
  </div>
</div>
    );
  }
  
  export default Home;