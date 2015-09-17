/* 
*********************************************************
An example of the steps taken by this program, with each function as a step.

Initial Array
[20,50,10,1,5]

1.  Figure out if the right-most index is larger than the one to its left. Index 0 will always be false at this step
[F,T,F,F,T]

2.  Find False blocks, then turn them true, with the knowledge that the first item in the block, will always be bigger
[F,T,T,F,T]

3. Find True blocks, then turn them false, with the knowledge that the second item in the block will always be bigger
[F,T,F,F,T]

4.Check the beginning and ends of the Array.  Because this array is linear, not circular, some funky logical errors can occur.
This step accounts for those logical errors.

5.Total the true values, then map out their position, adding one (you can't have a house 0, in lay-speak.)
$55 -- rob houses 2 and 5.
*********************************************************
*/


//The masterArray is our main reference, for the entire operation.  
//We store the home values in Array 1, and whether we want to rob them, in Array 2.
var masterArray = [[],[]],
	maLength = function(){
		return masterArray[0].length;
	};

//Let's take the initial input, from the function, and push the values to Array 1 of our master Array.
//Next, let's call the functions that we'll need to figure out our optimal robbing strategy.
function houseRobInit(arr){
	masterArray = [[],[]];
	for(i=0; i<arr.length; ++i){
		masterArray[0].push(arr[i]);
	}
	initialCheck();
	valueCheck(false, true);
	valueCheck(true, false);
	checkStartEnd();
	finalTotal();
}

//The inital check starts from the end of the array, and asks "is the current index larger or smaller than the one to the left of it?"
//If it's larger, assign a value of true to that index.  Otherwise, assign it false.
function initialCheck(){
	var check = (maLength() - 1);
	for(i=0; i<maLength(); ++i){
		if(masterArray[0][check] >= masterArray[0][check - 1]){
			masterArray[1].unshift(true);
		}
		else{
			masterArray[1].unshift(false);
		}
		check = check - 1;
	}
}

//Now, let's check if there are any blocks of true or false (True, True, False, for example).
//If we find any blocks, let's call the valueSwitch helper function.
function valueCheck(bool, switchVal){
	for(i=0; i<maLength(); ++i){
		var valueArray = [];
		while(masterArray[1][i] == bool && masterArray[1][i+1] == bool){
			valueArray.push(i);

			if(masterArray[1][i+2] == bool){
				valueArray.push(i+1);
			}
			++i;
		}
		if(valueArray.length>1){
			valueSwitch(valueArray, switchVal);
		}	
	}
}

//When we check false blocks, we want to turn items to true, and vice versa.
//In any true block, the second index and every other index after that will be the highest amount
//In any false block, the first index and every other index after that will be the highest amount
function valueSwitch(arr, valueToChange){
	var val = 0;
	if(valueToChange == true){
		val = 0;
	}
	else{
		val = 1;
	}
	for(i=val; i<arr.length; i+=2){
		masterArray[1][arr[i]] = valueToChange;
	}
}

//Now we need to clean up the start and end of the array that we were passed, because wacky things can happen,
//If we just use the standard logic above.
function checkStartEnd(){
	//Check the start of the array.  If index 0 and 2 are bigger than index 1, and index 3 is false, then use index 0 and 2
	if((masterArray[0][0] + masterArray[0][2]) > masterArray[0][1] && masterArray[1][3] == false){
		masterArray[1][0] = true; masterArray[1][1] = false; masterArray[1][2] = true;
	}

	//Now check the end of the array.  Make sure that the last value and the second to last value are correctly labeled.
	//If the last two indexes are marked as false, in the process, then make the last index true.
	var last = masterArray[0].length -1;
	if(masterArray[0][last] > masterArray[0][last-1] && masterArray[1][last-2] == false){
		masterArray[1][last] = true; masterArray[1][last-1] = false;
	}
	if(masterArray[1][last-3] == false){
		masterArray[1][last-2] = true;
	}
	if(masterArray[1][last] == false && masterArray[1][last-1] == false){
		masterArray[1][last] = true;
	}
}

function finalTotal(){
	var grandTotal = 0,
		houseMatrix = [];
	for(i=0; i<maLength(); ++i){
		if(masterArray[1][i] == true){
			grandTotal += masterArray[0][i];
			houseMatrix.push(i + 1);
		}
	}
	document.write("You will make $"+ grandTotal + "</br>Rob houses: " + houseMatrix + "</br>");
}


houseRobInit([10,30,25,10,10,5,3,2,10]);//58
houseRobInit([20,10,50,5,1]) // 71
houseRobInit([20,50,10,1,5]) // 55