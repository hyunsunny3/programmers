// npm i figlet

var figlet = require("figlet");

figlet("Hyunsunny !!", function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);
});
