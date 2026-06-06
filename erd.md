---
config:
  layout: elk
---
``` mermaid
erDiagram
STUDY ||--o{ HABIT : contains
STUDY ||--o{ FOCUS_SESSION : contains
STUDY ||--o{ EMOJI : contains
HABIT ||--o{ HABIT_RECORD : contains

    STUDY {
        int id PK
        string nickname
        string title
        string description
        string background
        string password
        int totalPoint
        datetime createdAt
        datetime updatedAt
    }

    HABIT {
        int id PK
        int studyId FK
        string content
        datetime deletedAt
        boolean isActive
        datetime createdAt
        datetime updatedAt
    }

    HABIT_RECORD {
        int id PK
        int habitId FK
        boolean isChecked
        date date
        datetime createdAt
        datetime updatedAt
    }

    EMOJI {
        int id PK
        int studyId FK
        string emoji
        int count
        datetime createdAt
        datetime updatedAt
    }

    FOCUS_SESSION {
        int id PK
        int studyId FK
        int duration
        int earnedPoint
        datetime createdAt
        datetime updatedAt
    }
```