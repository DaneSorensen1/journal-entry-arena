

## Rules (for Part B step 4)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function signedIn() { return request.auth != null; }
    function isTeacher() { return signedIn() && exists(/databases/$(database)/documents/teachers/$(request.auth.uid)); }

    // One document per student device: name and block.
    match /players/{uid} {
      allow read: if signedIn();
      allow create, update: if signedIn() && request.auth.uid == uid;
    }
    // One summary document per student: scores by category. Read by the overhead board and the teacher page.
    match /stats/{uid} {
      allow read: if signedIn();
      allow create, update: if signedIn() && request.auth.uid == uid
        && request.resource.data.name is string && request.resource.data.block is string;
    }
    // Append-only log of every answer. Students can add their own; only the teacher can read them all.
    match /attempts/{id} {
      allow create: if signedIn() && request.resource.data.uid == request.auth.uid;
      allow read: if isTeacher();
    }
    // Add a document whose id is your own anonymous uid (shown on the teacher page) to become the teacher.
    match /teachers/{uid} {
      allow read: if signedIn() && request.auth.uid == uid;
      allow write: if false;
    }
  }
}

```
