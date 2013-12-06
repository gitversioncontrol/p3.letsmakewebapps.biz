<!DOCTYPE html>
<html>
	<head>
	
	<link rel="stylesheet" href="project3.css" type="text/css"> <!-- project 3 css-->
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script> <!-- Jquery API-->
	<script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.11.1/jquery.validate.js"></script> <!-- Jquery Validate plugin-->
	<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script> <!-- Jquery Ui interface plugin -->
	<script type="text/javascript" src="http://www.workshop.rs/jqbargraph/jqBarGraph.js"></script><!-- Jquery bar-graph plugin-->
	<link rel="stylesheet" href="http://www.workshop.rs/jqbargraph/styles.css" type="text/css" /> <!-- Jquery bar-graph css-->
	<link rel="stylesheet" href="project3.css" type="text/css"> <!-- project 3 css-->
	<title>Investment Goal Estimator</title> 
	</head>
	
	<body>
	<h1>Investment Goal Estimator </h1>
		
		<form id="userForm">
		You can figure out the duration required to reach your target goal using this tool.The bar-graph will show progress with duration chosen.
		<p> Financial Goal: $<input  type="text" id="target" class="goal" name="Financial Goal"  maxlength ="10"  min="100"  required>  <span class="target"> </span> </p>
		<p> Investment Duration: <input type="number"  id="duration"  class="goal" name="Investment Duration"  min="1" max="100" required> year(s) <span class="duration"></span></p> 
		<p> Amount Currently Invested:  $<input type="text"  id="principal"  class="goal" name="Amount Currently Invested" maxlength ="10" required><span class="principal"> </span> </p>
		<p>             Monthly Contribution: $<input type="text"  id="contribution"  class="goal" name="Monthly Contribution" maxlength ="10" required> <span class="contribution"></span></p>
		<p> Expected Annual Rate of Return: <input type="number"  id="rate"  class="goal" name="Expected Annual Rate of Return"   min="0.01" max="100"  step ="0.01" required>% <span class="rate"></span></p>
		<p>                 Inflation Rate: <input type="number" id="inflation"  class="goal" name="Inflation Rate"  min="0.01" max="100" step="0.01"  required>% <span class="inflation"></span></p>
		
		<button>Calculate</button>
		
		
		</form>
		
		
	<div id="output"></div>
	
	
	<div id="divForGraph"></div>
	
	
	
	<script src="project3.js"></script> <!-- project 3 javascript-->
	</body>
	
</html>