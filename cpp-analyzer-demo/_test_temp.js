/* ==========================================================
   C++ Code Modernization Refactor Tool – app.js
   ========================================================== */

// ────────────────────────────────────────────────────────────
// 1. EXAMPLE DATA
// ────────────────────────────────────────────────────────────
var EXAMPLES = {
'legacy-malloc': [
    '#include <stdio.h>',
    '#include <stdlib.h>',
    '#include <string.h>',
    '',
    'int main() {',
    '    int *arr = (int*)malloc(10 * sizeof(int));',
    '    if (arr == NULL) {',
    '        printf("Memory allocation failed\\n");',
    '        return 1;',
    '    }',
    '',
    '    for (int i = 0; i < 10; i++) {',
    '        arr[i] = i * i;',
    '    }',
    '',
    '    for (int i = 0; i < 10; i++) {',
    '        printf("arr[%d] = %d\\n", i, arr[i]);',
    '    }',
    '',
    '    free(arr);',
    '    return 0;',
    '}'
].join('\n'),

'legacy-loops': [
    '#include <stdio.h>',
    '#define SIZE 5',
    '#define MAX(a,b) ((a)>(b)?(a):(b))',
    '',
    'int main() {',
    '    int numbers[SIZE] = {3, 1, 4, 1, 5};',
    '    int sum = 0;',
    '',
    '    for (int i = 0; i < SIZE; i++) {',
    '        sum += numbers[i];',
    '    }',
    '',
    '    printf("Sum = %d\\n", sum);',
    '    printf("Max = %d\\n", MAX(numbers[0], numbers[1]));',
    '',
    '    int *ptr = (int*)malloc(sizeof(int) * SIZE);',
    '    if (ptr != NULL) {',
    '        for (int i = 0; i < SIZE; i++) {',
    '            ptr[i] = numbers[i] * 2;',
    '        }',
    '        free(ptr);',
    '    }',
    '',
    '    return 0;',
    '}'
].join('\n'),

'legacy-full': [
    '#include <stdio.h>',
    '#include <stdlib.h>',
    '#include <string.h>',
    '',
    'struct Student {',
    '    char name[50];',
    '    int age;',
    '    float score;',
    '};',
    '',
    'int main() {',
    '    int n = 3;',
    '    struct Student *students = (struct Student*)malloc(n * sizeof(struct Student));',
    '    if (students == NULL) {',
    '        printf("Failed to allocate memory\\n");',
    '        return 1;',
    '    }',
    '',
    '    strcpy(students[0].name, "Alice");',
    '    students[0].age = 20;',
    '    students[0].score = 95.5;',
    '',
    '    strcpy(students[1].name, "Bob");',
    '    students[1].age = 21;',
    '    students[1].score = 88.0;',
    '',
    '    strcpy(students[2].name, "Charlie");',
    '    students[2].age = 19;',
    '    students[2].score = 72.3;',
    '',
    '    float *grades = (float*)malloc(n * sizeof(float));',
    '    for (int i = 0; i < n; i++) {',
    '        grades[i] = students[i].score;',
    '    }',
    '',
    '    float avg = 0;',
    '    for (int i = 0; i < n; i++) {',
    '        avg += grades[i];',
    '    }',
    '    avg = avg / n;',
    '',
    '    printf("Average score: %.1f\\n", avg);',
    '',
    '    for (int i = 0; i < n; i++) {',
    '        printf("Name: %s, Age: %d, Score: %.1f\\n",',
    '               students[i].name, students[i].age, students[i].score);',
    '    }',
    '',
    '    free(grades);',
    '    free(students);',
    '    return 0;',
    '}'
].join('\n'),

'legacy-io-normalize': [
    '#include <stdio.h>',
    '#include <string.h>',
    '#define MAX_SIZE 100',
    '#define PI 314',
    '',
    'using namespace std;',
    '',
    'int main() {',
    '    char name[50];',
    '    int age;',
    '    float score;',
    '',
    '    printf("Enter name: ");',
    '    scanf("%s", name);',
    '    printf("Enter age: ");',
    '    scanf("%d", &age);',
    '',
    '    puts("Student Record");',
    '    fprintf(stderr, "Debug: processing %s\\n", name);',
    '',
    '    int *ptr = NULL;',
    '    if (ptr == 0) {',
    '        printf("pointer is null\\n");',
    '    }',
    '',
    '    if (!ptr) {',
    '        puts("still null");',
    '    }',
    '',
    '    char dest[50];',
    '    strcpy(dest, name);',
    '    int len = strlen(dest);',
    '',
    '    printf("Name: %s, Age: %d, Length: %d\\n", dest, age, len);',
    '    sprintf(name, "Student: %s", dest);',
    '',
    '    return 0;',
    '}'
].join('\n'),

'legacy-macro-string': [
    '#include <stdio.h>',
    '#include <string.h>',
    '',
    '#define MAX(a,b) ((a)>(b)?(a):(b))',
    '#define MIN(a,b) ((a)<(b)?(a):(b))',
    '#define SQUARE(x) ((x)*(x))',
    '',
    'int main() {',
    '    char greeting[100];',
    '    strcpy(greeting, "Hello");',
    '    strcat(greeting, " World");',
    '    int len = strlen(greeting);',
    '',
    '    if (strcmp(greeting, "Hello World") == 0) {',
    '        printf("Match! len=%d\\n", len);',
    '    }',
    '',
    '    int a = 10, b = 20;',
    '    printf("Max: %d, Min: %d, Square: %d\\n", MAX(a,b), MIN(a,b), SQUARE(a));',
    '',
    '    return 0;',
    '}'
].join('\n'),

'legacy-stl-algorithms': [
    '#include <stdio.h>',
    '#include <stdlib.h>',
    '',
    'int main() {',
    '    int n = 5;',
    '    int *data = (int*)malloc(n * sizeof(int));',
    '    if (data == NULL) {',
    '        printf("Failed\\n");',
    '        return 1;',
    '    }',
    '',
    '    data[0] = 10; data[1] = 20; data[2] = 30; data[3] = 15; data[4] = 25;',
    '',
    '    int sum = 0;',
    '    for (int i = 0; i < n; i++) {',
    '        sum += data[i];',
    '    }',
    '',
    '    int count = 0;',
    '    for (int i = 0; i < n; i++) {',
    '        if (data[i] > 20) count++;',
    '    }',
    '',
    '    int maxVal = data[0];',
    '    for (int i = 1; i < n; i++) {',
    '        if (data[i] > maxVal) maxVal = data[i];',
    '    }',
    '',
    '    printf("Sum=%d Count=%d Max=%d\\n", sum, count, maxVal);',
    '',
    '    free(data);',
    '    return 0;',
    '}'
].join('\n'),

'legacy-stl-container': [
    '#include <stdio.h>',
    '#include <stdlib.h>',
    '',
    'int main() {',
    '    int *arr = (int*)malloc(100 * sizeof(int));',
    '    if (arr == NULL) {',
    '        printf("Allocation failed\\n");',
    '        return 1;',
    '    }',
    '    int n = 0;',
    '',
    '    arr[n++] = 10;',
    '    arr[n++] = 20;',
    '    arr[n++] = 30;',
    '    arr[n++] = 40;',
    '    arr[n++] = 50;',
    '',
    '    int target = 30;',
    '    int found = -1;',
    '    for (int i = 0; i < n; i++) {',
    '        if (arr[i] == target) { found = i; break; }',
    '    }',
    '',
    '    if (found != -1) {',
    '        printf("Found %d at index %d\\n", target, found);',
    '    }',
    '',
    '    int sum = 0;',
    '    for (int i = 0; i < n; i++) {',
    '        sum += arr[i];',
    '    }',
    '    printf("Sum = %d\\n", sum);',
    '',
    '    free(arr);',
    '    return 0;',
    '}'
].join('\n'),

'legacy-linkedlist': [
    '#include <stdio.h>',
    '#include <stdlib.h>',
    '',
    'struct Node {',
    '    int data;',
    '    struct Node *next;',
    '};',
    '',
    'int main() {',
    '    struct Node *head = NULL;',
    '',
    '    // Create linked list: 10 -> 20 -> 30',
    '    struct Node *n1 = (struct Node*)malloc(sizeof(struct Node));',
    '    n1->data = 10;',
    '    n1->next = head;',
    '    head = n1;',
    '',
    '    struct Node *n2 = (struct Node*)malloc(sizeof(struct Node));',
    '    n2->data = 20;',
    '    n2->next = head;',
    '    head = n2;',
    '',
    '    struct Node *n3 = (struct Node*)malloc(sizeof(struct Node));',
    '    n3->data = 30;',
    '    n3->next = head;',
    '    head = n3;',
    '',
    '    // Traverse and print',
    '    struct Node *curr = head;',
    '    while (curr != NULL) {',
    '        printf("%d ", curr->data);',
    '        curr = curr->next;',
    '    }',
    '    printf("\\n");',
    '',
    '    // Free all nodes',
    '    curr = head;',
    '    while (curr != NULL) {',
    '        struct Node *temp = curr;',
    '        curr = curr->next;',
    '        free(temp);',
    '    }',
    '',
    '    return 0;',
    '}'
].join('\n')
};

// ────────────────────────────────────────────────────────────
// 2. SYNTAX HIGHLIGHTER
// ────────────────────────────────────────────────────────────
var KEYWORDS = new Set([
    'auto','break','case','catch','class','const','constexpr','const_cast',
    'continue','default','delete','do','dynamic_cast','else','enum',
    'explicit','export','extern','false','for','friend','goto','if',
    'inline','mutable','namespace','new','noexcept','nullptr','operator',
    'private','protected','public','register','reinterpret_cast','return',
    'sizeof','static','static_cast','struct','switch','template','this',
    'throw','true','try','typedef','typeid','typename','union','using',
    'virtual','void','volatile','while'
]);

var TYPES = new Set([
    'bool','char','double','float','int','long','short','signed',
    'unsigned','size_t','int8_t','int16_t','int32_t','int64_t',
    'uint8_t','uint16_t','uint32_t','uint64_t','string','vector',
    'array','map','set','pair','tuple','unique_ptr','shared_ptr',
    'weak_ptr','make_unique','make_shared','cout','cin','endl',
    'printf','malloc','free','NULL','strcpy','strcmp','strlen'
]);

var ESC = { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' };

function esc(c) { return ESC[c] || c; }

// 安全转义：整段文本转为 HTML 实体，防止浏览器吞噬 < > 符号
function safeHTML(s) {
    return s.replace(/[&<>"']/g, function(c) { return ESC[c]; });
}

// 输出面板专用渲染：逐行转义 + 分词高亮，确保 < > 不被浏览器吞噬
function renderOutput(code) {
    var lines = code.split('\n');
    var htmlParts = [];
    var inBlock = false;
    for (var i = 0; i < lines.length; i++) {
        var raw = lines[i];
        var escaped = safeHTML(raw); // 先整体转义，确保安全
        if (inBlock) {
            var endEsc = escaped.indexOf('*&amp;/');
            if (endEsc !== -1) {
                // 找到 */ 的转义形式
                var endRaw = raw.indexOf('*/');
                htmlParts.push('<span class="tok-comment">' + safeHTML(raw.slice(0, endRaw + 2)) + '</span>' + highlightEscaped(raw.slice(endRaw + 2)));
                inBlock = false;
            } else {
                htmlParts.push('<span class="tok-comment">' + escaped + '</span>');
            }
            continue;
        }
        var bi = raw.indexOf('/*');
        if (bi !== -1) {
            var be = raw.indexOf('*/', bi + 2);
            if (be !== -1) {
                htmlParts.push(highlightEscaped(raw.slice(0, bi)) + '<span class="tok-comment">' + safeHTML(raw.slice(bi, be + 2)) + '</span>' + highlightEscaped(raw.slice(be + 2)));
            } else {
                htmlParts.push(highlightEscaped(raw.slice(0, bi)) + '<span class="tok-comment">' + safeHTML(raw.slice(bi)) + '</span>');
                inBlock = true;
            }
            continue;
        }
        if (/^\s*#/.test(raw)) {
            htmlParts.push('<span class="tok-pre">' + escaped + '</span>');
            continue;
        }
        htmlParts.push(highlightEscaped(raw));
    }
    return htmlParts.join('\n');
}

// 对单行原始文本做分词，每段输出都经过 safeHTML 转义
function highlightEscaped(code) {
    var r = '', i = 0, len = code.length;
    while (i < len) {
        // 单行注释
        if (code[i] === '/' && code[i+1] === '/') {
            r += '<span class="tok-comment">' + safeHTML(code.slice(i)) + '</span>';
            break;
        }
        // 字符串
        if (code[i] === '"') {
            var s = '"'; i++;
            while (i < len && code[i] !== '"') {
                if (code[i] === '\\') { s += code[i] + (code[i+1]||''); i += 2; }
                else { s += code[i]; i++; }
            }
            if (i < len) { s += '"'; i++; }
            r += '<span class="tok-str">' + safeHTML(s) + '</span>';
            continue;
        }
        // 字符字面量
        if (code[i] === "'") {
            var ch = "'"; i++;
            while (i < len && code[i] !== "'") {
                if (code[i] === '\\') { ch += code[i] + (code[i+1]||''); i += 2; }
                else { ch += code[i]; i++; }
            }
            if (i < len) { ch += "'"; i++; }
            r += '<span class="tok-str">' + safeHTML(ch) + '</span>';
            continue;
        }
        // 数字
        if (/\d/.test(code[i]) && (i === 0 || !/\w/.test(code[i-1]))) {
            var n = '';
            if (code[i] === '0' && (code[i+1] === 'x' || code[i+1] === 'X')) {
                n = '0x'; i += 2;
                while (i < len && /[0-9a-fA-F]/.test(code[i])) { n += code[i++]; }
            } else {
                while (i < len && /[\d.eE]/.test(code[i])) {
                    if ((code[i] === 'e' || code[i] === 'E') && (code[i+1] === '+' || code[i+1] === '-')) {
                        n += code[i] + code[i+1]; i += 2;
                    } else { n += code[i++]; }
                }
            }
            while (i < len && /[fFuUlL]/.test(code[i])) { n += code[i++]; }
            r += '<span class="tok-num">' + safeHTML(n) + '</span>';
            continue;
        }
        // 标识符/关键字
        if (/[a-zA-Z_]/.test(code[i])) {
            var w = '';
            while (i < len && /\w/.test(code[i])) { w += code[i++]; }
            if (KEYWORDS.has(w))           r += '<span class="tok-kw">' + safeHTML(w) + '</span>';
            else if (TYPES.has(w))         r += '<span class="tok-type">' + safeHTML(w) + '</span>';
            else if (w === 'nullptr')      r += '<span class="tok-nullptr">' + safeHTML(w) + '</span>';
            else if (i < len && code[i] === '(') r += '<span class="tok-fn">' + safeHTML(w) + '</span>';
            else                           r += safeHTML(w);
            continue;
        }
        // 其他字符（运算符、括号等）
        r += safeHTML(code[i]);
        i++;
    }
    return r;
}

function tokenizeLine(code) {
    var r = '', i = 0, len = code.length;
    while (i < len) {
        // single-line comment
        if (code[i] === '/' && code[i+1] === '/') {
            r += '<span class="tok-comment">' + esc(code.slice(i)) + '</span>';
            break;
        }
        // string
        if (code[i] === '"') {
            var s = '"'; i++;
            while (i < len && code[i] !== '"') {
                if (code[i] === '\\') { s += code[i] + (code[i+1]||''); i += 2; }
                else { s += code[i]; i++; }
            }
            if (i < len) { s += '"'; i++; }
            r += '<span class="tok-str">' + esc(s) + '</span>';
            continue;
        }
        // char literal
        if (code[i] === "'") {
            var ch = "'"; i++;
            while (i < len && code[i] !== "'") {
                if (code[i] === '\\') { ch += code[i] + (code[i+1]||''); i += 2; }
                else { ch += code[i]; i++; }
            }
            if (i < len) { ch += "'"; i++; }
            r += '<span class="tok-str">' + esc(ch) + '</span>';
            continue;
        }
        // number
        if (/\d/.test(code[i]) && (i === 0 || !/\w/.test(code[i-1]))) {
            var n = '';
            if (code[i] === '0' && (code[i+1] === 'x' || code[i+1] === 'X')) {
                n = '0x'; i += 2;
                while (i < len && /[0-9a-fA-F]/.test(code[i])) { n += code[i++]; }
            } else {
                while (i < len && /[\d.eE]/.test(code[i])) {
                    if ((code[i] === 'e' || code[i] === 'E') && (code[i+1] === '+' || code[i+1] === '-')) {
                        n += code[i] + code[i+1]; i += 2;
                    } else { n += code[i++]; }
                }
            }
            while (i < len && /[fFuUlL]/.test(code[i])) { n += code[i++]; }
            r += '<span class="tok-num">' + esc(n) + '</span>';
            continue;
        }
        // word
        if (/[a-zA-Z_]/.test(code[i])) {
            var w = '';
            while (i < len && /\w/.test(code[i])) { w += code[i++]; }
            if (KEYWORDS.has(w))           r += '<span class="tok-kw">' + esc(w) + '</span>';
            else if (TYPES.has(w))         r += '<span class="tok-type">' + esc(w) + '</span>';
            else if (w === 'nullptr')      r += '<span class="tok-nullptr">' + esc(w) + '</span>';
            else if (i < len && code[i] === '(') r += '<span class="tok-fn">' + esc(w) + '</span>';
            else                           r += esc(w);
            continue;
        }
        r += esc(code[i++]);
    }
    return r;
}

function highlightCode(code) {
    var lines = code.split('\n'), inBlock = false, out = [];
    for (var li = 0; li < lines.length; li++) {
        var line = lines[li];
        if (inBlock) {
            var end = line.indexOf('*/');
            if (end !== -1) {
                out.push('<span class="tok-comment">' + esc(line.slice(0, end+2)) + '</span>' + tokenizeLine(line.slice(end+2)));
                inBlock = false;
            } else {
                out.push('<span class="tok-comment">' + esc(line) + '</span>');
            }
            continue;
        }
        var bi = line.indexOf('/*');
        if (bi !== -1) {
            var be = line.indexOf('*/', bi+2);
            if (be !== -1) {
                var before = line.slice(0, bi);
                var block  = line.slice(bi, be+2);
                var after  = line.slice(be+2);
                out.push(tokenizeLine(before) + '<span class="tok-comment">' + esc(block) + '</span>' + tokenizeLine(after));
            } else {
                out.push(tokenizeLine(line.slice(0, bi)) + '<span class="tok-comment">' + esc(line.slice(bi)) + '</span>');
                inBlock = true;
            }
            continue;
        }
        if (/^\s*#/.test(line)) {
            out.push('<span class="tok-pre">' + esc(line) + '</span>');
            continue;
        }
        out.push(tokenizeLine(line));
    }
    return out.join('\n');
}

// ────────────────────────────────────────────────────────────
// 3. CODE ANALYZER
// ────────────────────────────────────────────────────────────
function stripComments(code) {
    return code.replace(/\/\*[\s\S]*?\*\//g, function(m) {
        return m.replace(/[^\n]/g, ' ');
    }).replace(/\/\/.*/g, function(m) {
        return m.replace(/./g, ' ');
    }).replace(/"(?:[^"\\]|\\.)*"/g, function(m) {
        return m.replace(/./g, ' ');
    });
}

