<!DOCTYPE HTML>
<html>

<head>
    <title>Bill Offset</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
    <link rel="stylesheet" href="/style.css" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
</head>

<body>

    <?php
include 'index.html';


function daysBetween($startDate, $endDate) {
    // Calculating the difference in timestamps 
    $diff = strtotime($endDate) - strtotime($startDate); 
    // 1 day = 24 hours 
    // 24 * 60 * 60 = 86400 seconds 
    return abs(round($diff / 86400));
} 

$demarcationdate = "10/11/2019";
$today = date("m/d/Y");
$days = daysBetween($demarcationdate, $today);

//echo $days;

$days_till = 14 - $days % 14;
$rec = $days % 14 == 0;

$next_1_pay_date = strtotime(date("m/d/Y")) + ($days_till * 86400);
$last_pay_date = $next_1_pay_date - (14 * 86400);
$last_2_pay_date = $last_pay_date - (14 * 86400);
$next_2_pay_date = $next_1_pay_date + (14 * 86400);
$next_3_pay_date = $next_2_pay_date + (14 * 86400);
$next_4_pay_date = $next_3_pay_date + (14 * 86400);

/*
$next_1_pay_date_total = 0;
$last_pay_date_total = 0;
$next_2_pay_date_total = 0;
$next_3_pay_date_total = 0;
*/

//echo date("m/d/Y", $next_4_pay_date);

class Bill
{
    public $name;
    public $day;
    public $amount;
    public $href;
}

$rent = new Bill();
$rent->name = 'Rent';
$rent->day = '1';
$rent->amount = 1561;

$spotify = new Bill();
$spotify->name = 'Spotify';
$spotify->day = '9';
$spotify->amount = 10;

$heroku = new Bill();
$heroku->name = 'Heroku';
$heroku->day = '10';
$heroku->amount = 7;
    
$appliance = new Bill();
$appliance->name = 'ApplianceWhse';
$appliance->day = '12';
$appliance->amount = 50;

$oneMain = new Bill();
$oneMain->name = 'OneMain';
$oneMain->day = '20';
$oneMain->amount = 333;

$sal = new Bill();
$sal->name = 'SAL';
$sal->day = '13';
$sal->amount = 81;

$cell_phone = new Bill();
$cell_phone ->name = 'Cell Phone';
$cell_phone ->day = '20';
$cell_phone ->amount = 128;

$internet = new Bill();
$internet->name = 'Internet';
$internet->day = '14';
$internet->amount = 60;

$car_note = new Bill();
$car_note->name = 'Car Note';
$car_note->day = '20';
$car_note->amount = 432;
$car_note->href = "https://verified.capitalone.com/auth/signin";

$electricity = new Bill();
$electricity->name = 'Electricity';
$electricity->day = '27';
$electricity->amount = 150;

$discord = new Bill();
$discord->name = 'Discord';
$discord->day = '30';
$discord->amount = 10;


$bills = array($rent, $spotify, $heroku, $oneMain, $cell_phone , $internet, $car_note, $electricity, $discord, $appliance, $sal);

function billsForPayPeriod($lastPaidDate, $nextPaidDate){
    
    $billsToPay = array();
    $totalAmount = 0;
    
    foreach ($GLOBALS['bills'] as $bill) {
        
        if (date("m", $lastPaidDate) == date("m", $nextPaidDate)){
            
            if($bill->day >= date("d", $lastPaidDate) &&  $bill->day < date("d", $nextPaidDate)){
                
                //$billsToPay[] = "<span onclick='window.open(\"$bill->href\", \"_blank\");' style='text-decoration: none;'>$bill->name</span>";
                $billsToPay[] = $bill->name;
                $totalAmount = $totalAmount + $bill->amount;
                
            }
            
        }
        else if(date("m", $lastPaidDate) != date("m", $nextPaidDate)){
            
            if($bill->day >= date("d", $lastPaidDate) || $bill->day < date("d", $nextPaidDate)){
                
                //$billsToPay[] = "<span onclick='window.open(\"$bill->href\", \"_blank\");' style='text-decoration: none;'>$bill->name</span>";
                $billsToPay[] = $bill->name;
                $totalAmount = $totalAmount + $bill->amount;
                
            }
            
        }
        
    //echo 'Day: ' . $bill->day . ' Amount: ' . $bill->amount . "<br>";
        
    }

    $billsToPay[] = $totalAmount;
    
    if ($totalAmount > 1700){
        echo "<span style='color:red;'> Bills are high this pay period </span><br>";
    }
    
    return $billsToPay;
}


echo "<br>";


echo "Todays Date: " . $today;


echo "<br>";
echo "<hr>";
echo "<br>";


$last_lastPayDate_array = billsForPayPeriod($last_2_pay_date, $last_pay_date );

echo "Date: " . date("m/d/Y", $last_2_pay_date) . "<br>";
echo "Bills to pay: ";
foreach ( $last_lastPayDate_array as $item){
    if (end($last_lastPayDate_array) != $item){
        echo $item . ", ";
    }
}
echo "<br>Total: " . end($last_lastPayDate_array) . "<br>";

echo "<br>";
echo "<hr>";
echo "<br>";

$currentPayDate_array = billsForPayPeriod($last_pay_date, $next_1_pay_date );

echo "<span style='color:forestgreen'> Date: " . date("m/d/Y", $last_pay_date) . "</span><br>";
echo "<span style='color:forestgreen'> Bills to pay: </span>";
echo "<span style='color:forestgreen'>";
foreach ( $currentPayDate_array as $item){
    if (end($currentPayDate_array) != $item){
        echo $item . ", ";
    }
}
echo "</span><br>";
echo "<span style='color:forestgreen'> Total: " . end($currentPayDate_array) . "</span><br>";



echo "<br>";
echo "<hr>";
echo "<br>";

$next0PayDate_array = billsForPayPeriod($next_1_pay_date, $next_2_pay_date );

echo "Date: " . date("m/d/Y", $next_1_pay_date) . "<br>";
echo "Bills to pay: ";
foreach ( $next0PayDate_array as $item){
    if (end($next0PayDate_array) != $item){
        echo $item . ", ";
    }
}
echo "<br>Total: " . end($next0PayDate_array) . "<br>";


echo "<br>";
echo "<hr>";
echo "<br>";

$nextPayDate_array = billsForPayPeriod($next_2_pay_date, $next_3_pay_date );

echo "Date: " . date("m/d/Y", $next_2_pay_date) . "<br>";
echo "Bills to pay: ";
foreach ( $nextPayDate_array as $item){
    if (end($nextPayDate_array) != $item){
        echo $item . ", ";
    }
}
echo "<br>Total: " . end($nextPayDate_array) . "<br>";

echo "<br>";
echo "<hr>";
echo "<br>";

$next_nextPayDate_array = billsForPayPeriod($next_3_pay_date, $next_4_pay_date );

echo "Date: " . date("m/d/Y", $next_3_pay_date) . "<br>";
echo "Bills to pay: ";
foreach ( $next_nextPayDate_array as $item){
    if (end($next_nextPayDate_array) != $item){
        echo $item . ", ";
    }
}
echo "<br>Total: " . end($next_nextPayDate_array) . "<br>";

echo "<br>";
echo "<hr>";
echo "<br>";


echo "Future Date: " . date("m/d/Y", $next_4_pay_date) . "<br>";

?>

</body>

</html>
