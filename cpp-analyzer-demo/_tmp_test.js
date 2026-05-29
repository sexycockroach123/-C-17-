var fs = require('fs');
var src = fs.readFileSync('app.js', 'utf8');
var cutIdx = src.indexOf('// 5. UI CONTROLLER');
var codeToEval = src.substring(0, cutIdx);
eval(codeToEval);
var names = Object.keys(EXAMPLES);
var pass = 0, fail = 0;
for (var i = 0; i < names.length; i++) {
    try {
        var result = refactorCode(EXAMPLES[names[i]]);
        console.log('PASS: ' + names[i]);
        pass++;
    } catch(e) {
        console.log('FAIL: ' + names[i] + ' - ' + e.message);
        fail++;
    }
}
console.log(pass + '/' + (pass+fail) + ' passed');
