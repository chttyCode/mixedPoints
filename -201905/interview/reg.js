let reg1=/(?=(\d{3})+$)/g,
reg2=/(?=(\d{3})+$)/g

123,234.5,698,908

123,234.569,890,8



// var result = "123456789".replace(/(?<!$)(?<=^(\d{3})+)/g, ',')
// console.log(result); 
// => "12345,678"

var regex = /(\d{4})-(\d{2})-(\1)/;
var string = "2017-06-12";
var result = string.replace(regex, "$1");
console.log(result); 