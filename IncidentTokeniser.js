//Receives input of a string and finds all Incident tokens in the code (Golfed code located at: https://codegolf.stackexchange.com/questions/107533/write-an-incident-tokeniser/107645#107645)
function tokeniser(){
	
//Generates Knuth Morris Pratt arrays for every possible substring

	for(index=0;index<word.length;index++){
	  kmpArray=[0];
	  j=0;
	  for(i=1;i<word.length-index;i++){
		while(j&&word.charAt(index+i)!=word.charAt(index+j)){
		  j=kmpArray[j-1];
		}
		if(word.charAt(index+i)==word.charAt(index+j)){
		  j++;
		}
		kmpArray.push(j);
	  }
	  kmpArrays.push(kmpArray);
	}
	
//Finds the maximum matching lengths at every single index in the word with each substring

	for(index=0;index<word.length;index++){
	  j=0;
	  matchLength=[];
	  for(i=0;i<word.length;i++){
		if(word.charAt(i)!=word.charAt(index+j)){
		  while(j&&word.charAt(i)!=word.charAt(index+j)){
			j=kmpArrays[index][j-1];
		  }
		  if(word.charAt(i)==word.charAt(index+j)){
			i--;
		  }else{
			matchLength.push(j);
		  }
		}else{
		  j++;
		  matchLength.push(j);
		  if(j==kmpArrays[index].length){
			j=kmpArrays[index][j-1];
		  }
		}
	  }
	  matchLengths.push(matchLength);
	}
	
//Finds the longest substrings that appear at least three times for each starting character in the string

	for(index=0;index<word.length;index++){
	  counts=[]
	  max=0;
	  for(i=0;i<=word.length;i++){
		counts.push(0);
	  }
	  for(i=0;i<word.length;i++){
		counts[matchLengths[index][i]]++;
	  }
	  for(i=word.length-1;i>0;i--){
		if(counts[i]==3){
		  max=i;
		  break;
		}
		if(kmpArrays[index][i-1]){
		  counts[kmpArrays[index][i]]+=counts[i-1];
		}
	  }
	  maxLengths.push(max);
	}

//Eliminates all substrings that do not appear exactly three times and all substrings of the longest valid substrings
	
	for(index=0;index<word.length;index++){
	  if(!maxLengths[index])
		continue;
	  for(i=0;i<word.length;i++){
		if(matchLengths[index][i]==maxLengths[index]){
		  tokens[i-maxLengths[index]+1]=maxLengths[index];
		}
	  }
	}
	
//Removes all overlapping substrings
	
	for(index=0;index<word.length;index++){
	  sStrs.push(word.substring(index,tokens[index]+index));
	  for(i=1;i<tokens[index];i++){
		toRemove[index+i]=1;
		if(tokens[index]<tokens[index+i]+i){
		  toRemove[index]=1;
		}
	  }
	}
	for(index=0;index<word.length;index++){
	  if(toRemove[index]){
		removal=sStrs[index];
		for(i=0;i<3;i++){
		  indxOf=sStrs.indexOf(removal);
		  sStrs[indxOf]="";
		  toRemove[indxOf]=0;
		}
	  }
	}
}