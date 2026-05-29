var fs = require('fs');
var src = fs.readFileSync('app.js', 'utf8');
var cutIdx = src.indexOf('// 5. UI CONTROLLER');
var codeToEval = src.substring(0, cutIdx);
var userCode = fs.readFileSync('user_input.cpp', 'utf8');
var testCode = codeToEval + "\nconsole.log(refactorCode(" + JSON.stringify(userCode) + "));\n";
fs.writeFileSync('_test_temp.js', testCode);
