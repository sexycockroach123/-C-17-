# C++ 代码现代化重构工具

基于 C++17 规范的自动代码检测与智能重构工具。将遗留 C 风格代码一键转换为现代 C++17 代码。

## 使用方式

直接在浏览器中打开 `index.html`，选择示例或粘贴自己的代码，点击「分析并重构」即可。

## 支持的重构功能

### 内存管理

| 重构前 | 重构后 |
|--------|--------|
| `int* arr = malloc(n * sizeof(int))` | `std::vector<int> arr(n)` |
| `struct Student* s = malloc(sizeof(struct Student))` | `std::vector<Student> s(1)` |
| `free(arr)` | 自动删除 |
| `NULL` | `nullptr` |
| `if (ptr == NULL)` | 容器: `if (vec.empty())` / 指针: `if (ptr == nullptr)` |
| `if (!ptr)` | `if (ptr == nullptr)` |
| `if (ptr)` | `if (ptr != nullptr)` |

### 字符串现代化

| 重构前 | 重构后 |
|--------|--------|
| `char name[50] = "Alice"` | `std::string name = "Alice"` |
| `strcpy(dest, src)` | `dest = src` |
| `strcat(dest, src)` | `dest += src` |
| `strlen(str)` | `str.size()` |
| `strcmp(a, b) == 0` | `a == b` |

### STL 容器与算法

| 重构前 | 重构后 |
|--------|--------|
| `int arr[5] = {1,2,3,4,5}` | `std::vector<int> arr = {1,2,3,4,5}` |
| `arr[n++] = val` | `arr.push_back(val)` |
| 求和循环 | `std::accumulate(...)` |
| 计数循环 | `std::count(...)` / `std::count_if(...)` |
| 求最大值循环 | `std::max_element(...)` |
| 查找循环 (带 break) | `std::find(...)` + 迭代器模式 |

### 链表 → std::list

| 重构前 | 重构后 |
|--------|--------|
| `struct Node { int data; Node* next; }` | `std::list<int>` |
| `node->data = val` | `list.push_back(val)` |
| `head->next->next = createNode(30)` | `list.push_back(30)` |
| `while (curr != NULL) { ... curr = curr->next; }` | `for (const auto& item : list) { ... }` |

支持工厂函数 (`createNode`) 检测与转换:
- 1 个数据成员: 删除结构体和工厂函数, 使用 `std::list<基础类型>`
- >=2 个数据成员: 保留结构体, 工厂函数转为值返回, 使用 `std::list<结构体类型>`

### 循环现代化

| 重构前 | 重构后 |
|--------|--------|
| `for (int i = 0; i < vec.size(); i++) { use(vec[i]); }` | `for (auto& item : vec) { use(item); }` |

只读遍历自动使用 `const auto&`。支持 `int / size_t / long / long long / char` 等索引类型。

### 宏现代化

| 重构前 | 重构后 |
|--------|--------|
| `#define MAX 100` | `constexpr int MAX = 100` |
| `#define MAX(a,b) ((a)>(b)?(a):(b))` | `template<typename T> inline constexpr auto MAX(const T& a, const T& b)` |

### I/O 现代化

| 重构前 | 重构后 |
|--------|--------|
| `#include <stdio.h>` | `#include <iostream>` |
| `printf("hello")` | `std::cout << "hello"` |
| `printf("\n")` | `std::cout << std::endl` |
| `scanf("%d", &x)` | `std::cin >> x` |

### 头文件自动管理

根据代码中使用的特性自动添加: `<vector>`, `<list>`, `<string>`, `<numeric>`, `<algorithm>`, `<iostream>`

## 内置示例

工具内置 8 个示例，覆盖上述所有场景:

| 示例 | 覆盖功能 |
|------|----------|
| 内存管理问题 | malloc/free, NULL 检查 |
| 旧式循环与宏 | 索引循环 → range-for, 宏 → constexpr/template |
| 综合遗留代码 | malloc + 循环 + printf + NULL |
| I/O与规范化问题 | printf/scanf → cout/cin, 字符串函数 |
| 宏与字符串函数 | #define → constexpr, strcpy/strcmp → std::string |
| STL算法现代化 | 求和/计数/最大值/查找 → STL 算法 |
| 容器操作 | arr[n++] = val → push_back |
| 链表→std::list | 手写链表 → std::list, 工厂函数转换 |

## 命令行测试

```bash
node test_user.js          # 重构 user_input.cpp，输出到控制台
node _test_temp.js         # 执行重构并运行结果
```

## 技术栈

- 纯前端实现，无需后端服务
- 原生 JavaScript，无框架依赖
- 代码高亮使用自定义 tokenizer
