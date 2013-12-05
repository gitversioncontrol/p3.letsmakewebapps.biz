<!DOCTYPE html>
<html>
	<head>
	<title>Investment Goal Estimator</title> 
	<link rel="stylesheet" href="project3.css" type="text/css">
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.11.1/jquery.validate.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
	</head>
	
	<body>
	<h1>  Investment Goal Estimator </h1>
		
		<form id="userForm">
		You can figure out the duration required to reach your target goal using this tool.
		
		<p> Financial Goal: $<input  type="text" id="target" class="goal" name="Financial Goal"  maxlength ="10"  min="100"  required> <span class="slider"> </span> <span class="target"> </span> </p>
		<p> Investment Duration: <input type="number"  id="duration"  class="goal" name="Investment Duration"  maxlength ="3" min="1" max="100" required> year(s) <span class="duration"></p> 
		<p> Amount Currently Invested:  $<input type="text"  id="principal"  class="goal" name="Amount Currently Invested" maxlength ="10" required><span class="principal"> </span> </p>
		<p>             Monthly Contribution: $<input type="text"  id="contribution"  class="goal" name="Monthly Contribution" maxlength ="10" required> <span class="contribution"></p>
		<p> Expected Annual Rate of Return: <input type="number"  id="rate"  class="goal" name="Expected Annual Rate of Return"  maxlength ="4" min="0.1" max="100"  step="0.5" required>% <span class="rate"></p>
		<p>                 Inflation Rate: <input type="number" id="inflation"  class="goal" name="Inflation Rate" maxlength ="4" min="0.1" max="100" step="0.5"  required>% <span class="inflation"></p>
		
		<button>Calculate</button>
		<span  class="target"> </span> 
		
		</form>
		
		
	<div id="output"></div>
	
	
	<script>
	/*$(function() {
			   $( '.slider' ).slider({
			  value:3,
			  min: 100,
			  max: 10000000,
			  step: 100,
			  slide: function( event, ui ) {
				  $( "#target" ).val( ui.value );
				 // $("#label").html(labelArr[ui.value]);
			  }
		  });
		}
	)*/
	$('input,button').change(function(){
					//console.log("Hi");
					
					//$('#output').html("Monthly Investment of $"+contribution+" will generate $");
					validation();
					customValidation();
				//validation();
								}
					);
					
	
	function validation(){
	$('#userForm').validate({
		 // debug: true
				   submitHandler: function(form) {
			// do other things for a valid form
			//form.submit();
			//customValidation();
		  }
		});
		// alert( "Valid: " + form.valid() );
		//customValidation();
	
	}
	
	function customValidation(){
		var financialgoal=$('input[id=target]').val();
		var principal=$('input[id=principal]').val();
			var reason="";
									$('.goal').each(function(){
									var name=$(this).attr('name');
									var ids=$(this).attr('id');
									var length=$(this).val().length;
									
								//console.log("name is" + name + " and id is "+ids);
								
											if (length == 0) {
											reason=reason+(name+" can't be empty");
											$('.'+ids).html( name+ " can't be empty");
													}
													
													
												else 		if( ( ! $.isNumeric($(this).val()) ) || ($(this).val() < 0) ){
															reason=reason+(name+ " should be a  number with non-negative value ");
															console.log("reason-1 is "+reason);
															$('.'+ids).html(name+ " should be a  number with non-negative value ");
															}
															else
															{
															$('.'+ids).html("");
															//console.log($(this).val());
															//calculate();
															}
															
													
													
										//	console.log("reason-2 is "+reason);
																												
								}		
							)
			
console.log("principal is "+principal+"financialgoal is "+financialgoal);
console.log("reason-2 before last test is "+reason);			
			if ( parseInt(principal) >= parseInt(financialgoal) ){
			 console.log("inside p> f test");
										reason=reason+("Either raise your financial goal or move some money from your investment account to mine.");
										$('.principal').html("Either raise your financial goal or move some money from your investment account to mine.");										
										}
				else
				{
				//reason="";
			//	$('.principal').html("");
				}
										
			console.log("reason-2 is "+reason);					
										
			if (reason == ""){
							calculate();
							}
			else
							{
							$('#output').html("");
							}
			
		
	}//EOF customValidation
					
	function calculate(){
	var financialgoal=$('input[id=target]').val();
	var contribution=$('input[id=contribution]').val();
	var principal=$('input[id=principal]').val();
	var duration=$('input[id=duration]').val();
	var target=$('input[id=target]').val();
	var rate=$('input[id=rate]').val();
	var inflation=$('input[id=inflation]').val();
	
	//var FV = ( (1 + i)n ) * PV
	//Future Value of a Series Formula: FV = PMT * ( ( (1 + i)n - 1) / i )
	console.log("from calculate fn "+contribution+" " +principal+" "+duration+" "+target+" "+rate);
	var principalGain=  Math.pow( (1+rate/100),duration)  * principal;
	var monthlyInterest= (rate/12)/100 ;
	console.log ("monthlyInterest "+ monthlyInterest);
	var contributionGain= contribution * ( (Math.pow( (1+monthlyInterest),(duration*12) ))-1 )/monthlyInterest ;
	console.log("principalGain is "+ principalGain);
	console.log("contributionGain is "+ contributionGain);
	var Total=principalGain+contributionGain;
	var idealContribution= ((financialgoal - principalGain)*monthlyInterest)/( (Math.pow( (1+monthlyInterest),(duration*12) ))-1 ) ;
	console.log("idealContribution is " +idealContribution);
		if ( (parseInt(Total)) != (parseInt(financialgoal)) ){
		$('#output').html("Monthly Investment of $"+contribution+" will result in total investment value to be "+ Total.toFixed(2)+"."); 
		$('#output').append('<p> Monthly Contribution of $'+idealContribution.toFixed(2)+' will almost meet your goal </p>' );	
		
		}
		else
		{
		$('#output').html("Congrats! Monthly Investment of $"+contribution+" will meet your goal of "+ Total.toFixed(2))
		//$('#output').html("");
		}
		
		
	var afterInflationTotal=Total*(Math.pow( (1-(inflation/100) ),duration));
		console.log(afterInflationTotal);
		$('#output').append('<p> Value of total investment after inflation erosion will be: '+afterInflationTotal.toFixed(2) );	
	
	}
				
	
	//$('#output').html("Monthly Investment of $"+" " +"will meet your goal");
	</script>
	
	
	</body>
	
</html>