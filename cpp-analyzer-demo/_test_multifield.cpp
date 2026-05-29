#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Student {
    int id;
    int score;
    struct Student* next;
};

struct Student* createStudent(int id, int score) {
    struct Student* s = (struct Student*)malloc(sizeof(struct Student));
    if (s == NULL) {
        printf("alloc failed\n");
        return NULL;
    }
    s->id = id;
    s->score = score;
    s->next = NULL;
    return s;
}

int main() {
    struct Student* head = createStudent(1, 90);
    head->next = createStudent(2, 85);
    head->next->next = createStudent(3, 95);

    struct Student* curr = head;
    while (curr != NULL) {
        printf("ID: %d, Score: %d\n", curr->id, curr->score);
        curr = curr->next;
    }

    return 0;
}
