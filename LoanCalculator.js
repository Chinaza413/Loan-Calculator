// listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
    //hide results
    document.getElementById('results').style.display = 'none';
    
    
    //show loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 2000);


    e.preventDefault();
});

function calculateResults(){
    //UI VARS
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');


    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value)/ 100 / 12;
    const calculatePayment = parseFloat(years.value) * 12;



    //compute monthly payments
    const x = Math.pow(1 + calculatedInterest, calculatePayment);
    const monthly = ( principal * x * calculatedInterest)/(x-1);


    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatePayment).toFixed(2);
        totalInterest.value = ((monthly * calculatePayment)-principal).toFixed(2);
        //show results
        document.getElementById('results').style.display = 'block';
        //hide loader
        document.getElementById('loading').style.display = 'none';
    }else{
        showError('Check Values');

    }

}

// error
function showError(error){
    //show results
    document.getElementById('results').style.display = 'none';
    //hide loader
    document.getElementById('loading').style.display = 'none';
    //create div
    const errorDiv = document.createElement('div');


    //get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    

    //add class
    errorDiv.className = 'alert alert-danger';

    // create text node and append it to div
    errorDiv.appendChild(document.createTextNode(error));

    //insert above heading
    card.insertBefore(errorDiv, heading);

    //clear error after two seconds
    setTimeout(clearError, 3000);
}

//create clear error
function clearError (){
    document.querySelector('.alert').remove();
}