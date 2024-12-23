---
title: "단순 연결 리스트"
date: "2024-07-09"
---

## 단순 연결 리스트

다음 노드를 가리키는 포인터와 데이터만을 가지고 있는 단순한 연결 리스트이다. 리스트의 첫번째 노드를 head라고 부르며, 마지막 노드의 포인터는 null을 가리킨다.

- 맨 앞에 삽입하기
- 맨 뒤에 삽입하기
- 특정 노드 앞에 삽입하기
- 전체 노드 출력하기
- 특정 노드 삭제하기

### 맨 앞에 삽입하기

새로운 노드를 만들고 기존에 있던 HEAD 노드를 가리키게 한다. 그리고 새로운 노드를 HEAD 노드로 지정한다.

### 맨 뒤에 삽입하기

HEAD 노드부터 TAIL 노드까지 탐색하면서, 만약 탐색중인 노드의 포인터가 null이라면, 해당 노드의 포인터가 새로운 노드를 가리키게 한다.

### 특정 노드 뒤에 삽입하기

새로운 노드를 삽입할 위치 앞에 있는 노드가 가리키는 노드를 가리키게 한다. 그 다음 기존 노드가 새로운 노드를 가리키게 한다.

```diagram
[NODE A]        [NODE B]--->[NODE C]--->[X]
    \                \
     o--->[NODE D]--->o
```

### 특정 노드 삭제하기

삭제할 노드 앞에 있는 노드의 포인터를 해당 노드의 포인터의 노드의 포인터가 가리키는 노드에 연결한다.

### 코드

```c++
#include <iostream>

using namespace std;

struct node {
    int data;
    node *next;
};

void insert_first(int number, node* &head);
void insert_last(int number, node* &head);
void insert_node(int number, node* &front);
void delete_node(int data, node* &front);
void delete_all(const node* head);
void show_all(const node* head);

int main() {
    node* head = nullptr;

    // 뒤에 삽입
    insert_last(1, head);

    // 앞에 삽입
    insert_first(2, head);

    // 특정 노드 뒤에 삽입
    insert_node(3, head->next);

    // 뒤에 삽입
    insert_last(4, head);

    // 앞에 삽입
    insert_first(5, head);

    // 특정 노드 삭제하기
    delete_node(5, head);

    // 전체 출력
    show_all(head);

    // 메모리 정리
    delete_all(head);
}

void insert_first(int number, node* &head) {
    node* insert_node = new node;
    insert_node->data = number;

    if(head != nullptr) {
        insert_node->next = head;
    }

    head = insert_node;
}

void insert_last(int number, node* &head) {
    node* insert_node = new node;
    insert_node->data = number;

    if(head == nullptr) {
        head = insert_node;
        return;
    }

    node* prev_node = head;
    while(prev_node->next != nullptr) {
        prev_node = prev_node->next;
    }

    prev_node->next = insert_node;
}

void insert_node(int number, node* &front) {
    node* insert_node = new node;
    insert_node->data = number;

    if(front == nullptr) {
        front = insert_node;
        return;
    }

    insert_node->next = front->next;
    front->next = insert_node;
}

void delete_node(int data, node* &front) {
    if(front->data == data) {
        front = front->next;
        return;
    }

    node* next_node = front;
    while(next_node->next->data != data) {
        next_node = next_node->next;
    }

    node* current_node = next_node->next;
    next_node->next = next_node->next->next;
    free(current_node);
}

void delete_all(const node* head) {
    while(head->next != nullptr) {
        node* temp = head->next;
        delete head;
        head = temp;
    }
}

void show_all(const node* head) {
    cout << head->data << " ";
    while(head->next != nullptr) {
        head = head->next;
        cout << head->data << " ";
    }
    cout << '\n';
}
```
