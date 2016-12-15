// .map - generates a new array
// foreach- undefined


var numbers = [1,2,3,4];

numbers.forEach(function(number){
  console.log(number);
});


for (var i=0; i<numbers.length; i++) {
  var number = numbers [i];
  console.log(number);
}

// this for loop acts like forEach to iterate over each numnber

// multiply an array of numbers by ten; map just describes how to get from your input to your output
// map array-- you will always get the same numbers of input as output and in the same order
var newNumbers = numbers.map(function(number) {
  return number * 10;
});

var compatible = rocks.filter(function(rock, index, rocks) {
  // rock=the actual value, index=the place in array, rocks=the entire array
  return rock.age<20
}).map(function(rock){
  return rock.name
});

// when a function doesn't change, it's immutable (functional programming)







)
