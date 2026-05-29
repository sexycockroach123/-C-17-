#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

// 创建链表节点
struct Node* createNode(int data) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    if (newNode == NULL) {
        printf("malloc failed\n");
        return NULL;
    }
    newNode->data = data;
    newNode->next = NULL;
    return newNode;
}

int main() {
    // 数组
    int n = 3;
    int* arr = (int*)malloc(n * sizeof(int));
    if (arr == NULL) {
        printf("malloc failed\n");
        return 1;
    }

    // 数组赋值
    for (int i = 0; i < n; i++) {
        arr[i] = i * 10;
    }

    // 链表（真正使用 Node 结构）
    struct Node* head = createNode(10);
    head->next = createNode(20);
    head->next->next = createNode(30);

    // 遍历链表
    struct Node* curr = head;
    while (curr != NULL) {
        printf("node: %d\n", curr->data);
        curr = curr->next;
    }

    free(arr);
    return 0;
}
