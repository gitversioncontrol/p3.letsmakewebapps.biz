
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
		$('#divForGraph').html(""); //To reset graph for live update when change of input is done.
		var financialgoal=$('input[id=target]').val();
		var principal=$('input[id=principal]').val();
		var rate=$('input[id=rate]').val();
		var duration=$('input[id=duration]').val();
			var reason=""; //Variable to store input validation errors.
									$('.goal').each(function(){
									var name=$(this).attr('name'); //Pull  name for current input
									var ids=$(this).attr('id'); //Pull id for current input
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
										$('.principal').html("Either raise your financial goal or move some money from your investment account to mine :) ");										
										}
				else
				{
				//reason="";
			//	$('.principal').html("");
				}
				
				
			if ( rate <= 0 ){
				reason=reason+("Rate can't be zero or negative.");
				$('.rate').html("Rate can't be zero or negative.");
			}
			if ( financialgoal < 100){
			reason=reason+("Raise Financial goal to be more than $100");
				$('.target').html("Raise Financial goal to be more than $100.");
			}
			if (duration <=0){
			reason=reason+("Duration of investment can't be zero or negative");
				$('.duration').html("Duration of investment can't be zero or negative.")
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
		

		console.log("from calculate fn "+contribution+" " +principal+" "+duration+" "+target+" "+rate);
		
		var totalObj=new gettotal(financialgoal,contribution,principal,duration,target,rate);
		var Total=totalObj.Total;
		var idealContribution=totalObj.idealContribution;
		
		
		console.log("idealContribution is " +idealContribution);
			if ( (parseInt(Total)) != (parseInt(financialgoal)) ){
			$('#output').html("Monthly Investment of $"+contribution+" and amount already invested will result in total investment value to be "+ Total.toFixed(2)+"."); //toFixed to bring precision to 2 decimal
			$('#output').append('<p> Monthly Contribution of $'+idealContribution.toFixed(2)+' and amount already invested will almost meet your goal </p>' );	
			
			}
			else
			{
			$('#output').html("Congrats! Monthly Investment of $"+contribution+" will meet your goal of "+ Total.toFixed(2))
			
			}
			
			
		var afterInflationTotal=( Total*(Math.pow( (1-(inflation/100) ),duration)) );
		var afterInflationTotal = isNaN(parseInt(afterInflationTotal)) ? 0 : (afterInflationTotal); //If afterInflationTotal is Not allowed number ,then make it zero.
			console.log(afterInflationTotal);
			$('#output').append('<p> Value of total investment after inflation erosion will be: '+afterInflationTotal.toFixed(2) );	
			
			bargraph(financialgoal,contribution,principal,duration,target,rate);
		
	}
	
	
	function gettotal(financialgoal,contribution,principal,duration,target,rate){
	
	var principalGain=  ( (Math.pow( (1+rate/100),duration))  * principal);
	var principalGain=isNaN(parseInt(principalGain)) ? 0 : (principalGain); //if principalGain is Nan(Not allowed number),make it zero.
	
	var monthlyInterest= (rate/12)/100 ;
	console.log ("monthlyInterest "+ monthlyInterest);
	var contributionGain= ( contribution * ( (Math.pow( (1+monthlyInterest),(duration*12) ))-1 )/monthlyInterest ) ;
	var contributionGain = isNaN(parseInt(contributionGain)) ? 0 : (contributionGain); //If contributionGain is Not allowed number ,then make it zero.
	console.log("principalGain is "+ principalGain);
	console.log("contributionGain is "+ contributionGain);
	var Total=principalGain+contributionGain;
	//var idealContribution= ((financialgoal - principalGain)*monthlyInterest)/( (Math.pow( (1+monthlyInterest),(duration*12) ))-1 ) ;
	var idealContribution= ( ((financialgoal - principalGain)*monthlyInterest)/( (Math.pow( (1+monthlyInterest),(duration*12) ))-1 ) );
	var idealContribution = isNaN(parseInt(idealContribution)) ? 0 : (idealContribution); //If idealContribution is Not allowed number ,then make it zero.
	//return Total;
	this.Total=Total;
	this.idealContribution=idealContribution;
	
	}
	
	 function bargraph(financialgoal,contribution,principal,duration,target,rate){
		//var arrayOfData = [];
		var totalobj=new gettotal(financialgoal,contribution,principal,duration,target,rate);
		var idealContribution=totalobj.idealContribution;
		console.log("idealContribution from gettotal method is: "+idealContribution);
		
	 	/*arrayOfData = new Array(
				 [[14,54],'2007'],
				 [[8,48],'2008'],
				 [[4,36],'2009']
			); */
			
			var arrayOfData = [];
			
			var counter;
			if ( duration > 10){ //If duration is more than 10 years then break it down to one tenth of duration to maintain graph count to 10 equal time units
				counter=duration/10;
			}
			else{
			counter=1;
			}
			
			//for (var y=1; y<= duration ; y++){
			for (var y=counter;y<= duration ; y=counter+y){
				console.log("y is "+y);
				y=parseInt(y);
				console.log("y is "+y);
				var totalobj2=new gettotal(financialgoal,contribution,principal,y,target,rate);
				var Total=parseInt(totalobj2.Total);
				
				var totalobj_idealContribution=new gettotal(financialgoal,idealContribution,principal,y,target,rate);//Used IdealContribution here to find total investment value at different inteval
				var Total_with_idealContribution=parseInt(totalobj_idealContribution.Total);
				console.log("Total  from gettotal method is: "+Total+ "and with ideal contribution is : "+Total_with_idealContribution);
					
					
					
			
				//for (var i =y; i++) {
						
						arrayOfData.push([[Total,Total_with_idealContribution],"Year:"+y]);
			 
						//}
					
			}
			
			console.log(arrayOfData);
			//After you set your data array you just need to say in which div you want graph to be created. All you have to do is:

			// var myarray= ['0','0'];
			//$('#divForGraph').jqBarGraph({title: false});
			//$(el).html('');
			//$('#divForGraph').html("Progress of investment with your current contribution and calculated contribution to reach your goal");
			$('#divForGraph').jqBarGraph({
				
				 data: arrayOfData,
				 
				 colors: ['#437346','#242424'] ,
			animate: false,
			type: 'multi',
			   prefix: '$',
			   barSpace: 20,
			   width: '100%', // default width of your graph
				height: 400, //default height of your graph
				showValues: true,
				showValuesColor: '#fff',
				legends: ['Total Value with Current monthly Contribution of $'+contribution,"Total Value with Expected monthly Contribution of $"+idealContribution.toFixed(2)+" to reach goal"],
				legend: true
			});
	
	 
	 
	 }
				
			
	