
	$('input,button').change(function(){ //When input change happens start event
					validation(); //Form validation for Calculate button using Jquery validation plugin
					customValidation(); //Custom Validation function
										}
							);
					
	
	function validation(){//Form validation for Calculate button using Jquery validation plugin
		$('#userForm').validate({
		   submitHandler: function(form) { //If Validation is successful,submit form
										}
								});
			
	}
	
	function customValidation(){ //Input validation
		$('#divForGraph').html(""); //To reset graph for live update when change of input is done.
		var financialgoal=$('input[id=target]').val();
		var principal=$('input[id=principal]').val();
		var rate=$('input[id=rate]').val();
		var duration=$('input[id=duration]').val();
		var reason=""; //Variable to store input validation errors.
		
			$('.goal').each(function(){ //Iterate thru each input field
				var name=$(this).attr('name'); //Pull  name for current input
				var ids=$(this).attr('id'); //Pull id for current input
				var length=$(this).val().length;

					if (length == 0) {//Check if the input field is empty
					reason=reason+(name+" can't be empty");
					$('.'+ids).html( name+ " can't be empty");
							}
					else 	if( ( ! $.isNumeric($(this).val()) ) || ($(this).val() < 0) ){ // check if the input field is a valid number
								reason=reason+(name+ " should be a  number with non-negative value ");
								$('.'+ids).html(name+ " should be a  number with non-negative value ");
								}
								else
								{
								$('.'+ids).html("");								
								}
																
				}		
			) //End of each function
			
				
			if ( parseInt(principal) >= parseInt(financialgoal) ){//Check if financial foal is less than already invested amount.
				reason=reason+("Either raise your financial goal or move some money from your investment account to mine.");
				$('.principal').html("Either raise your financial goal or move some money from your investment account to mine :) ");										
			}
						
			if ( rate <= 0 || rate > 100){//Check if investment return rate is valid and should not be greater than 100 for practical results.
				reason=reason+("Please settle rate in between 0.1-100%");
				$('.rate').html("Please settle return rate in between 0.1-100%");
			}
			
			if ( financialgoal < 100){ //Check to make sure financial foal is more than $100 for best results.
				reason=reason+("Raise Financial goal to be more than $100");
				$('.target').html("Raise Financial goal to be more than $100.");
			}
			
			if (duration <=0 || duration > 100){ //Check to make sure duration is in between 0 and 100 years for best results
				reason=reason+("Settle Duration of investment in between 1 to 100 years");
				$('.duration').html("Settle Duration of investment in between 1 to 100 years");
			}

			if (reason == ""){ //If there is no validation error Run caluclate function to find results
				calculate(); 
			}
			else
			{
				$('#output').html(""); //Clear output from screen if there is any input validation error.
			}
			
	}//EOF customValidation
					
	function calculate(){ //Calculation Logic
		var financialgoal=$('input[id=target]').val();
		var contribution=$('input[id=contribution]').val();
		var principal=$('input[id=principal]').val();
		var duration=$('input[id=duration]').val();
		var target=$('input[id=target]').val();
		var rate=$('input[id=rate]').val();
		var inflation=$('input[id=inflation]').val();

		var totalObj=new gettotal(financialgoal,contribution,principal,duration,target,rate);//Call gettotal method to get result object
		var Total=totalObj.Total; //get Total from result object
		var idealContribution=totalObj.idealContribution; //get Ideal contribution to reach target from result object

			if ( (parseInt(Total)) != (parseInt(financialgoal)) ){ //Post output on screen
			$('#output').html("*Monthly Investment of $"+contribution+" and amount already invested will result in total investment value to be "+ Total.toFixed(2)+"."); //toFixed to bring precision to 2 decimal
			$('#output').append('<p> *Monthly Contribution of $'+idealContribution.toFixed(2)+' and amount already invested will almost meet your goal </p>' );	
			}
			else
			{
			$('#output').html("*Congrats! Monthly Investment of $"+contribution+" will meet your goal of "+ Total.toFixed(2))
			}
			
		//Logic for finding inflation erosion on total investment value	
		var afterInflationTotal=( Total*(Math.pow( (1-(inflation/100) ),duration)) );
		var afterInflationTotal = isNaN(parseInt(afterInflationTotal)) ? 0 : (afterInflationTotal); //If afterInflationTotal is Not allowed number ,then make it zero.
		$('#output').append('<p> *Value of total investment after inflation erosion will be: '+afterInflationTotal.toFixed(2) );	
			
		//Run bargraph() to generate graph from data calculated	
		bargraph(financialgoal,contribution,principal,duration,target,rate);
		
	}//EOF calculate
	
	
	function gettotal(financialgoal,contribution,principal,duration,target,rate){//function to calculate total and idealContribution and bind it in a result object
	
		var principalGain=  ( (Math.pow( (1+rate/100),duration))  * principal);
		var principalGain=isNaN(parseInt(principalGain)) ? 0 : (principalGain); //if principalGain is Nan(Not allowed number),make it zero.
		
		var monthlyInterest= (rate/12)/100 ; //Split annual rate into monthly rate

		var contributionGain= ( contribution * ( (Math.pow( (1+monthlyInterest),(duration*12) ))-1 )/monthlyInterest ) ;
		var contributionGain = isNaN(parseInt(contributionGain)) ? 0 : (contributionGain); //If contributionGain is Not allowed number ,then make it zero.
		
		var Total=principalGain+contributionGain;

		var idealContribution= ( ((financialgoal - principalGain)*monthlyInterest)/( (Math.pow( (1+monthlyInterest),(duration*12) ))-1 ) );
		var idealContribution = isNaN(parseInt(idealContribution)) ? 0 : (idealContribution); //If idealContribution is Not allowed number ,then make it zero.

		this.Total=Total;
		this.idealContribution=idealContribution;
	
	}//EOF gettotal
	
	function bargraph(financialgoal,contribution,principal,duration,target,rate){ //bargraph data generation and pushing it on graph plugin
	
		var totalobj=new gettotal(financialgoal,contribution,principal,duration,target,rate);//use duration defined by user to get gettotal object
		var idealContribution=totalobj.idealContribution;//Pull idealContribution for the duration defined by user to reach target
		var arrayOfData = [];
		var counter;
		
		if ( duration > 10){ //If duration is more than 10 years then break it down to one tenth of duration to maintain graph count to 10 equal time-units
			counter=duration/10;
		}
		else{
		counter=1;
		}

		for (var y=counter;y<= duration ; y=counter+y){
			y=parseInt(y); //To  roundup time-units
			
			var totalobj2=new gettotal(financialgoal,contribution,principal,y,target,rate);//Push broken time-unit for graph to get total at different intervals when contribution is user-defined
			var Total=parseInt(totalobj2.Total);
			
			var totalobj_idealContribution=new gettotal(financialgoal,idealContribution,principal,y,target,rate);//Used IdealContribution here to find total investment value at different interval to reach target
			var Total_with_idealContribution=parseInt(totalobj_idealContribution.Total);
			
			arrayOfData.push([[Total,Total_with_idealContribution],"Year:"+y]); //Push data in Array

		}

			$('#divForGraph').jqBarGraph({//Push array and other custom variables for graph plugin
				data: arrayOfData,
				colors: ['#437346','#810541'] ,
				animate: false,
				type: 'multi',
				prefix: '$', //to show value in $
				barSpace: 20,
				width: '100%', // width of  graph 100% to cover whole screen
				height: 400, // height of graph element
				showValues: true,
				showValuesColor: '#fff',
				legends: ['Total Value with Current monthly Contribution of $'+contribution,"Total Value with Expected monthly Contribution of $"+idealContribution.toFixed(2)+" to reach goal of "+financialgoal],
				legend: true
			});

	}//EOF bargraph
				
			
	