import LZString from "lz-string";

var string = "This is my compression test.";
console.log("Size of sample is: " + string.length);
var compressed = LZString.compressToEncodedURIComponent(string);
console.log("Size of compressed sample is: " + compressed.length);
console.log("Compressed sample is: " + compressed);
