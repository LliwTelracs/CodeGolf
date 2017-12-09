console.time("test");
h=(w,x,y,z)=>{retVal=0;while(x||y){if(x%2!=y%2)retVal++;x>>=1;y>>=1}return retVal*Math.pow(w+1,z)};
sum=(x,y)=>x+y;
for(input=1;input<10;input++){
  hammings=new Array(Math.pow(input+1,input));
  for(i=1<<(input-1);i<1<<input;i++){
    for(j=0;j<1<<(2*input);j++){
      hamming=0;
      for(k=0;k<input;k++){
        hamming+=(h(input,(j>>k)%(1<<input),i,k));
      }
      hammings[hamming]=1;
    }
  }
  console.log(hammings.reduce(sum));
}
console.timeEnd("test");