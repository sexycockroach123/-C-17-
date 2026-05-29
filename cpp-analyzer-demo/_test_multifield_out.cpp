#include <iostream>
#include <vector>
#include <list>

struct Student {
    int id;
    int score;
};

Student createStudent(int id, int score) {
    Student s;
    s.id = id;
    s.score = score;
    return s;
}

int main() {
    std::list< Student > head;
    head.push_back(createStudent(1, 90));
    head.push_back(createStudent(2, 85));
    head.push_back(createStudent(3, 95));

    for (const auto& head_item : head) {
        std::cout << "ID: " << head_item.id << ", Score: " << head_item.score << std::endl;
    }

    return 0;
}