function analyzeCode(code) {
    var issues = [], clean = stripComments(code), lines = code.split('\n'), clines = clean.split('\n');

    // Pre-scan: detect all variable names converted to vector by malloc→vector
    var vectorVars = {};
    var pointerVars = {};
    for (var ps = 0; ps < clines.length; ps++) {
        var psm = clines[ps].match(/std::vector<[^>]+>\s+(\w+)\s*\(/);
        if (psm) vectorVars[psm[1]] = true;
        var rpm = clines[ps].match(/(\w+)\s*\*\s*(\w+)\s*(?:=|;)/);
        if (rpm) pointerVars[rpm[2]] = true;
    }

    for (var i = 0; i < lines.length; i++) {
        var L = lines[i], CL = clines[i], n = i + 1;

        // ═══ 严重问题 ═══

        // malloc (must check BEFORE raw pointer to avoid false positive)
        if (/\bmalloc\s*\(/.test(CL)) {
            issues.push({ line: n, severity: 'critical',
                desc: '使用 malloc() 进行动态内存分配',
                suggest: '使用 std::vector 替代' });
        }

        // free
        if (/\bfree\s*\(/.test(CL)) {
            issues.push({ line: n, severity: 'critical',
                desc: '使用 free() 释放内存',
                suggest: '使用 std::vector / 智能指针自动管理内存' });
        }

        // new (raw) — single object or array
        if (/\bnew\b/.test(CL)) {
            if (/\bnew\s+\w+\s*\[/.test(CL)) {
                issues.push({ line: n, severity: 'critical',
                    desc: '使用 new[] 分配动态数组',
                    suggest: '使用 std::vector 替代' });
            } else if (/\w+\s*\*\s*\w+\s*=/.test(CL)) {
                issues.push({ line: n, severity: 'critical',
                    desc: '使用裸指针接收 new 分配的内存',
                    suggest: '使用 std::vector 或 std::unique_ptr 管理内存' });
            } else {
                issues.push({ line: n, severity: 'critical',
                    desc: '使用 new 动态分配内存',
                    suggest: '使用 std::vector 或智能指针管理内存' });
            }
        }

        // delete / delete[]
        if (/\bdelete\b/.test(CL)) {
            if (/\bdelete\s*\[\]/.test(CL)) {
                issues.push({ line: n, severity: 'critical',
                    desc: '使用 delete[] 释放数组',
                    suggest: '使用 std::vector 自动管理内存，无需手动 delete[]' });
            } else {
                // check if deleting a known vector variable
                var delMatch = CL.match(/\bdelete\s+(\w+)/);
                if (delMatch && vectorVars[delMatch[1]]) {
                    issues.push({ line: n, severity: 'critical',
                        desc: '对 std::vector 使用 delete（未定义行为）',
                        suggest: 'std::vector 自动管理内存，删除此行' });
                } else {
                    issues.push({ line: n, severity: 'critical',
                        desc: '使用 delete 释放内存',
                        suggest: '使用 std::vector 或智能指针自动管理内存' });
                }
            }
        }

        // if (ptr == nullptr) / if (ptr != nullptr) — unnecessary with vector
        if (/if\s*\([^)]*(?:==|!=)\s*nullptr\s*\)/.test(CL)) {
            // Check if comparing a vector variable to nullptr (syntax error!)
            var ptrCmpMatch = CL.match(/if\s*\(\s*(\w+)\s*(?:==|!=)\s*nullptr\s*\)/);
            if (ptrCmpMatch && vectorVars[ptrCmpMatch[1]]) {
                issues.push({ line: n, severity: 'critical',
                    desc: 'std::vector 变量 "' + ptrCmpMatch[1] + '" 与 nullptr 比较（语法错误）',
                    suggest: 'std::vector 不可与 nullptr 比较，移除此检查' });
            } else {
                issues.push({ line: n, severity: 'critical',
                    desc: '空指针检查——std::vector 分配失败自动抛异常',
                    suggest: '移除 nullptr 检查，vector/manage 内存无需手动判空' });
            }
        }

        // if (ptr == 0) / if (ptr != 0) — integer zero as null pointer
        if (/if\s*\(\s*\w+\s*(?:==|!=)\s*0\s*\)/.test(CL)) {
            var zeroMatch = CL.match(/if\s*\(\s*(\w+)\s*(?:==|!=)\s*0\s*\)/);
            if (zeroMatch && (pointerVars[zeroMatch[1]] || vectorVars[zeroMatch[1]])) {
                issues.push({ line: n, severity: 'warning',
                    desc: '使用整数 0 作为空指针常量',
                    suggest: '使用 nullptr 替代 0，或移除 vector 的空指针检查' });
            }
        }

        // if (!ptr) — boolean null check
        if (/if\s*\(\s*!\s*\w+\s*\)/.test(CL)) {
            var negMatch = CL.match(/if\s*\(\s*!\s*(\w+)\s*\)/);
            if (negMatch && pointerVars[negMatch[1]]) {
                issues.push({ line: n, severity: 'warning',
                    desc: '使用布尔值检查空指针',
                    suggest: '使用 if (ptr != nullptr) 或改用 std::vector' });
            }
        }

        // unpaired braces (simple check per line)
        var opens = (CL.match(/\{/g) || []).length;
        var closes = (CL.match(/\}/g) || []).length;
        if (opens !== closes && (opens > 0 || closes > 0)) {
            // Only flag if this isn't a normal block start/end line
            var trimmed = CL.trim();
            if (trimmed !== '{' && trimmed !== '}' && trimmed !== '};') {
                // Check if it's a struct/class/func opening or just an extra brace
                if (!/^[\w\s]*\{/.test(trimmed) || opens > 1) {
                    // Count running brace balance up to this line
                    var balance = 0;
                    for (var bi2 = 0; bi2 <= i; bi2++) {
                        balance += (clines[bi2].match(/\{/g) || []).length;
                        balance -= (clines[bi2].match(/\}/g) || []).length;
                    }
                    if (balance < 0) {
                        issues.push({ line: n, severity: 'critical',
                            desc: '花括号不匹配：多余的 }',
                            suggest: '检查代码块配对，确保 { } 正确闭合' });
                    }
                }
            }
        }

        // ═══ 警告 ═══

        // C-style cast
        if (/\(\s*(?:int|float|double|char|long|short|unsigned|void)\s*\*\s*\)\s*\w+/.test(CL)) {
            issues.push({ line: n, severity: 'warning',
                desc: '使用 C 风格类型转换',
                suggest: '使用 static_cast<>() 或现代 C++ 初始化' });
        }

        // NULL
        if (/\bNULL\b/.test(CL)) {
            issues.push({ line: n, severity: 'warning',
                desc: '使用 NULL 宏（C 风格空指针）',
                suggest: '使用 C++11 nullptr 替代' });
        }

        // implicit int main
        if (/^\s*main\s*\(/.test(CL) && !/^\s*(int|void|auto)\s+main/.test(CL)) {
            issues.push({ line: n, severity: 'warning',
                desc: 'main() 函数缺少显式返回类型',
                suggest: '使用 int main() 显式声明返回类型' });
        }

        // raw pointer decl (after filtering out malloc/free/delete/new/return lines)
        if (/\w+\s*\*\s*\w+/.test(CL) && !/\/\//.test(CL) && !/\*/.test(CL.replace(/\*/g,''))) {
            if (!/\bfree\s*\(/.test(CL) && !/\bdelete\b/.test(CL) && !/\breturn\b/.test(CL) &&
                !/\bprintf\b/.test(CL) && !/\bsizeof\b/.test(CL) && !/\bNULL\b/.test(CL) &&
                !/\bmain\b/.test(CL) && !/\bmalloc\b/.test(CL) && !/\bnew\b/.test(CL)) {
                issues.push({ line: n, severity: 'warning',
                    desc: '使用裸指针声明',
                    suggest: '考虑使用 std::unique_ptr、std::shared_ptr 或容器类' });
            }
        }

        // printf — suggest cout
        if (/\bprintf\s*\(/.test(CL)) {
            issues.push({ line: n, severity: 'info',
                desc: '使用 printf() 进行输出',
                suggest: '移除 printf，统一使用 std::cout' });
        }

        // scanf — suggest cin
        if (/\bscanf\s*\(/.test(CL)) {
            issues.push({ line: n, severity: 'warning',
                desc: '使用 scanf() 进行输入',
                suggest: '使用 std::cin 替代' });
        }

        // puts — suggest cout
        if (/\bputs\s*\(/.test(CL)) {
            issues.push({ line: n, severity: 'info',
                desc: '使用 puts() 进行输出',
                suggest: '使用 std::cout 替代' });
        }

        // fprintf — suggest cout/cerr
        if (/\bfprintf\s*\(/.test(CL)) {
            issues.push({ line: n, severity: 'warning',
                desc: '使用 fprintf() 进行格式化输出',
                suggest: '使用 std::cout / std::cerr 替代' });
        }

        // sprintf — buffer overflow risk
        if (/\bsprintf\s*\(/.test(CL)) {
            issues.push({ line: n, severity: 'warning',
                desc: '使用 sprintf()（缓冲区溢出风险）',
                suggest: '使用 std::to_string() 拼接或 std::ostringstream 格式化' });
        }

        // missing headers for printf/malloc/free
        if (/#include/.test(L)) {
            var allText = clean;
            if (/\bprintf\b/.test(allText) && !/#include\s*<(cstdio|stdio\.h)>/.test(allText)) {
                issues.push({ line: 1, severity: 'warning',
                    desc: '使用 printf() 但未包含对应头文件',
                    suggest: '移除 printf，改用 std::cout' });
            }
            if (/\bmalloc\b|\bfree\b/.test(allText) && !/#include\s*<(cstdlib|stdlib\.h)>/.test(allText)) {
                issues.push({ line: 1, severity: 'warning',
                    desc: '使用 malloc/free 但未包含对应头文件',
                    suggest: '使用 std::vector 替代 malloc/free' });
            }
        }

        // ═══ 建议优化 ═══
        if (/for\s*\(\s*\w+\s+\w+\s*=\s*\d+\s*;\s*\w+\s*[<>=!]+\s*\w+\s*;\s*\w+/.test(CL)) {
            issues.push({ line: n, severity: 'info',
                desc: '使用旧式 for 循环（索引遍历）',
                suggest: '可用范围 for 循环 for (auto& x : container) 简化；不熟悉则保留传统 for' });
        }

        // C headers
        if (/#include\s*<string\.h>/.test(L)) {
            issues.push({ line: n, severity: 'info',
                desc: '使用 C 头文件 <string.h>',
                suggest: '删除 C 头文件，重构后仅需 <iostream> 和 <vector>' });
        }
        if (/#include\s*<stdlib\.h>/.test(L)) {
            issues.push({ line: n, severity: 'info',
                desc: '使用 C 头文件 <stdlib.h>',
                suggest: '删除 C 头文件，重构后仅需 <iostream> 和 <vector>' });
        }
        if (/#include\s*<stdio\.h>/.test(L)) {
            issues.push({ line: n, severity: 'info',
                desc: '使用 C 头文件 <stdio.h>',
                suggest: '删除 C 头文件，重构后仅需 <iostream> 和 <vector>' });
        }

        // magic numbers (standalone integer literals in assignments, not 0/1)
        var magicMatch = CL.match(/=\s*(\d{2,})\s*;/);
        if (magicMatch && magicMatch[1] !== '0' && magicMatch[1] !== '1') {
            issues.push({ line: n, severity: 'info',
                desc: '使用魔法数字 ' + magicMatch[1],
                suggest: '替换为 constexpr 常量以提高可读性' });
        }

        // using namespace std
        if (/using\s+namespace\s+std\s*;/.test(CL)) {
            issues.push({ line: n, severity: 'warning',
                desc: '使用 using namespace std（污染命名空间）',
                suggest: '移除 using namespace std，使用 std:: 前缀' });
        }

        // #define constants
        var defMatch = CL.match(/#define\s+(\w+)\s+(\d+)\s*$/);
        if (defMatch && !/\(/.test(defMatch[1])) {
            issues.push({ line: n, severity: 'info',
                desc: '使用 #define 定义常量 ' + defMatch[1],
                suggest: '使用 constexpr int ' + defMatch[1] + ' = ' + defMatch[2] + ';' });
        }

        // #define function macros
        var funcMacroMatch = CL.match(/#define\s+(\w+)\(([^)]+)\)\s+(.+)/);
        if (funcMacroMatch) {
            issues.push({ line: n, severity: 'warning',
                desc: '使用 #define 定义函数宏 ' + funcMacroMatch[1] + '(' + funcMacroMatch[2] + ')',
                suggest: '使用 inline constexpr 函数或模板函数替代宏' });
        }

        // C-style array declarations
        if (/\w+\s+\w+\s*\[\s*\w+\s*\]\s*(?:=|;|\{)/.test(CL) && !/^\s*\/\//.test(CL)) {
            if (!/\bchar\b/.test(CL) && !/\bvoid\b/.test(CL) && !/\bmain\b/.test(CL)) {
                issues.push({ line: n, severity: 'info',
                    desc: '使用 C 风格数组声明',
                    suggest: '考虑使用 std::array 或 std::vector' });
            }
        }

        // C string functions
        if (/\b(?:strcpy|strcmp|strlen|strcat|strstr|strncpy)\s*\(/.test(CL)) {
            issues.push({ line: n, severity: 'warning',
                desc: '使用 C 风格字符串函数',
                suggest: '使用 std::string 类型及其成员函数（=、+=、.size()、==）' });
        }
    }

    // Check for unpaired braces overall
    var totalOpen = (clean.match(/\{/g) || []).length;
    var totalClose = (clean.match(/\}/g) || []).length;
    if (totalOpen > totalClose) {
        issues.push({ line: lines.length, severity: 'critical',
            desc: '花括号不匹配：缺少 ' + (totalOpen - totalClose) + ' 个 }',
            suggest: '检查代码块闭合' });
    } else if (totalClose > totalOpen) {
        issues.push({ line: lines.length, severity: 'critical',
            desc: '花括号不匹配：多余 ' + (totalClose - totalOpen) + ' 个 }',
            suggest: '检查并移除多余花括号' });
    }

    // deduplicate by line+desc
    var seen = {}, unique = [];
    for (var j = 0; j < issues.length; j++) {
        var key = issues[j].line + '|' + issues[j].desc;
        if (!seen[key]) { seen[key] = true; unique.push(issues[j]); }
    }

    var crit = 0, warn = 0, info = 0;
    for (var k = 0; k < unique.length; k++) {
        if (unique[k].severity === 'critical') crit++;
        else if (unique[k].severity === 'warning') warn++;
        else info++;
    }
    var maxScore = 100 - crit * 12 - warn * 5 - info * 2;
    var score = Math.max(0, Math.min(100, maxScore));

    return { issues: unique, score: score, counts: { critical: crit, warning: warn, info: info } };
}

// ────────────────────────────────────────────────────────────
// 3.5 FORMAT STRING PARSER (shared by printf/fprintf)
// ────────────────────────────────────────────────────────────
function parsePrintfFormat(fmt, args) {
    var parts = [], argIdx = 0, k = 0;
    while (k < fmt.length) {
        if (fmt[k] === '%' && k+1 < fmt.length) {
            var spec = fmt[k+1];
            if (spec === '%') { k += 2; continue; } // literal %
            if (spec === 'd' || spec === 'f' || spec === 's' || spec === 'c' ||
                spec === 'x' || spec === 'o' || spec === 'u' || spec === 'p' ||
                spec === 'l' || spec === '.') {
                if (spec === '.') {
                    var pe = k+2;
                    while (pe < fmt.length && /[0-9]/.test(fmt[pe])) pe++;
                    if (pe < fmt.length) pe++;
                    if (argIdx < args.length) parts.push(args[argIdx++]);
                    k = pe; continue;
                }
                if (spec === 'l' && k+2 < fmt.length && fmt[k+2] === 'd') {
                    if (argIdx < args.length) parts.push(args[argIdx++]);
                    k += 3; continue;
                }
                if (argIdx < args.length) parts.push(args[argIdx++]);
                k += 2; continue;
            }
        }
        var plain = '';
        while (k < fmt.length && fmt[k] !== '%') { plain += fmt[k++]; }
        if (plain) parts.push('"' + plain + '"');
    }
    return parts;
}

// 括号感知的参数分割：跟踪 () 和 [] 深度，仅深度 0 时按 , 分割
function splitArgs(s) {
    var args = [], depth = 0, cur = '';
    for (var i = 0; i < s.length; i++) {
        var c = s[i];
        if (c === '(' || c === '[') depth++;
        else if (c === ')' || c === ']') depth--;
        if (c === ',' && depth === 0) {
            args.push(cur.trim());
            cur = '';
        } else {
            cur += c;
        }
    }
    if (cur.trim()) args.push(cur.trim());
    return args;
}

// 从 openIdx（指向 '('）开始，找到匹配的 ')' 位置
function findClosingParen(s, openIdx) {
    var depth = 0;
    for (var i = openIdx; i < s.length; i++) {
        if (s[i] === '(') depth++;
        else if (s[i] === ')') { depth--; if (depth === 0) return i; }
    }
    return -1;
}

// ────────────────────────────────────────────────────────────
// 4. REFACTORING ENGINE
// ────────────────────────────────────────────────────────────
function refactorCode(code) {
    var lines = code.split('\n'), result = [], headers = {};

    // detect existing headers
    for (var h = 0; h < lines.length; h++) {
        var hm = lines[h].match(/#include\s*<([^>]+)>/);
        if (hm) headers[hm[1]] = true;
    }
    function hasH(h) { return !!headers[h]; }

    // Phase 1: process headers — strict cleanup per rules: only <iostream> + <vector>
    var headerLines = [];
    for (var i = 0; i < lines.length; i++) {
        var L = lines[i];
        if (/^\s*#include/.test(L)) {
            // drop ALL C/C++ headers — will add only iostream & vector below
            continue;
        }
        break;
    }

    var rest = lines.slice(i);
    var cleanRest = stripComments(rest.join('\n'));

    // only add <iostream> and <vector> as required by rules
    headerLines.push('#include <iostream>');
    headers['iostream'] = true;
    if (/\bvector\b/.test(cleanRest) || /\bmalloc\b/.test(cleanRest)) {
        headerLines.push('#include <vector>');
        headers['vector'] = true;
    }
    // add <string> if C string functions are used
    if (/\b(?:strcpy|strcmp|strlen|strcat|strstr|strncpy|sprintf)\b/.test(cleanRest)) {
        if (!hasH('string')) { headerLines.push('#include <string>'); headers['string'] = true; }
    }

    result = headerLines;

    // Phase 2: detect variables converted from malloc to vector (must skip free/delete on these)
    var vectorVars = {};
    var pointerVars = {};
    var charArrayVars = {};
    var structStringMembers = {};  // "StructName.field" → true for char[] members
    var linkedListStructs = {};    // structName → true if it has a next/prev pointer (linked list node)
    var listVars = {};             // varName → true if allocated as linked list node
    var linkedListDataFields = {}; // structName → [{name, type}] for data fields (non-pointer, non-next/prev)
    var linkedListElemType = {};   // structName → data field type (e.g., 'int') for push_back
    var listNodeVars = {};         // nodeVarName → listHeadName for curr=head patterns
    var cleanBodyLines = stripComments(rest.join('\n')).split('\n');
    // Track struct definitions: char[] members + linked list detection
    var inStruct = false, structName = '', structDepth = 0, structFields = [];
    for (var d = 0; d < cleanBodyLines.length; d++) {
        var dcl = cleanBodyLines[d];
        if (!inStruct) {
            var stm = dcl.match(/\bstruct\s+(\w+)\s*\{/);
            if (stm) { inStruct = true; structName = stm[1]; structDepth = 1; structFields = []; continue; }
        } else {
            structDepth += (dcl.match(/\{/g) || []).length - (dcl.match(/\}/g) || []).length;
            if (structDepth <= 0) {
                // Check if struct has next/prev pointer (linked list node)
                var hasSelfRef = false;
                for (var fi = 0; fi < structFields.length; fi++) {
                    if (structFields[fi].type === 'struct ' + structName + '*' ||
                        structFields[fi].type === structName + '*' ||
                        structFields[fi].name === 'next' || structFields[fi].name === 'prev') {
                        hasSelfRef = true; break;
                    }
                }
                if (hasSelfRef) {
                    linkedListStructs[structName] = true;
                    // Record data fields (non-pointer, non-next/prev)
                    var dataFields = [];
                    for (var fi2 = 0; fi2 < structFields.length; fi2++) {
                        if (structFields[fi2].name !== 'next' && structFields[fi2].name !== 'prev' &&
                            structFields[fi2].type.indexOf('*') === -1) {
                            dataFields.push(structFields[fi2]);
                        }
                    }
                    if (dataFields.length > 0) {
                        linkedListDataFields[structName] = dataFields;
                        linkedListElemType[structName] = dataFields[0].type;
                    }
                }
                inStruct = false; structName = ''; structFields = []; continue;
            }
            var scm = dcl.match(/\bchar\s+(\w+)\s*\[/);
            if (scm) {
                structStringMembers[structName + '.' + scm[1]] = true;
                structFields.push({ type: 'char[]', name: scm[1] });
            }
            var sfm = dcl.match(/\b(?:struct\s+)?(\w+)\s*\*\s*(\w+)\s*;/);
            if (sfm) structFields.push({ type: sfm[1] + '*', name: sfm[2] });
            var sfd = dcl.match(/\b(\w+)\s+(\w+)\s*(?:\[[^\]]*\])?\s*;/);
            if (sfd && !sfm && !scm) structFields.push({ type: sfd[1], name: sfd[2] });
        }
    }
    for (var d = 0; d < rest.length; d++) {
        var dcl = cleanBodyLines[d];
        var vam = dcl.match(/std::vector<[^>]+>\s+(\w+)\s*\(/);
        if (vam) vectorVars[vam[1]] = true;
        // Track raw pointer declarations
        var rpm = dcl.match(/(\w+)\s*\*\s*(\w+)\s*(?:=|;)/);
        if (rpm) pointerVars[rpm[2]] = true;
        // Track char array declarations: char name[N]
        var cam = dcl.match(/\bchar\s+(\w+)\s*\[/);
        if (cam) charArrayVars[cam[1]] = true;
        // Detect malloc patterns: array allocation → vector, linked list node → list
        var vam2 = dcl.match(/(\w+)\s*\*\s*(\w+)\s*=\s*\(?[^=]*malloc\s*\(/);
        if (vam2) {
            var mallocType = vam2[1];
            var mallocVar = vam2[2];
            // Check if it's a linked list node allocation
            if (linkedListStructs[mallocType] || linkedListStructs[mallocType.replace(/^struct\s+/, '')]) {
                listVars[mallocVar] = true;
            } else {
                // Array allocation → vector
                var mam = dcl.match(/malloc\s*\(.*sizeof.*\*\s*(\w+)\s*\)/);
                var mam2 = dcl.match(/malloc\s*\(\s*(\w+)\s*\*\s*sizeof/);
                var mam3 = dcl.match(/malloc\s*\(\s*(\w+)\s*\*\s*sizeof\s*\(\s*(?:struct\s+)?(\w+)\s*\)/);
                if (mam || mam2 || mam3) {
                    vectorVars[mallocVar] = true;
                }
            }
        }
    }

    // Phase 2-factory: detect factory functions that create linked list nodes
    // A factory function: (1) is not main, (2) returns a pointer to a linked list struct,
    // (3) contains malloc inside, (4) returns a malloc'd variable
    var factoryFuncs = {};      // funcName → { elemType, lineStart, lineEnd }
    var factoryFuncNames = {};  // funcName → true (quick lookup)
    var inFunc = '', funcBrDepth = 0, funcStartLine = -1;
    var funcReturnType = '';
    for (var d5 = 0; d5 < cleanBodyLines.length; d5++) {
        var d5cl = cleanBodyLines[d5];
        if (!inFunc) {
            // Match function definition: Type* funcName(...) {
            var fDefM = d5cl.match(/^(\s*)(?:(?:static|inline|extern)\s+)*(?:struct\s+)?(\w+)\s*\*\s*(\w+)\s*\([^)]*\)\s*\{?\s*$/);
            if (fDefM && fDefM[3] !== 'main') {
                inFunc = fDefM[3];
                funcReturnType = fDefM[2];
                funcBrDepth = 1;
                funcStartLine = d5;
            }
        } else {
            funcBrDepth += (d5cl.match(/\{/g) || []).length - (d5cl.match(/\}/g) || []).length;
            if (funcBrDepth <= 0) {
                // Function ended — check if it's a factory (returns a linked list node)
                if (linkedListStructs[funcReturnType] || linkedListStructs[funcReturnType.replace(/^struct\s+/, '')]) {
                    var elemT = linkedListElemType[funcReturnType] || linkedListElemType[funcReturnType.replace(/^struct\s+/, '')] || 'int';
                    factoryFuncs[inFunc] = { elemType: elemT, returnType: funcReturnType, lineStart: funcStartLine, lineEnd: d5 };
                    factoryFuncNames[inFunc] = true;
                }
                inFunc = ''; funcBrDepth = 0; funcStartLine = -1;
            }
        }
    }

    // Phase 2-chain-pre: detect list heads from factory call assignments
    // If head = createNode(10) and createNode is a factory function, head is a list head
    for (var d6p = 0; d6p < cleanBodyLines.length; d6p++) {
        var d6pcl = cleanBodyLines[d6p];
        var fcHeadM = d6pcl.match(/^\s*(?:(?:struct\s+)?\w+\s*\*\s*)?(\w+)\s*=\s*(\w+)\s*\(/);
        if (fcHeadM && factoryFuncNames[fcHeadM[2]] && !listVars[fcHeadM[1]]) {
            listVars[fcHeadM[1]] = true;
        }
    }

    // Phase 2-chain: detect factory calls and record their push_back targets
    // factoryCallInfo[lineNum] = { targetList, value }
    var factoryCallInfo = {};
    for (var d6 = 0; d6 < cleanBodyLines.length; d6++) {
        var d6cl = cleanBodyLines[d6];
        // Pattern: [Type*] var = funcName(value)
        var fcM1 = d6cl.match(/^\s*(?:(?:struct\s+)?\w+\s*\*\s*)?(\w+)\s*=\s*(\w+)\s*\(\s*(.+?)\s*\)\s*;?\s*$/);
        if (fcM1 && factoryFuncNames[fcM1[2]]) {
            var fcVar = fcM1[1], fcVal = fcM1[3];
            // Find the list this variable belongs to
            var fcTarget = null;
            if (listVars[fcVar]) {
                fcTarget = fcVar;
            } else {
                // Look for an assignment like listVar = fcVar nearby
                for (var d6b = d6 + 1; d6b < Math.min(d6 + 10, cleanBodyLines.length); d6b++) {
                    var d6bcl = cleanBodyLines[d6b];
                    var fcAsgn = d6bcl.match(/^\s*(\w+)\s*=\s*(\w+)\s*;$/);
                    if (fcAsgn && listVars[fcAsgn[1]] && fcAsgn[2] === fcVar) {
                        fcTarget = fcAsgn[1];
                        break;
                    }
                }
                if (!fcTarget) {
                    // Fallback: first list var
                    for (var lv in listVars) { fcTarget = lv; break; }
                }
            }
            if (fcTarget) {
                factoryCallInfo[d6] = { targetList: fcTarget, value: fcVal, funcName: fcM1[2] };
            }
        }
        // Pattern: var->next...->next = funcName(value) (chain assignment)
        var fcM2 = d6cl.match(/^\s*(\w+)\s*(?:->\s*next\s*)+\s*=\s*(\w+)\s*\(\s*(.+?)\s*\)\s*;?\s*$/);
        if (fcM2 && factoryFuncNames[fcM2[2]]) {
            var fcRoot = fcM2[1], fcVal2 = fcM2[3];
            var fcTarget2 = null;
            if (listVars[fcRoot]) {
                fcTarget2 = fcRoot;
            } else {
                // Find the list this root variable points to
                for (var lv2 in listVars) { fcTarget2 = lv2; break; }
            }
            if (fcTarget2) {
                factoryCallInfo[d6] = { targetList: fcTarget2, value: fcVal2, funcName: fcM2[2] };
            }
        }
    }

    // Phase 2b: detect list heads from assignment patterns
    // Track which vars were originally malloc'd (before we add more to listVars)
    var mallocListVars = {};
    for (var mlv in listVars) mallocListVars[mlv] = true;

    // Pass 1: detect list heads (head = n1 where n1 is a malloc'd list var)
    for (var d2 = 0; d2 < rest.length; d2++) {
        var d2cl = cleanBodyLines[d2];
        var nodeAssignM = d2cl.match(/^\s*(\w+)\s*=\s*(\w+)\s*;$/);
        if (nodeAssignM) {
            var lhs = nodeAssignM[1], rhs = nodeAssignM[2];
            if (mallocListVars[rhs] && !listVars[lhs] && pointerVars[lhs]) {
                // head = n1 where n1 is a malloc'd list var → head is also a list head
                listVars[lhs] = true;
            }
        }
    }
    // Pass 2: detect node pointers assigned from list heads (e.g., curr = head)
    for (var d2b = 0; d2b < rest.length; d2b++) {
        var d2bcl = cleanBodyLines[d2b];
        var nodeAssignM2 = d2bcl.match(/^\s*(?:(?:struct\s+)?\w+\s*\*\s*)?(\w+)\s*=\s*(\w+)\s*;$/);
        if (nodeAssignM2 && listVars[nodeAssignM2[2]] && !listVars[nodeAssignM2[1]]) {
            listNodeVars[nodeAssignM2[1]] = nodeAssignM2[2];
        }
    }

    // Phase 2c: build node → list mapping (for malloc→push_back targeting)
    var nodeToList = {}; // nodeVarName → listHeadName
    // Check assignments like: head = newNode or tail->next = newNode
    for (var d3 = 0; d3 < rest.length; d3++) {
        var d3cl = cleanBodyLines[d3];
        // Pattern: listHead = nodeVar;
        var nlM1 = d3cl.match(/^\s*(\w+)\s*=\s*(\w+)\s*;$/);
        if (nlM1 && listVars[nlM1[1]] && mallocListVars[nlM1[2]]) {
            nodeToList[nlM1[2]] = nlM1[1];
        }
        // Pattern: any->next = nodeVar;
        var nlM2 = d3cl.match(/^\s*\w+\s*->\s*next\s*=\s*(\w+)\s*;$/);
        if (nlM2 && !listVars[nlM2[1]]) {
            // Find the list from the context (look for a nearby list assignment)
            for (var d3b = Math.max(0, d3 - 5); d3b <= Math.min(rest.length - 1, d3 + 5); d3b++) {
                var d3bcl = cleanBodyLines[d3b];
                var nlM3 = d3bcl.match(/^(\w+)\s*=\s*(\w+)\s*;$/);
                if (nlM3 && listVars[nlM3[1]] && nlM3[2] === nlM2[1]) {
                    nodeToList[nlM2[1]] = nlM3[1];
                    break;
                }
            }
        }
    }

    // 辅助函数：检查变量是否为 std::string 类型（包括 struct 成员）
    function isStringVar(expr) {
        if (charArrayVars[expr]) return true;
        // Check struct member access: students[0].name → Student.name
        var dotParts = expr.split('.');
        if (dotParts.length >= 2) {
            var fieldName = dotParts[dotParts.length - 1];
            for (var key in structStringMembers) {
                if (key.endsWith('.' + fieldName)) return true;
            }
        }
        return false;
    }

    // 辅助函数：合并括号不配对的后续行
    function joinContinuation(lines, startIdx) {
        var line = lines[startIdx], cs = stripComments(line);
        var depth = 0;
        for (var c = 0; c < cs.length; c++) {
            if (cs[c] === '(') depth++;
            else if (cs[c] === ')') depth--;
        }
        var extraLines = 0;
        while (depth > 0 && startIdx + extraLines + 1 < lines.length) {
            extraLines++;
            var next = lines[startIdx + extraLines];
            var ncs = stripComments(next);
            for (var nc = 0; nc < ncs.length; nc++) {
                if (ncs[nc] === '(') depth++;
                else if (ncs[nc] === ')') depth--;
            }
            line += '\n' + next;
        }
        return { line: line, extraLines: extraLines };
    }

    var pendingListPushBack = {}; // nodeVarName → true for malloc'd nodes awaiting data assignment
    var pushedToList = {}; // nodeVarName → true for nodes whose data was already pushed via push_back
    // Helper: check if a line index is inside a factory function
    function isInFactoryFunc(lineIdx) {
        for (var fn in factoryFuncs) {
            if (lineIdx >= factoryFuncs[fn].lineStart && lineIdx <= factoryFuncs[fn].lineEnd) return true;
        }
        return false;
    }
    // Helper: check if a line contains a factory function call
    function hasFactoryCall(lineText) {
        for (var fn in factoryFuncNames) {
            if (lineText.indexOf(fn + '(') !== -1) return true;
        }
        return false;
    }
    // Check if a linked list struct has only 1 data field (can delete struct)
    function hasSingleDataField(structName) {
        var fields = linkedListDataFields[structName] || [];
        return fields.length <= 1;
    }
    // Get the struct name for a list variable (via factory func or nodeToList)
    function getListStructName(listVar) {
        for (var fn in factoryFuncs) {
            // Find which list this factory's output goes to
            for (var li in factoryCallInfo) {
                if (factoryCallInfo[li].targetList === listVar) return factoryFuncs[fn].returnType;
            }
        }
        for (var sn in linkedListElemType) return sn;
        return '';
    }
    // Phase 2d: preprocess linked list malloc → temporary pointer
    // This must happen before Phase 3 so the malloc lines are already converted
    // Skip lines inside factory functions (they'll be removed entirely)
    for (var d4 = 0; d4 < rest.length; d4++) {
        if (isInFactoryFunc(d4)) continue;
        var d4cl = stripComments(rest[d4]);
        // Pattern: struct Node *n1 = (struct Node*)malloc(sizeof(struct Node));
        var llPreM = d4cl.match(/^(\s*)(?:struct\s+)?(\w+)\s*\*\s*(\w+)\s*=\s*(?:\(\s*(?:struct\s+)?\w+\s*\*\s*\)\s*)?malloc\s*\(\s*sizeof\s*\(\s*(?:struct\s+)?(\w+)\s*\)\s*\)\s*;?\s*$/);
        if (llPreM && listVars[llPreM[3]]) {
            var preType = llPreM[4];
            var elemT = linkedListElemType[preType] || linkedListElemType[preType.replace(/^struct\s+/, '')] || 'int';
            rest[d4] = llPreM[1] + 'auto _tmp = ' + elemT + '{}; ' + llPreM[3] + ' = &_tmp;';
            pendingListPushBack[llPreM[3]] = true;
            if (!hasH('list')) { headerLines.push('#include <list>'); headers['list'] = true; }
        }
    }

    // Phase 3: transform body line by line
    var bodyLines = [];
    var skipBlock = false;
    var blockDepth = 0;
    var skipCount = 0;
    var declaredListVars = {}; // track which list vars already have std::list<T> declarations
    for (var j = 0; j < rest.length; j++) {
        if (skipCount > 0) { skipCount--; continue; }
        var line = rest[j], cl = stripComments(line);
        var skipLine = false;

        // ── Block-skipping continuation (for nullptr/if-block removal) ──
        if (skipBlock) {
            blockDepth += (cl.match(/\{/g) || []).length;
            blockDepth -= (cl.match(/\}/g) || []).length;
            if (blockDepth <= 0) skipBlock = false;
            continue; // skip this line entirely
        }

        // ── #define CONST → constexpr ──
        var defMatch = cl.match(/^\s*#define\s+(\w+)\s+(\d+)\s*$/);
        if (defMatch && !/\(/.test(defMatch[1])) {
            line = line.replace(/#define\s+(\w+)\s+(\d+)/, 'constexpr int $1 = $2;');
        }

        // ── #define FUNC(args) body → template function ──
        var funcMacroM = cl.match(/^\s*#define\s+(\w+)\(([^)]+)\)\s+(.+)\s*$/);
        if (funcMacroM) {
            var macroName = funcMacroM[1];
            var macroParams = funcMacroM[2].split(/\s*,\s*/);
            var macroBody = funcMacroM[3];
            // Build template parameter list: const T& a, const T& b
            var tplParams = [];
            for (var pi = 0; pi < macroParams.length; pi++) {
                tplParams.push('const T& ' + macroParams[pi].trim());
            }
            var indent = line.match(/^(\s*)/)[1];
            line = indent + 'template<typename T>\n' +
                   indent + 'inline constexpr auto ' + macroName + '(' + tplParams.join(', ') + ') { return ' + macroBody + '; }';
        }

        // ── using namespace std → remove ──
        if (/^\s*using\s+namespace\s+std\s*;/.test(cl)) {
            skipLine = true;
        }

        // ── Factory function: skip entire function definition (only when struct has 1 data field) ──
        if (!skipLine && Object.keys(factoryFuncs).length > 0) {
            var fDefM = cl.match(/^(\s*)(?:(?:static|inline|extern)\s+)*(?:struct\s+)?(\w+)\s*\*\s*(\w+)\s*\(([^)]*)\)\s*\{?\s*$/);
            if (fDefM && factoryFuncNames[fDefM[3]]) {
                if (hasSingleDataField(factoryFuncs[fDefM[3]].returnType)) {
                    // 1 data field: delete factory function entirely
                    skipLine = true;
                    skipBlock = true;
                    blockDepth = 1;
                } else {
                    // ≥2 data fields: convert factory function from pointer→value return
                    var retType = factoryFuncs[fDefM[3]].returnType;
                    var params = fDefM[4];
                    line = fDefM[1] + retType + ' ' + fDefM[3] + '(' + params + ') {';
                }
            }
        }

        // ── Inside factory function (≥2 data fields): convert pointer patterns ──
        if (!skipLine && Object.keys(factoryFuncs).length > 0) {
            // Find which factory function we're in (if any)
            var inFactoryName = null;
            for (var fn in factoryFuncs) {
                if (j >= factoryFuncs[fn].lineStart && j <= factoryFuncs[fn].lineEnd && !hasSingleDataField(factoryFuncs[fn].returnType)) {
                    inFactoryName = fn;
                    break;
                }
            }
            if (inFactoryName) {
                var fRetType = factoryFuncs[inFactoryName].returnType;
                // malloc → local variable: Type* node = malloc(sizeof(Type)) → Type node;
                var fMallocM = cl.match(/^(\s*)(?:struct\s+)?\w+\s*\*\s*(\w+)\s*=\s*(?:\([^)]*\)\s*)?malloc\s*\(.*?\)\s*;?\s*$/);
                if (fMallocM) {
                    line = fMallocM[1] + fRetType + ' ' + fMallocM[2] + ';';
                    cl = stripComments(line); // update cl to prevent general malloc from overriding
                }
                // return NULL; → return {};
                if (/^\s*return\s+NULL\s*;\s*$/.test(cl)) {
                    line = line.replace(/return\s+NULL\s*;/, 'return {};');
                    cl = stripComments(line);
                }
                // Remove node->next = NULL/val (next field managed by std::list)
                if (/\w+\s*->\s*next\s*=/.test(cl)) {
                    skipLine = true;
                }
                // node->field → node.field (for non-next fields)
                line = line.replace(/\b(\w+)\s*->\s*(?!next\b)(\w+)/g, '$1.$2');
                cl = stripComments(line);
                // if (node == NULL) → remove block (malloc never returns NULL in modern C++)
                if (/if\s*\(\s*\w+\s*==\s*(?:NULL|nullptr)\s*\)/.test(cl)) {
                    skipLine = true;
                    skipBlock = true;
                    // Count braces on this line — the { on "if(...) {" must be counted
                    // because skipBlock was false when this line started processing
                    blockDepth = (cl.match(/\{/g) || []).length - (cl.match(/\}/g) || []).length;
                }
            }
        }

        // ── Factory call: var = createNode(val) → [declare list;] list.push_back(...) ──
        if (!skipLine && factoryCallInfo[j] !== undefined) {
            var fcInfo = factoryCallInfo[j];
            var fcIndent = line.match(/^(\s*)/)[1];
            // Re-extract value from original line (cl has stripped string literals)
            var fcValRe = new RegExp('\\b' + fcInfo.funcName + '\\s*\\(\\s*(.+?)\\s*\\)');
            var fcValM = line.match(fcValRe);
            var fcVal = fcValM ? fcValM[1] : fcInfo.value;
            // Determine element type based on data field count
            var fcStructName = getListStructName(fcInfo.targetList);
            var fcSingleField = hasSingleDataField(fcStructName);
            var fcElemType = fcSingleField ? (linkedListElemType[fcStructName] || 'int') : fcStructName;
            // Emit list declaration if not yet declared
            if (!declaredListVars[fcInfo.targetList]) {
                bodyLines.push(fcIndent + 'std::list< ' + fcElemType + ' > ' + fcInfo.targetList + ';');
                declaredListVars[fcInfo.targetList] = true;
                if (!hasH('list')) { headerLines.push('#include <list>'); headers['list'] = true; }
            }
            if (fcSingleField) {
                // 1 data field: push_back(value)
                line = fcIndent + fcInfo.targetList + '.push_back(' + fcVal + ');';
            } else {
                // ≥2 data fields: push_back(createNode(value)) — keep factory call
                line = fcIndent + fcInfo.targetList + '.push_back(' + fcInfo.funcName + '(' + fcVal + '));';
            }
        }

        // ── Node* declaration with factory call already handled → skip ──
        // (Lines like "Node* head = createNode(10);" are handled by factoryCallInfo above,
        //  but we also need to remove standalone "Node* var;" declarations)
        if (!skipLine) {
            var nodeDeclM = cl.match(/^(?:\s*)(?:struct\s+)?(\w+)\s*\*\s*(\w+)\s*;\s*$/);
            if (nodeDeclM && linkedListStructs[nodeDeclM[1]] && !listVars[nodeDeclM[2]]) {
                skipLine = true;
            }
        }

        // ── malloc → vector / list ──
        if (/\bmalloc\s*\(/.test(cl)) {
            var converted = false;
            // Pattern 1: T *var = [(T*)]malloc(sizeof(T) * n)
            var m = cl.match(/(\w+)\s*\*\s*(\w+)\s*=\s*(?:\([^)]*\)\s*)?malloc\s*\(\s*sizeof\s*\(\s*(?:struct\s+)?(\w+)\s*\)\s*\*\s*(\w+)\s*\)/);
            if (m) {
                var mallocType1 = m[1], mallocVar1 = m[2], elemType1 = m[3], count1 = m[4];
                if (listVars[mallocVar1]) {
                    // Linked list node → std::list
                    line = line.replace(
                        /\w+\s*\*\s*\w+\s*=\s*(?:\([^)]*\)\s*)?malloc\s*\([^;]*\)/,
                        'std::list< ' + elemType1 + ' > ' + mallocVar1
                    );
                    if (!hasH('list')) { headerLines.push('#include <list>'); headers['list'] = true; }
                } else {
                    line = line.replace(
                        /\w+\s*\*\s*\w+\s*=\s*(?:\([^)]*\)\s*)?malloc\s*\([^;]*\)/,
                        'std::vector< ' + elemType1 + ' > ' + mallocVar1 + '(' + count1 + ')'
                    );
                    vectorVars[mallocVar1] = true;
                }
                converted = true;
            } else {
                // Pattern 2: T *var = [(T*)]malloc(n * sizeof(T))
                var m2 = cl.match(/(\w+)\s*\*\s*(\w+)\s*=\s*(?:\([^)]*\)\s*)?malloc\s*\(\s*(\w+)\s*\*\s*sizeof\s*\(\s*(?:struct\s+)?(\w+)\s*\)\s*\)/);
                if (m2) {
                    var mallocType2 = m2[1], mallocVar2 = m2[2], count2 = m2[3], elemType2 = m2[4];
                    if (listVars[mallocVar2]) {
                        line = line.replace(
                            /\w+\s*\*\s*\w+\s*=\s*(?:\([^)]*\)\s*)?malloc\s*\([^;]*\)/,
                            'std::list< ' + elemType2 + ' > ' + mallocVar2
                        );
                        if (!hasH('list')) { headerLines.push('#include <list>'); headers['list'] = true; }
                    } else {
                        line = line.replace(
                            /\w+\s*\*\s*\w+\s*=\s*(?:\([^)]*\)\s*)?malloc\s*\([^;]*\)/,
                            'std::vector< ' + elemType2 + ' > ' + mallocVar2 + '(' + count2 + ')'
                        );
                        vectorVars[mallocVar2] = true;
                    }
                    converted = true;
                } else {
                    // Pattern 3: T *var = [(T*)]malloc(sizeof(T)) — single node (linked list)
                    var m3 = cl.match(/(\w+)\s*\*\s*(\w+)\s*=\s*(?:\([^)]*\)\s*)?malloc\s*\(\s*sizeof\s*\(\s*(?:struct\s+)?(\w+)\s*\)\s*\)/);
                    if (m3) {
                        var mallocVar3 = m3[2], elemType3 = m3[3];
                        if (listVars[mallocVar3]) {
                            line = line.replace(
                                /\w+\s*\*\s*\w+\s*=\s*(?:\([^)]*\)\s*)?malloc\s*\([^;]*\)/,
                                'std::list< ' + elemType3 + ' > ' + mallocVar3
                            );
                            if (!hasH('list')) { headerLines.push('#include <list>'); headers['list'] = true; }
                        }
                        converted = true;
                    }
                }
            }
            if (converted && !hasH('vector') && !listVars[Object.keys(listVars).pop()]) {
                headerLines.push('#include <vector>');
                headers['vector'] = true;
            }
        }

        // ── new[] → vector ──
        if (/\bnew\b/.test(cl)) {
            var newArrM = cl.match(/(\w+)\s*\*\s*(\w+)\s*=\s*new\s+(\w+)\s*\[\s*(\w+)\s*\]/);
            if (newArrM) {
                line = line.replace(
                    /\w+\s*\*\s*\w+\s*=\s*new\s+\w+\s*\[[^\]]*\]/,
                    'std::vector< ' + newArrM[3] + ' > ' + newArrM[2] + '(' + newArrM[4] + ')'
                );
                vectorVars[newArrM[2]] = true;
                if (!hasH('vector')) { headerLines.push('#include <vector>'); headers['vector'] = true; }
            }
        }

        // ── struct cleanup: remove 'struct' keyword before type names (keep in definitions) ──
        line = line.replace(/\bstruct\s+(std::vector\b)/g, '$1');
        if (!/\bstruct\s+\w+\s*\{/.test(line)) {
            line = line.replace(/\bstruct\s+(\w+)/g, '$1');
        }

        // ── char name[N] → std::string name ──
        var charArrM = cl.match(/\bchar\s+(\w+)\s*\[\s*\d*\s*\]/);
        if (charArrM && !/\bchar\s+\w+\s*\[\s*\]\s*=/.test(cl)) {
            line = line.replace(/\bchar\s+(\w+)\s*\[\s*\d*\s*\]/, 'std::string $1');
            charArrayVars[charArrM[1]] = true;
            if (!hasH('string')) { headerLines.push('#include <string>'); headers['string'] = true; }
        }

        // ── static array → std::vector (int arr[SIZE] / int arr[5] / with initializer) ──
        if (/\b(?:int|float|double|long|short|unsigned|char|bool|size_t)\s+\w+\s*\[/.test(cl) &&
            !/\bchar\s+\w+\s*\[/.test(cl) && !/\bstd::string\b/.test(line)) {
            // With initializer: int arr[5] = {1,2,3} → std::vector<int> arr = {1,2,3}
            var saInitM = cl.match(/\b(int|float|double|long|short|unsigned|char|bool|size_t)\s+(\w+)\s*\[\s*\w*\s*\]\s*=\s*\{/);
            if (saInitM) {
                line = line.replace(
                    /\b(int|float|double|long|short|unsigned|char|bool|size_t)\s+\w+\s*\[\s*\w*\s*\]\s*=\s*\{/,
                    'std::vector< ' + saInitM[1] + ' > ' + saInitM[2] + ' = {'
                );
                vectorVars[saInitM[2]] = true;
                if (!hasH('vector')) { headerLines.push('#include <vector>'); headers['vector'] = true; }
            } else {
                // Without initializer: int arr[SIZE] → std::vector<int> arr(SIZE)
                var saM = cl.match(/\b(int|float|double|long|short|unsigned|char|bool|size_t)\s+(\w+)\s*\[\s*(\w+)\s*\]/);
                if (saM) {
                    line = line.replace(
                        /\b(int|float|double|long|short|unsigned|char|bool|size_t)\s+\w+\s*\[\s*\w+\s*\]/,
                        'std::vector< ' + saM[1] + ' > ' + saM[2] + '(' + saM[3] + ')'
                    );
                    vectorVars[saM[2]] = true;
                    if (!hasH('vector')) { headerLines.push('#include <vector>'); headers['vector'] = true; }
                }
            }
        }

        // ── strcpy(dest, src) → dest = src ──
        if (/\bstrcpy\s*\(/.test(cl)) {
            var strcpM = line.match(/\bstrcpy\s*\(\s*([\w.\[\]-]+)\s*,\s*("(?:[^"\\]|\\.)*"|\w+)\s*\)/);
            if (strcpM && isStringVar(strcpM[1])) {
                var scpIdx = line.search(/\bstrcpy\s*\(/);
                var scpOpen = line.indexOf('(', scpIdx);
                var scpClose = findClosingParen(line, scpOpen);
                if (scpClose !== -1) {
                    line = line.substring(0, scpIdx) + strcpM[1] + ' = ' + strcpM[2] + line.substring(scpClose + 1);
                }
            }
        }

        // ── strcat(dest, src) → dest += src ──
        if (/\bstrcat\s*\(/.test(cl)) {
            var strcaM = line.match(/\bstrcat\s*\(\s*([\w.\[\]-]+)\s*,\s*("(?:[^"\\]|\\.)*"|\w+)\s*\)/);
            if (strcaM && isStringVar(strcaM[1])) {
                var scaIdx = line.search(/\bstrcat\s*\(/);
                var scaOpen = line.indexOf('(', scaIdx);
                var scaClose = findClosingParen(line, scaOpen);
                if (scaClose !== -1) {
                    line = line.substring(0, scaIdx) + strcaM[1] + ' += ' + strcaM[2] + line.substring(scaClose + 1);
                }
            }
        }

        // ── strlen(var) → var.size() ──
        if (/\bstrlen\s*\(/.test(cl)) {
            var strlM = line.match(/\bstrlen\s*\(\s*([\w.\[\]-]+)\s*\)/);
            if (strlM && isStringVar(strlM[1])) {
                var slIdx = line.search(/\bstrlen\s*\(/);
                var slOpen = line.indexOf('(', slIdx);
                var slClose = findClosingParen(line, slOpen);
                if (slClose !== -1) {
                    line = line.substring(0, slIdx) + strlM[1] + '.size()' + line.substring(slClose + 1);
                }
            }
        }

        // ── strcmp(a, b) == 0 → a == b; strcmp(a, b) != 0 → a != b; strcmp(a, b) → a.compare(b) ──
        if (/\bstrcmp\s*\(/.test(cl)) {
            var strcmM = line.match(/\bstrcmp\s*\(\s*([\w.\[\]-]+)\s*,\s*("(?:[^"\\]|\\.)*"|\w+)\s*\)/);
            if (strcmM && isStringVar(strcmM[1])) {
                var scIdx = line.search(/\bstrcmp\s*\(/);
                var scOpen = line.indexOf('(', scIdx);
                var scClose = findClosingParen(line, scOpen);
                if (scClose !== -1) {
                    var afterParen = line.substring(scClose + 1);
                    var repl;
                    if (/^\s*==\s*0/.test(afterParen)) {
                        repl = strcmM[1] + ' == ' + strcmM[2];
                        line = line.substring(0, scIdx) + repl + afterParen.replace(/^\s*==\s*0/, '');
                    } else if (/^\s*!=\s*0/.test(afterParen)) {
                        repl = strcmM[1] + ' != ' + strcmM[2];
                        line = line.substring(0, scIdx) + repl + afterParen.replace(/^\s*!=\s*0/, '');
                    } else {
                        repl = strcmM[1] + '.compare(' + strcmM[2] + ')';
                        line = line.substring(0, scIdx) + repl + afterParen;
                    }
                }
            }
        }

        // ── sprintf(dest, fmt, ...) → dest = std::to_string(...) or std::ostringstream ──
        if (/\bsprintf\s*\(/.test(cl)) {
            var spIdx = line.search(/\bsprintf\s*\(/);
            var spOpen = line.indexOf('(', spIdx);
            var spClose = findClosingParen(line, spOpen);
            if (spClose !== -1) {
                var inner = line.substring(spOpen + 1, spClose);
                var spArgs = splitArgs(inner);
                if (spArgs.length >= 2) {
                    var dest = spArgs[0].trim();
                    var rawFmt = spArgs[1].trim();
                    if (isStringVar(dest) && /^"/.test(rawFmt)) {
                        var fmtStr = rawFmt.replace(/^"|"$/g, '').replace(/\\"/g, '"');
                        var extraArgs = spArgs.slice(2);
                        var fmtSpecs = fmtStr.match(/%(-?\d*\.?\d*[duxosfcsp]|%)/g) || [];
                        // For simple %s/%d only: use std::to_string concatenation
                        var simpleSpecs = true;
                        var varIdx = 0;
                        var toParts = [];
                        var plainStart = 0;
                        for (var fi = 0; fi < fmtStr.length; fi++) {
                            if (fmtStr[fi] === '%' && fi + 1 < fmtStr.length) {
                                if (fmtStr[fi+1] === '%') {
                                    if (fi > plainStart) toParts.push('"' + fmtStr.substring(plainStart, fi) + '%"');
                                    fi++; plainStart = fi + 1; continue;
                                }
                                if (fi > plainStart) toParts.push('"' + fmtStr.substring(plainStart, fi) + '"');
                                var specEnd = fi + 1;
                                while (specEnd < fmtStr.length && /[-\d.]/.test(fmtStr[specEnd])) specEnd++;
                                var specChar = fmtStr[specEnd];
                                if (specChar === 's' || specChar === 'd' || specChar === 'i' ||
                                    specChar === 'u' || specChar === 'x' || specChar === 'o') {
                                    var arg = varIdx < extraArgs.length ? extraArgs[varIdx] : '?';
                                    if (specChar === 's') {
                                        toParts.push(arg);
                                    } else {
                                        toParts.push('std::to_string(' + arg + ')');
                                    }
                                    varIdx++;
                                } else {
                                    simpleSpecs = false; break;
                                }
                                fi = specEnd; plainStart = fi + 1;
                            }
                        }
                        if (simpleSpecs && toParts.length > 0) {
                            if (plainStart < fmtStr.length) toParts.push('"' + fmtStr.substring(plainStart) + '"');
                            line = line.substring(0, spIdx) + dest + ' = ' + toParts.join(' + ') + line.substring(spClose + 1);
                        } else {
                            // Fallback: std::ostringstream
                            if (!hasH('sstream')) { headerLines.push('#include <sstream>'); headers['sstream'] = true; }
                            var ossParts = [];
                            varIdx = 0;
                            for (var fi2 = 0; fi2 < fmtStr.length; fi2++) {
                                if (fmtStr[fi2] === '%' && fi2 + 1 < fmtStr.length) {
                                    if (fmtStr[fi2+1] === '%') { ossParts.push('"%"'); fi2++; continue; }
                                    var specEnd2 = fi2 + 1;
                                    while (specEnd2 < fmtStr.length && /[-\d.]/.test(fmtStr[specEnd2])) specEnd2++;
                                    if (varIdx < extraArgs.length) {
                                        var spec = fmtStr.substring(fi2, specEnd2 + 1);
                                        if (/^%\.\d+f$/.test(spec)) {
                                            var prec = spec.match(/\.(\d+)/)[1];
                                            ossParts.push('std::fixed << std::setprecision(' + prec + ') << ' + extraArgs[varIdx]);
                                        } else {
                                            ossParts.push(extraArgs[varIdx]);
                                        }
                                        varIdx++;
                                    }
                                    fi2 = specEnd2;
                                } else {
                                    var plainStart2 = fi2;
                                    while (fi2 < fmtStr.length && fmtStr[fi2] !== '%') fi2++;
                                    ossParts.push('"' + fmtStr.substring(plainStart2, fi2) + '"');
                                    fi2--;
                                }
                            }
                            if (!hasH('iomanip')) { headerLines.push('#include <iomanip>'); headers['iomanip'] = true; }
                            line = line.substring(0, spIdx) + '{ std::ostringstream _oss; _oss << ' + ossParts.join(' << ') + '; ' + dest + ' = _oss.str(); }' + line.substring(spClose + 1);
                        }
                    }
                }
            }
        }

        // ── free(ptr) → remove (STL container manages memory) ──
        if (/\bfree\s*\(/.test(cl)) {
            var fm = cl.match(/\bfree\s*\(\s*(\w+)\s*\)/);
            if (fm && (vectorVars[fm[1]] || listVars[fm[1]])) {
                skipLine = true;
            }
        }

        // ── delete ptr / delete[] ptr → remove for STL container vars ──
        if (/\bdelete\s*\[\]\s*/.test(cl)) {
            var dm = cl.match(/\bdelete\s*\[\]\s*(\w+)/);
            if (dm && (vectorVars[dm[1]] || listVars[dm[1]])) skipLine = true;
        } else if (/\bdelete\b/.test(cl)) {
            var dm2 = cl.match(/\bdelete\s+(\w+)/);
            if (dm2 && (vectorVars[dm2[1]] || listVars[dm2[1]])) skipLine = true;
        }

        // ── int main() fix ──
        line = line.replace(/^(\s*)main\s*\(/, '$1int main(');

        // ── C-style cast removal ──
        line = line.replace(/\(\s*(?:int|float|double|char|long|short|unsigned|void)\s*\*\s*\)\s*(malloc|calloc|realloc)/g, '$1');

        // ── NULL → nullptr ──
        line = line.replace(/\bNULL\b/g, 'nullptr');

        // ── printf → cout ──
        if (/\bprintf\s*\(/.test(line)) {
            // Multi-line: join continuation lines if parentheses unbalanced
            var joined = joinContinuation(rest, j);
            if (joined.extraLines > 0) { line = joined.line; skipCount = joined.extraLines; }
            var pm = line.match(/\bprintf\s*\(\s*"([^"]*(?:\\.[^"]*)*)"\s*(?:,\s*(.*))?\s*\)/);
            if (pm) {
                var rawFmt = pm[1].replace(/\\"/g, '"');
                var hasNewline = /\\n|\n/.test(rawFmt);
                var fmt = rawFmt.replace(/\\n|\n/g, '');
                var args = pm[2] ? splitArgs(pm[2]) : [];
                // Special case: printf("\n") → std::cout << std::endl
                if (fmt === '' && args.length === 0 && hasNewline) {
                    var pIdx = line.search(/\bprintf\s*\(/);
                    var pOpen = line.indexOf('(', pIdx);
                    var pClose = findClosingParen(line, pOpen);
                    if (pClose !== -1) {
                        line = line.substring(0, pIdx) + 'std::cout << std::endl' + line.substring(pClose + 1);
                    }
                } else {
                    var coutParts = parsePrintfFormat(fmt, args);
                    if (coutParts.length > 0) {
                        if (hasNewline) coutParts.push('std::endl');
                        var pIdx = line.search(/\bprintf\s*\(/);
                        var pOpen = line.indexOf('(', pIdx);
                        var pClose = findClosingParen(line, pOpen);
                        if (pClose !== -1) {
                            line = line.substring(0, pIdx) + 'std::cout << ' + coutParts.join(' << ') + line.substring(pClose + 1);
                        }
                    }
                }
            }
        }

        // ── fprintf(stderr, ...) → cerr ──
        if (/\bfprintf\s*\(\s*stderr/.test(line)) {
            var joined2 = joinContinuation(rest, j);
            if (joined2.extraLines > 0) { line = joined2.line; skipCount = joined2.extraLines; }
            var fm2 = line.match(/\bfprintf\s*\(\s*stderr\s*,\s*"([^"]*(?:\\.[^"]*)*)"\s*(?:,\s*(.*))?\s*\)/);
            if (fm2) {
                var rawFmt2 = fm2[1].replace(/\\"/g, '"');
                var hasNewline2 = /\\n|\n/.test(rawFmt2);
                var fmt2 = rawFmt2.replace(/\\n|\n/g, '');
                var args2 = fm2[2] ? splitArgs(fm2[2]) : [];
                var cerrParts = parsePrintfFormat(fmt2, args2);
                if (cerrParts.length > 0) {
                    if (hasNewline2) cerrParts.push('std::endl');
                    var fIdx = line.search(/\bfprintf\s*\(/);
                    var fOpen = line.indexOf('(', fIdx);
                    var fClose = findClosingParen(line, fOpen);
                    if (fClose !== -1) {
                        line = line.substring(0, fIdx) + 'std::cerr << ' + cerrParts.join(' << ') + line.substring(fClose + 1);
                    }
                }
            }
        }

        // ── scanf → cin ──
        if (/\bscanf\s*\(/.test(line)) {
            var sm = line.match(/\bscanf\s*\(\s*"([^"]*(?:\\.[^"]*)*)"\s*,\s*(.+)\s*\)/);
            if (sm) {
                var sargs = splitArgs(sm[2]);
                var cinParts = [];
                for (var si = 0; si < sargs.length; si++) {
                    var arg = sargs[si].replace(/^\s*&\s*/, '');
                    cinParts.push(arg);
                }
                if (cinParts.length > 0) {
                    var sIdx = line.search(/\bscanf\s*\(/);
                    var sOpen = line.indexOf('(', sIdx);
                    var sClose = findClosingParen(line, sOpen);
                    if (sClose !== -1) {
                        line = line.substring(0, sIdx) + 'std::cin >> ' + cinParts.join(' >> ') + line.substring(sClose + 1);
                    }
                }
            }
        }

        // ── puts → cout ──
        if (/\bputs\s*\(/.test(line)) {
            var putsM = line.match(/\bputs\s*\(\s*("(?:[^"\\]|\\.)*"|\w+)\s*\)/);
            if (putsM) {
                line = line.replace(
                    /\bputs\s*\(\s*(?:"(?:[^"\\]|\\.)*"|\w+)\s*\)/,
                    'std::cout << ' + putsM[1] + ' << std::endl'
                );
            }
        }

        // ── 所有变换完成，重新派生 cl 用于空指针块检测 ──
        cl = stripComments(line);

        // ── if (ptr == nullptr) → if (vec.empty()) / if (!vec.empty()) ──
        if (/^\s*if\s*\(\s*\w+\s*==\s*nullptr\s*\)/.test(cl)) {
            var npeM = cl.match(/if\s*\(\s*(\w+)\s*==\s*nullptr\s*\)/);
            if (npeM && (vectorVars[npeM[1]] || listVars[npeM[1]])) {
                line = line.replace(/if\s*\(\s*\w+\s*==\s*nullptr\s*\)/, 'if (' + npeM[1] + '.empty())');
            }
        }
        if (/^\s*if\s*\(\s*\w+\s*!=\s*nullptr\s*\)/.test(cl)) {
            var npeM2 = cl.match(/if\s*\(\s*(\w+)\s*!=\s*nullptr\s*\)/);
            if (npeM2 && (vectorVars[npeM2[1]] || listVars[npeM2[1]])) {
                line = line.replace(/if\s*\(\s*\w+\s*!=\s*nullptr\s*\)/, 'if (!' + npeM2[1] + '.empty())');
            }
        }

        // ── if (ptr == 0) → if (vec.empty()) / if (ptr == nullptr) ──
        if (/^\s*if\s*\(\s*\w+\s*==\s*0\s*\)/.test(cl)) {
            var zeroM = cl.match(/if\s*\(\s*(\w+)\s*==\s*0\s*\)/);
            if (zeroM && (vectorVars[zeroM[1]] || listVars[zeroM[1]])) {
                line = line.replace(/if\s*\(\s*\w+\s*==\s*0\s*\)/, 'if (' + zeroM[1] + '.empty())');
            } else if (zeroM && pointerVars[zeroM[1]]) {
                line = line.replace(/if\s*\(\s*\w+\s*==\s*0\s*\)/, 'if (' + zeroM[1] + ' == nullptr)');
            }
        }
        if (/^\s*if\s*\(\s*\w+\s*!=\s*0\s*\)/.test(cl)) {
            var zeroM2 = cl.match(/if\s*\(\s*(\w+)\s*!=\s*0\s*\)/);
            if (zeroM2 && (vectorVars[zeroM2[1]] || listVars[zeroM2[1]])) {
                line = line.replace(/if\s*\(\s*\w+\s*!=\s*0\s*\)/, 'if (!' + zeroM2[1] + '.empty())');
            } else if (zeroM2 && pointerVars[zeroM2[1]]) {
                line = line.replace(/if\s*\(\s*\w+\s*!=\s*0\s*\)/, 'if (' + zeroM2[1] + ' != nullptr)');
            }
        }

        // ── if (!ptr) → if (vec.empty()) / if (ptr == nullptr) ──
        if (/^\s*if\s*\(\s*!\s*\w+\s*\)/.test(cl)) {
            var negM = cl.match(/if\s*\(\s*!\s*(\w+)\s*\)/);
            if (negM && (vectorVars[negM[1]] || listVars[negM[1]])) {
                line = line.replace(/if\s*\(\s*!\s*\w+\s*\)/, 'if (' + negM[1] + '.empty())');
            } else if (negM && pointerVars[negM[1]]) {
                line = line.replace(/if\s*\(\s*!\s*\w+\s*\)/, 'if (' + negM[1] + ' == nullptr)');
            }
        }

        // ── if (ptr) → if (!vec.empty()) / if (ptr != nullptr) ──
        if (/^\s*if\s*\(\s*\w+\s*\)\s*$/.test(cl)) {
            var truthM = cl.match(/if\s*\(\s*(\w+)\s*\)/);
            if (truthM && (vectorVars[truthM[1]] || listVars[truthM[1]])) {
                line = line.replace(/if\s*\(\s*\w+\s*\)/, 'if (!' + truthM[1] + '.empty())');
            } else if (truthM && pointerVars[truthM[1]]) {
                line = line.replace(/if\s*\(\s*\w+\s*\)/, 'if (' + truthM[1] + ' != nullptr)');
            }
        }

        // ── container[idx++] = val → container.push_back(val) ──
        if (!skipLine) {
            var pbM = cl.match(/^(\s*)(\w+)\s*\[\s*(\w+)\s*\+\+\s*\]\s*=\s*(.+?)\s*;\s*$/);
            if (pbM && (vectorVars[pbM[2]] || listVars[pbM[2]])) {
                line = pbM[1] + pbM[2] + '.push_back(' + pbM[4] + ');';
            }
        }

        // ── Linked list: [Type *]head = NULL/nullptr → std::list<T> head; ──
        if (!skipLine && /^\s*(?:(?:struct\s+)?\w+\s*\*\s*)?(\w+)\s*=\s*(?:NULL|nullptr)\s*;?\s*$/.test(cl)) {
            var llNullM = cl.match(/^(\s*)(?:(?:struct\s+)?\w+\s*\*\s*)?(\w+)\s*=\s*(?:NULL|nullptr)\s*;?\s*$/);
            if (llNullM && listVars[llNullM[2]]) {
                // Find element type: struct name for ≥2 fields, basic type for 1 field
                var nullVar = llNullM[2];
                var nullStructName = getListStructName(nullVar);
                var nullElemType;
                if (nullStructName && !hasSingleDataField(nullStructName)) {
                    nullElemType = nullStructName; // std::list<Node>
                } else {
                    nullElemType = 'int';
                    for (var nlk in nodeToList) {
                        if (nodeToList[nlk] === nullVar) {
                            for (var sn in linkedListElemType) {
                                nullElemType = linkedListElemType[sn];
                                break;
                            }
                            break;
                        }
                    }
                }
                line = llNullM[1] + 'std::list< ' + nullElemType + ' > ' + nullVar + ';';
                declaredListVars[nullVar] = true;
                if (!hasH('list')) { headerLines.push('#include <list>'); headers['list'] = true; }
            }
        }

        // ── Linked list: node->data = val → push_back to list ──
        if (!skipLine) {
            var llDataM = cl.match(/^(\s*)(\w+)\s*->\s*(\w+)\s*=\s*(.+?)\s*;?\s*$/);
            if (llDataM) {
                var dNodeVar = llDataM[2], dField = llDataM[3];
                if (pendingListPushBack[dNodeVar]) {
                    // Find the list this node belongs to
                    var targetList = nodeToList[dNodeVar] || null;
                    if (!targetList) {
                        for (var lv in listVars) {
                            if (lv !== dNodeVar) { targetList = lv; break; }
                        }
                    }
                    if (targetList) {
                        line = llDataM[1] + targetList + '.push_back(' + llDataM[4] + ');';
                        delete pendingListPushBack[dNodeVar];
                        pushedToList[dNodeVar] = true;
                    }
                }
            }
        }

        // ── Linked list: head = newNode → push_front (head-insertion) ──
        if (!skipLine) {
            var llHeadAssignM = cl.match(/^(\s*)(\w+)\s*=\s*(\w+)\s*;?\s*$/);
            if (llHeadAssignM && listVars[llHeadAssignM[2]] && !listVars[llHeadAssignM[3]]) {
                if (pendingListPushBack[llHeadAssignM[3]] || pushedToList[llHeadAssignM[3]]) {
                    // newNode has pending/completed data push → skip (data already in list)
                    skipLine = true;
                } else {
                    // head = newNode where head is a list, newNode is not → push_front
                    line = llHeadAssignM[1] + llHeadAssignM[2] + '.push_front(*' + llHeadAssignM[3] + ');';
                }
            }
        }

        // ── Linked list: two-line pattern: node->next = head; head = node → push_front ──
        if (!skipLine && j + 1 < rest.length) {
            var nextLine = rest[j + 1], nextCl = stripComments(nextLine);
            var llTwoM1 = cl.match(/^(\s*)(\w+)\s*->\s*next\s*=\s*(\w+)\s*;?\s*$/);
            var llTwoM2 = nextCl.match(/^(\s*)(\w+)\s*=\s*(\w+)\s*;?\s*$/);
            if (llTwoM1 && llTwoM2 && llTwoM1[2] === llTwoM2[3] && listVars[llTwoM2[2]]) {
                if (pendingListPushBack[llTwoM1[2]] || pushedToList[llTwoM1[2]]) {
                    // node has pending/completed data push → skip both lines
                    skipLine = true;
                    skipCount = 1;
                } else {
                    line = llTwoM1[1] + llTwoM2[2] + '.push_front(*' + llTwoM1[2] + ');';
                    skipCount = 1;
                }
            }
        }

        // ── Linked list: tail->next = newNode; tail = newNode → push_back ──
        if (!skipLine && j + 1 < rest.length) {
            var nextLine2 = rest[j + 1], nextCl2 = stripComments(nextLine2);
            var llTailM1 = cl.match(/^(\s*)(\w+)\s*->\s*next\s*=\s*(\w+)\s*;?\s*$/);
            var llTailM2 = nextCl2.match(/^(\s*)(\w+)\s*=\s*(\w+)\s*;?\s*$/);
            if (llTailM1 && llTailM2 && llTailM1[3] === llTailM2[3] && listNodeVars[llTailM2[2]]) {
                // tail->next = newNode; tail = newNode; (tail is a node pointer)
                line = llTailM1[1] + llTailM2[2] + '.push_back(*' + llTailM1[3] + ');';
                skipCount = 1;
            }
        }

        // ── Linked list: free(node) where node is a node pointer → remove ──
        if (!skipLine && /\bfree\s*\(/.test(cl)) {
            var llFreeM = cl.match(/\bfree\s*\(\s*(\w+)\s*\)/);
            if (llFreeM && listNodeVars[llFreeM[1]]) {
                skipLine = true;
            }
        }

        // ── Linked list: remove standalone node = NULL/nullptr; after conversion ──
        if (!skipLine && /^\s*\w+\s*=\s*(?:NULL|nullptr)\s*;?\s*$/.test(cl)) {
            var llNodeNullM = cl.match(/^(\w+)\s*=\s*(?:NULL|nullptr)\s*;?\s*$/);
            if (llNodeNullM && (listNodeVars[llNodeNullM[1]] || pendingListPushBack[llNodeNullM[1]])) {
                skipLine = true;
            }
        }

        if (!skipLine) bodyLines.push(line);
    }

    // ── Post-loop: two-line push_back pattern (container[idx] = val; idx++;) ──
    for (var pi = 0; pi < bodyLines.length - 1; pi++) {
        var pLine = bodyLines[pi], pNext = bodyLines[pi + 1];
        var pCl = stripComments(pLine), pNextCl = stripComments(pNext);
        // Current: container[idx] = val;
        var twoM = pCl.match(/^(\s*)(\w+)\s*\[\s*(\w+)\s*\]\s*=\s*(.+?)\s*;\s*$/);
        // Next: idx++; or ++idx;
        var twoNextM = pNextCl.match(/^\s*(?:(\w+)\s*\+\+|\+\+\s*(\w+))\s*;\s*$/);
        if (twoM && twoNextM) {
            var idxName = twoM[3];
            var nextIdx = twoNextM[1] || twoNextM[2];
            if (idxName === nextIdx && (vectorVars[twoM[2]] || listVars[twoM[2]])) {
                bodyLines[pi] = twoM[1] + twoM[2] + '.push_back(' + twoM[4] + ');';
                bodyLines.splice(pi + 1, 1); // remove the idx++ line
            }
        }
    }

    result = result.concat(bodyLines);

    // ── 全局强制扫描：不允许任何 strxxx 函数残留在 std::string 变量上 ──
    for (var gi = 0; gi < bodyLines.length; gi++) {
        var gl = bodyLines[gi], gcl = stripComments(gl);
        // Check each strxxx call's first argument
        var strFuncs = ['strcpy', 'strcat', 'strlen', 'strcmp', 'sprintf'];
        for (var sf = 0; sf < strFuncs.length; sf++) {
            var fn = strFuncs[sf];
            var fnRe = new RegExp('\\b' + fn + '\\s*\\(');
            if (fnRe.test(gcl)) {
                var gIdx = gl.search(fnRe);
                var gOpen = gl.indexOf('(', gIdx);
                var gClose = findClosingParen(gl, gOpen);
                if (gClose !== -1) {
                    var gInner = gl.substring(gOpen + 1, gClose);
                    var gArgs = splitArgs(gInner);
                    if (gArgs.length >= 1) {
                        var gDest = gArgs[0].trim();
                        if (isStringVar(gDest)) {
                            // Remove the entire strxxx call
                            if (fn === 'sprintf') {
                                bodyLines[gi] = gl.substring(0, gIdx) + gDest + ' = /* TODO: convert sprintf */' + gl.substring(gClose + 1);
                            }
                            // strcpy/strcat/strlen/strcmp should already be converted above
                        }
                    }
                }
            }
        }
    }

    // ── 如果 sprintf 未被转换，保留 <cstdio> 头文件 ──
    if (/\bsprintf\b/.test(bodyLines.join('\n'))) {
        if (!hasH('cstdio')) { headerLines.push('#include <cstdio>'); headers['cstdio'] = true; }
    }

    // ── 后处理：模板尖括号加空格防浏览器 HTML 标签吞噬 ──
    var out = result.join('\n').split('\n');
    var safe = [];
    for (var fi = 0; fi < out.length; fi++) {
        var fl = out[fi];
        // 循环替换直到稳定，正确处理 vector<vector<int>> 嵌套模板
        // 使用 \w+ 匹配单词字符（不含空格/<>），确保每轮减少一层嵌套且不会因空格累积而死循环
        var prev;
        do {
            prev = fl;
            fl = fl.replace(/\b(vector|array|map|set|pair|tuple|unique_ptr|shared_ptr|weak_ptr)<(\w+)>/g,
                '$1< $2 >');
        } while (fl !== prev);
        safe.push(fl);
    }

    // ── 后处理：链表结构体删除 + while 遍历 → range-for ──
    // First, update template spacing to include list
    for (var fi_ll = 0; fi_ll < safe.length; fi_ll++) {
        var fl_ll = safe[fi_ll];
        var prev_ll;
        do {
            prev_ll = fl_ll;
            fl_ll = fl_ll.replace(/\b(vector|list|array|map|set|pair|tuple|unique_ptr|shared_ptr|weak_ptr)<(\w+)>/g,
                '$1< $2 >');
        } while (fl_ll !== prev_ll);
        safe[fi_ll] = fl_ll;
    }

    // Remove dead temporary pointer declarations (auto _tmp = ...; var = &_tmp;)
    var cleanedSafe = [];
    for (var csi = 0; csi < safe.length; csi++) {
        var cscl = stripComments(safe[csi]);
        // Match: auto _tmp = type{}; var = &_tmp;
        var tmpM = cscl.match(/auto\s+_tmp\s*=\s*.+?;\s*(\w+)\s*=\s*&_tmp\s*;?\s*$/);
        if (tmpM && (pushedToList[tmpM[1]] || pendingListPushBack[tmpM[1]])) {
            continue; // remove entire line
        }
        // Match standalone: var = &_tmp;
        var tmpM2 = cscl.match(/^\s*(\w+)\s*=\s*&_tmp\s*;?\s*$/);
        if (tmpM2 && (pushedToList[tmpM2[1]] || pendingListPushBack[tmpM2[1]])) {
            continue;
        }
        cleanedSafe.push(safe[csi]);
    }
    safe = cleanedSafe;

    // Build list of struct Node line ranges to remove
    // Only remove structs when: (1) listVars has entries, AND (2) struct has exactly 1 data field
    // ≥2 data fields → keep struct, use std::list<StructType>
    var structRemoveRanges = [];
    var hasListConversion = Object.keys(listVars).length > 0;
    for (var sri = 0; sri < safe.length; sri++) {
        var srcl = stripComments(safe[sri]);
        var srM = srcl.match(/\bstruct\s+(\w+)\s*\{/);
        var srName = srM ? srM[1] : '';
        var srDataFields = linkedListDataFields[srName] || [];
        if (srM && linkedListStructs[srName] && hasListConversion && srDataFields.length <= 1) {
            var srDepth = 0, srEnd = sri;
            for (var srj = sri; srj < safe.length; srj++) {
                var srjcl = stripComments(safe[srj]);
                srDepth += (srjcl.match(/\{/g) || []).length;
                srDepth -= (srjcl.match(/\}/g) || []).length;
                if (srDepth <= 0) { srEnd = srj; break; }
            }
            structRemoveRanges.push({ start: sri, end: srEnd });
            sri = srEnd;
        }
    }

    // Detect node pointers for while-to-for conversion
    var listPtrToList = {};
    for (var lvi in listNodeVars) {
        listPtrToList[lvi] = listNodeVars[lvi];
    }

    // Convert while(curr != NULL) to range-for
    var llResult = [];
    for (var lli = 0; lli < safe.length; lli++) {
        // Skip struct definitions
        var inRemovedStruct = false;
        for (var sri2 = 0; sri2 < structRemoveRanges.length; sri2++) {
            if (lli >= structRemoveRanges[sri2].start && lli <= structRemoveRanges[sri2].end) {
                inRemovedStruct = true;
                break;
            }
        }
        if (inRemovedStruct) continue;

        var ll = safe[lli];
        var llcl = stripComments(ll);

        // Detect: nodePtr = listHead; or Type *nodePtr = listHead; (will be removed if followed by while loop)
        var ptrAsgnM = llcl.match(/^(\s*)(?:(?:struct\s+)?\w+\s*\*\s*)?(\w+)\s*=\s*(\w+)\s*;$/);
        if (ptrAsgnM && listVars[ptrAsgnM[3]] && listPtrToList[ptrAsgnM[2]] &&
            lli + 1 < safe.length) {
            var nextLl = safe[lli + 1];
            var nextLlcl = stripComments(nextLl);
            var whileM = nextLlcl.match(/^(\s*)while\s*\(\s*(\w+)\s*!=\s*(?:NULL|nullptr|0)\s*\)\s*\{?\s*$/);
            if (whileM && whileM[2] === ptrAsgnM[2]) {
                var whileIndent = whileM[1];
                var loopVar = whileM[2];
                var listName = listPtrToList[loopVar];

                // Find while block end
                var wDepth = 0, wEnd = lli + 1;
                for (var wk = lli + 1; wk < safe.length; wk++) {
                    var wkcl = stripComments(safe[wk]);
                    wDepth += (wkcl.match(/\{/g) || []).length;
                    wDepth -= (wkcl.match(/\}/g) || []).length;
                    if (wDepth <= 0 && wk > lli + 1) { wEnd = wk; break; }
                }

                // Extract body
                var wBodyStart = lli + 2;
                var hasWhileBrace = /\{/.test(nextLlcl);
                if (!hasWhileBrace) wBodyStart = lli + 2;
                var wBodyLines = safe.slice(wBodyStart, wEnd);

                // Check if this is a "free all nodes" loop — remove entirely (including preceding assignment + comment)
                var wBodyText = wBodyLines.join('\n');
                if (/\bfree\s*\(/.test(wBodyText) && /->\s*next/.test(wBodyText)) {
                    // Remove preceding "curr = head;" line and any comment/blank lines before it
                    while (llResult.length > 0) {
                        var prevLine = stripComments(llResult[llResult.length - 1]);
                        if (prevLine.trim() === '' || /^\s*\/\//.test(prevLine.trim())) {
                            llResult.pop();
                            continue;
                        }
                        var prevPtrM = prevLine.match(/^\s*(?:(?:struct\s+)?\w+\s*\*\s*)?(\w+)\s*=\s*(\w+)\s*;$/);
                        if (prevPtrM && prevPtrM[2] === listName) {
                            llResult.pop();
                        }
                        break;
                    }
                    lli = wEnd;
                    continue;
                }

                // Find the data field to replace ptr->field
                var elemField = 'data';
                var srDataFields = [];
                for (var sri3 = 0; sri3 < structRemoveRanges.length; sri3++) {
                    var structStart = structRemoveRanges[sri3].start;
                    var structCl = stripComments(safe[structStart]);
                    var sNameM = structCl.match(/struct\s+(\w+)\s*\{/);
                    if (sNameM && linkedListDataFields[sNameM[1]]) {
                        elemField = linkedListDataFields[sNameM[1]][0].name;
                        srDataFields = linkedListDataFields[sNameM[1]];
                        break;
                    }
                }
                // Also check structs that are NOT in structRemoveRanges (≥2 fields, kept)
                if (srDataFields.length === 0) {
                    for (var sn in linkedListDataFields) {
                        if (linkedListDataFields[sn].length > 0) {
                            elemField = linkedListDataFields[sn][0].name;
                            srDataFields = linkedListDataFields[sn];
                            break;
                        }
                    }
                }

                var refName = listName.replace(/s$/, '') || 'elem';
                if (refName === listName || refName === loopVar) refName = listName + '_item';

                // Build range-for
                llResult.push(whileIndent + 'for (const auto& ' + refName + ' : ' + listName + ') {');
                for (var wb = 0; wb < wBodyLines.length; wb++) {
                    var wbl = wBodyLines[wb];
                    var wbcl = stripComments(wbl);
                    var escLoopVar = loopVar.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                    // Skip curr = curr->next
                    var nextPtrRe = new RegExp('^\\s*' + escLoopVar + '\\s*=\\s*' + escLoopVar + '\\s*->\\s*next\\s*;?\\s*$');
                    if (nextPtrRe.test(wbcl)) continue;
                    var nextPtrRe2 = new RegExp('^\\s*' + escLoopVar + '\\s*=\\s*\\(\\*' + escLoopVar + '\\)\\s*\\.\\s*next\\s*;?\\s*$');
                    if (nextPtrRe2.test(wbcl)) continue;
                    // Replace curr->field references
                    if (srDataFields.length <= 1) {
                        // 1 data field: curr->data → refName
                        var ptrAccessRe = new RegExp('\\b' + escLoopVar + '\\s*->\\s*' + elemField + '\\b', 'g');
                        wbl = wbl.replace(ptrAccessRe, refName);
                    } else {
                        // ≥2 data fields: curr->field → refName.field (skip ->next)
                        var allFieldsRe = new RegExp('\\b' + escLoopVar + '\\s*->\\s*(\\w+)\\b', 'g');
                        wbl = wbl.replace(allFieldsRe, function(m, field) {
                            if (field === 'next' || field === 'prev') return m; // keep next/prev references
                            return refName + '.' + field;
                        });
                    }
                    llResult.push(wbl);
                }
                if (wEnd < safe.length && /\}/.test(stripComments(safe[wEnd]))) {
                    llResult.push(safe[wEnd]);
                } else {
                    llResult.push(whileIndent + '}');
                }
                lli = wEnd;
                continue;
            }
        }

        llResult.push(ll);
    }

    // ── 后处理：for 循环 → 范围 for ──
    var rangeResult = [];
    for (var ri = 0; ri < llResult.length; ri++) {
        var rl = llResult[ri];
        // Match both multi-line: "for (...) {" and single-line: "for (...) { body; }"
        var forM = rl.match(/^(\s*)for\s*\(\s*(?:int|size_t|unsigned|unsigned\s+int|long|long\s+long|auto|char|int\d+_t|uint\d+_t)\s+(\w+)\s*=\s*([^;]+?)\s*;\s*\2\s*(?:<|<=)\s*([^;]+?)\s*(?:\.size\(\))?\s*;\s*(?:\2\s*\+\+|\+\+\s*\2)\s*\)\s*\{?\s*(.*?)\s*$/);
        if (forM) {
            var indent = forM[1];
            var idxVar = forM[2];
            var startVal = forM[3];
            var limit = forM[4].trim();
            var inlineBody = forM[5] || '';
            var hasDotSize = /\.size\(\)/.test(rl);
            var useLE = /\s*<=\s*/.test(rl);
            // Non-zero start loops cannot be directly converted to range-for
            if (startVal !== '0') { rangeResult.push(rl); continue; }
            // <= with constant limit is unsafe for range-for (off-by-one), skip
            if (useLE && !hasDotSize) { rangeResult.push(rl); continue; }
            var container = hasDotSize ? limit : null;
            if (!container) {
                for (var vc in vectorVars) {
                    if (vc === limit) { container = vc; break; }
                }
            }
            // Find the for block (handle both single-line and multi-line)
            var blockStart, blockEnd, bodyText;
            var isSingleLine = /\{.*\}/.test(rl) && inlineBody;
            if (isSingleLine) {
                // Single-line for: body is inline
                blockStart = ri;
                blockEnd = ri;
                bodyText = inlineBody;
            } else {
                // Multi-line for: find matching closing brace
                blockStart = ri + 1;
                blockEnd = -1;
                var depth = 0;
                for (var bi = ri; bi < llResult.length; bi++) {
                    var bline = stripComments(llResult[bi]);
                    depth += (bline.match(/\{/g) || []).length;
                    depth -= (bline.match(/\}/g) || []).length;
                    if (depth <= 0 && bi > ri) { blockEnd = bi; break; }
                }
                if (blockEnd === -1) blockEnd = ri;
                bodyText = llResult.slice(blockStart, blockEnd).join('\n');
            }
            // Find ALL containers indexed with idxVar in the body
            var allContainers = {};
            var containerRe = new RegExp('\\b(\\w+)\\s*\\[\\s*' + idxVar.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*\\]', 'g');
            var cm;
            while ((cm = containerRe.exec(bodyText)) !== null) {
                allContainers[cm[1]] = true;
            }
            var containerNames = Object.keys(allContainers);
            if (!container && containerNames.length === 1) {
                container = containerNames[0];
            }
            // Only convert if exactly ONE container is indexed with idxVar
            if (container && containerNames.length === 1 && containerNames[0] === container) {
                var escContainer = container.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                var idxAccessRe = new RegExp('\\b\\w+\\s*\\[\\s*' + idxVar.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*\\]', 'g');
                var strippedBody = bodyText.replace(idxAccessRe, '');
                var idxOtherRe = new RegExp('\\b' + idxVar.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b');
                if (!idxOtherRe.test(strippedBody)) {
                    var refVar = container.replace(/s$/, '') || 'elem';
                    if (refVar === container || refVar === idxVar) refVar = container + '_item';
                    // Check if body modifies the element (refVar = ..., refVar++, etc.)
                    var escRefVar = refVar.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                    var modifyRe = new RegExp('\\b' + escRefVar + '\\s*(?:=|\\+\\+|--|\\+=|-=|\\*=|/=|\\%=)\\b|\\+\\+\\s*' + escRefVar + '\\b|--\\s*' + escRefVar + '\\b');
                    var isModified = modifyRe.test(bodyText);
                    var refPrefix = isModified ? 'auto&' : 'const auto&';
                    if (isSingleLine) {
                        var accessRe = new RegExp('\\b' + escContainer + '\\s*\\[\\s*' + idxVar.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*\\]', 'g');
                        // Remove trailing } from inlineBody since we'll add our own
                        var cleanBody = inlineBody.replace(/\}\s*$/, '').trim();
                        var newBody = cleanBody.replace(accessRe, refVar);
                        rangeResult.push(indent + 'for (' + refPrefix + ' ' + refVar + ' : ' + container + ') { ' + newBody + ' }');
                    } else {
                        rangeResult.push(indent + 'for (' + refPrefix + ' ' + refVar + ' : ' + container + ') {');
                        for (var bi2 = blockStart; bi2 < blockEnd; bi2++) {
                            var bline2 = llResult[bi2];
                            var accessRe2 = new RegExp('\\b' + escContainer + '\\s*\\[\\s*' + idxVar.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*\\]', 'g');
                            rangeResult.push(bline2.replace(accessRe2, refVar));
                        }
                        if (blockEnd < llResult.length && /\}/.test(llResult[blockEnd])) {
                            rangeResult.push(llResult[blockEnd]);
                        }
                    }
                    ri = blockEnd;
                    continue;
                }
            }
        }
        rangeResult.push(rl);
    }

    // ── 后处理：STL 算法检测 ──
    var algoResult = [];
    var needsAlgorithm = false;
    var needsNumeric = false;

    function extractBlock(lines, startIdx) {
        var depth = 0, endIdx = startIdx;
        for (var k = startIdx; k < lines.length; k++) {
            var cline = stripComments(lines[k]);
            depth += (cline.match(/\{/g) || []).length;
            depth -= (cline.match(/\}/g) || []).length;
            if (depth <= 0 && k > startIdx) { endIdx = k; break; }
        }
        return { body: lines.slice(startIdx + 1, endIdx).join('\n'), endIdx: endIdx };
    }

    for (var ai = 0; ai < rangeResult.length; ai++) {
        var al = rangeResult[ai];
        var acl = stripComments(al);
        var algoMatched = false;

        // Try pattern: variable init followed by range-for loop (scan ahead up to 5 lines)
        var initM = acl.match(/^(\s*)(int|float|double|long|unsigned|size_t)\s+(\w+)\s*=\s*(.+?)\s*;\s*$/);
        if (initM) {
            var forSingleM = null, forMultiM = null, forLineIdx = -1;
            for (var lookAhead = 1; lookAhead <= 5 && ai + lookAhead < rangeResult.length; lookAhead++) {
                var nextLine = rangeResult[ai + lookAhead];
                var nextClean = stripComments(nextLine);
                forSingleM = nextClean.match(/^(\s*)for\s*\(\s*auto\s*&\s*(\w+)\s*:\s*(\w+)\s*\)\s*\{\s*(.+?)\s*\}\s*$/);
                forMultiM = nextClean.match(/^(\s*)for\s*\(\s*auto\s*&\s*(\w+)\s*:\s*(\w+)\s*\)\s*\{\s*$/);
                if (forSingleM || forMultiM) { forLineIdx = ai + lookAhead; break; }
                // Stop scanning if we hit a non-blank, non-comment line that isn't the for loop
                if (nextClean.trim() !== '' && !/^\s*\/\//.test(nextClean)) break;
            }

            if (forSingleM || forMultiM) {
                var forM2 = forSingleM || forMultiM;
                var fIndent = forM2[1];
                var elemVar = forM2[2];
                var container = forM2[3];
                var initVar = initM[3];
                var initVal = initM[4].trim();
                var bodyClean, blockEndIdx;

                if (forSingleM) {
                    bodyClean = forSingleM[4].trim();
                    blockEndIdx = forLineIdx;
                } else {
                    var block = extractBlock(rangeResult, forLineIdx);
                    bodyClean = stripComments(block.body).trim();
                    blockEndIdx = block.endIdx;
                }

                // Pattern B1: summation → std::accumulate
                // init: var = 0, body: var += elem;
                if (initVal === '0') {
                    var sumRe = new RegExp('^' + initVar + '\\s*\\+=\\s*' + elemVar + '\\s*;$');
                    if (sumRe.test(bodyClean)) {
                        algoResult.push(fIndent + initM[2] + ' ' + initVar + ' = std::accumulate(' + container + '.begin(), ' + container + '.end(), 0);');
                        needsNumeric = true;
                        ai = blockEndIdx;
                        algoMatched = true;
                    }
                }

                // Pattern B2: count → std::count_if
                // init: var = 0, body: if (cond) var++;
                if (!algoMatched && initVal === '0') {
                    var cntRe = new RegExp('^if\\s*\\((.+)\\)\\s*\\{?\\s*' + initVar + '\\s*\\+\\+\\s*;?\\s*\\}?$');
                    var cntM = bodyClean.match(cntRe);
                    if (cntM) {
                        var condition = cntM[1].trim();
                        // Check if condition is simple equality: elem == value → use std::count
                        var eqRe = new RegExp('^' + elemVar + '\\s*==\\s*(.+)$');
                        var eqM = condition.match(eqRe);
                        if (eqM) {
                            algoResult.push(fIndent + initM[2] + ' ' + initVar + ' = std::count(' + container + '.begin(), ' + container + '.end(), ' + eqM[1].trim() + ');');
                        } else {
                            algoResult.push(fIndent + initM[2] + ' ' + initVar + ' = std::count_if(' + container + '.begin(), ' + container + '.end(),');
                            algoResult.push(fIndent + '    [](const auto& ' + elemVar + ') { return ' + condition + '; });');
                        }
                        needsAlgorithm = true;
                        ai = blockEndIdx;
                        algoMatched = true;
                    }
                }

                // Pattern B4: max element → std::max_element
                // init: var = container[0] or container.front(), body: if (elem > var) var = elem;
                if (!algoMatched) {
                    var maxInitRe = new RegExp('^' + container + '\\s*\\[\\s*0\\s*\\]$|^' + container + '\\.front\\(\\)$');
                    if (maxInitRe.test(initVal)) {
                        var maxRe = new RegExp('^if\\s*\\(' + elemVar + '\\s*>\\s*' + initVar + '\\)\\s*\\{?\\s*' + initVar + '\\s*=\\s*' + elemVar + '\\s*;?\\s*\\}?$');
                        if (maxRe.test(bodyClean)) {
                            algoResult.push(fIndent + initM[2] + ' ' + initVar + ' = *std::max_element(' + container + '.begin(), ' + container + '.end());');
                            needsAlgorithm = true;
                            ai = blockEndIdx;
                            algoMatched = true;
                        }
                        // Also handle: if (elem > maxVar) maxVar = elem; with braces
                        if (!algoMatched) {
                            var maxRe2 = new RegExp('^if\\s*\\(' + elemVar + '\\s*>\\s*' + initVar + '\\)\\s*\\{\\s*' + initVar + '\\s*=\\s*' + elemVar + '\\s*;\\s*\\}$');
                            if (maxRe2.test(bodyClean)) {
                                algoResult.push(fIndent + initM[2] + ' ' + initVar + ' = *std::max_element(' + container + '.begin(), ' + container + '.end());');
                                needsAlgorithm = true;
                                ai = blockEndIdx;
                                algoMatched = true;
                            }
                        }
                    }
                }
            }

            // Pattern B4b: max element with index-based loop (for i = 1; i < n; i++)
            if (!algoMatched) {
                var initVar2 = initM[3];
                var initVal2 = initM[4].trim();
                var maxInitRe2 = /^(\w+)\s*\[\s*0\s*\]$/.exec(initVal2);
                if (maxInitRe2) {
                    var maxContainer = maxInitRe2[1];
                    for (var la2 = 1; la2 <= 3 && ai + la2 < rangeResult.length; la2++) {
                        var laLine = rangeResult[ai + la2];
                        var laClean = stripComments(laLine);
                        var idxForM = laClean.match(/^(\s*)for\s*\(\s*(?:int|size_t|unsigned)\s+(\w+)\s*=\s*1\s*;\s*\2\s*(?:<|<=)\s*(\w+)\s*;\s*\2\s*\+\+\s*\)\s*\{\s*$/);
                        if (idxForM) {
                            var idxBlock = extractBlock(rangeResult, ai + la2);
                            var idxBody = stripComments(idxBlock.body).trim();
                            var idxElem = idxForM[2];
                            var maxIdxRe = new RegExp('^if\\s*\\(' + maxContainer + '\\s*\\[\\s*' + idxElem + '\\s*\\]\\s*>\\s*' + initVar2 + '\\)\\s*\\{?\\s*' + initVar2 + '\\s*=\\s*' + maxContainer + '\\s*\\[\\s*' + idxElem + '\\s*\\]\\s*;?\\s*\\}?$');
                            if (maxIdxRe.test(idxBody)) {
                                algoResult.push(initM[1] + initM[2] + ' ' + initVar2 + ' = *std::max_element(' + maxContainer + '.begin(), ' + maxContainer + '.end());');
                                needsAlgorithm = true;
                                ai = idxBlock.endIdx;
                                algoMatched = true;
                                break;
                            }
                        }
                        if (laClean.trim() !== '' && !/^\s*\/\//.test(laClean) && !laClean.match(/^\s*for\s*\(/)) break;
                    }
                }
            }

            // Pattern B5: find loop → std::find
            // init: var = -1, loop body: if (container[i] == target) { found = i; break; }
            if (!algoMatched && initM[4].trim() === '-1') {
                var findVar = initM[3];
                for (var la3 = 1; la3 <= 3 && ai + la3 < rangeResult.length; la3++) {
                    var la3Line = rangeResult[ai + la3];
                    var la3Clean = stripComments(la3Line);
                    var findForM = la3Clean.match(/^(\s*)for\s*\(\s*(?:int|size_t|unsigned)\s+(\w+)\s*=\s*0\s*;\s*\2\s*(?:<|<=)\s*(\w+)\s*;\s*(?:\2\s*\+\+|\+\+\s*\2)\s*\)\s*\{\s*$/);
                    if (findForM) {
                        var findBlock = extractBlock(rangeResult, ai + la3);
                        var findBody = stripComments(findBlock.body).trim();
                        var findIdx = findForM[2];
                        var findLimit = findForM[3];
                        // Match: if (container[idx] == target) { found = idx; break; }
                        var findBodyRe = new RegExp('^if\\s*\\((\\w+)\\s*\\[\\s*' + findIdx + '\\s*\\]\\s*==\\s*(.+?)\\)\\s*\\{?\\s*' + findVar + '\\s*=\\s*' + findIdx + '\\s*;\\s*break\\s*;\\s*\\}?$');
                        var findBodyM = findBody.match(findBodyRe);
                        if (findBodyM) {
                            var findContainer = findBodyM[1];
                            var findTarget = findBodyM[2].trim();
                            algoResult.push(findForM[1] + 'auto _it = std::find(' + findContainer + '.begin(), ' + findContainer + '.end(), ' + findTarget + ');');
                            algoResult.push(findForM[1] + 'int ' + findVar + ' = (_it != ' + findContainer + '.end()) ? (_it - ' + findContainer + '.begin()) : -1;');
                            needsAlgorithm = true;
                            ai = findBlock.endIdx;
                            algoMatched = true;
                            break;
                        }
                    }
                    if (la3Clean.trim() !== '' && !/^\s*\/\//.test(la3Clean) && !la3Clean.match(/^\s*for\s*\(/)) break;
                }
            }
        }

        if (!algoMatched) algoResult.push(al);
    }

    // Add headers for STL algorithms
    if (needsNumeric && !hasH('numeric')) {
        headerLines.push('#include <numeric>');
        headers['numeric'] = true;
    }
    if (needsAlgorithm && !hasH('algorithm')) {
        headerLines.push('#include <algorithm>');
        headers['algorithm'] = true;
    }

    // Rebuild final output: headers + body (strip any headers that leaked into algoResult)
    var finalBody = [];
    for (var fi = 0; fi < algoResult.length; fi++) {
        if (!/^\s*#include\s/.test(algoResult[fi])) finalBody.push(algoResult[fi]);
    }
    return headerLines.concat(finalBody).join('\n');
}

// ────────────────────────────────────────────────────────────

console.log(refactorCode("#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* next;\n};\n\n// 创建链表节点\nstruct Node* createNode(int data) {\n    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));\n    if (newNode == NULL) {\n        printf(\"malloc failed\\n\");\n        return NULL;\n    }\n    newNode->data = data;\n    newNode->next = NULL;\n    return newNode;\n}\n\nint main() {\n    // 数组\n    int n = 3;\n    int* arr = (int*)malloc(n * sizeof(int));\n    if (arr == NULL) {\n        printf(\"malloc failed\\n\");\n        return 1;\n    }\n\n    // 数组赋值\n    for (int i = 0; i < n; i++) {\n        arr[i] = i * 10;\n    }\n\n    // 链表（真正使用 Node 结构）\n    struct Node* head = createNode(10);\n    head->next = createNode(20);\n    head->next->next = createNode(30);\n\n    // 遍历链表\n    struct Node* curr = head;\n    while (curr != NULL) {\n        printf(\"node: %d\\n\", curr->data);\n        curr = curr->next;\n    }\n\n    free(arr);\n    return 0;\n}\n"));
