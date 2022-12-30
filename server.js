const fs = require('fs');

console.log("-------");
//console.log(fs);
console.log("-------");
//fs.mkdir('trial');
const content = 'Appended stuff !!!';

fs.appendFile('./helloWorld.txt', content, err => {
    if (err) {
        console.error(err);
    }
    console.log("file appended successfully");
});

fs.readFile('./helloWorld.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);
})