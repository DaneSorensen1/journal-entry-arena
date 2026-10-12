# Journal Entry Arena — Quick Setup

Everything below is click, paste, click. Part A takes about five minutes and is all you need for class today. Part B is optional and takes about five more; it makes scores show up on your teacher page.

## Part A — Put the game online (GitHub)

1. Go to **github.com** and sign in. Click the green **New** button (top left).
2. Repository name: `journal-entry-arena`. Leave it **Public**. Click **Create repository**.
3. On the next page click the link **creating a new file**.
4. In the name box type `index.html`. Open the file **index.html** from this package, select all, copy, and paste it into the big editor box. Click the green **Commit changes…** button, then **Commit changes** again.
5. Click **Add file → Create new file** and repeat step 4 three more times, once for each of these: `config.js`, `teacher.html`, `board.html`.
6. Click **Settings** (top tab), then **Pages** (left menu). Under *Branch*, change **None** to **main** and click **Save**.
7. Wait one minute, then refresh the Pages screen. A link appears at the top. Done.

**Your links** (replace `YOURNAME` with your GitHub username):

- Students: `https://YOURNAME.github.io/journal-entry-arena/`
- You (teacher page): `https://YOURNAME.github.io/journal-entry-arena/teacher.html`
- Overhead board: `https://YOURNAME.github.io/journal-entry-arena/board.html`

Class codes are already set: Block 1A-1B is **ARENA1**, Block 2A-2B is **ARENA2**, Block 3B-3C is **ARENA3**. Students type their name, pick their block, type the code, and play. Without Part B, scores save on each student's own device only.

## Part B — Make scores reach your teacher page (Firebase, optional)

1. Go to **console.firebase.google.com** and sign in with any Google account. Click **Create a project**, name it `journal-entry-arena`, click **Continue**, turn **off** Google Analytics, click **Create project**, then **Continue**.
2. Left menu: **Build → Authentication → Get started**. Click **Anonymous**, flip **Enable** on, click **Save**.
3. Left menu: **Build → Firestore Database → Create database**. Click **Next**, keep **Production mode**, click **Create**.
4. Click the **Rules** tab at the top. Delete everything in the box, paste the **Rules** text at the bottom of this page, click **Publish**.
5. Left menu: click the **gear ⚙ → Project settings**. Scroll down and click the **`</>`** (web) icon. App nickname: `arena`. Click **Register app**. You will see a block of code that starts with `const firebaseConfig = {` and ends with `};`. Copy just the part from `{` to `}`.
6. Left menu again: **Authentication → Settings → Authorized domains → Add domain**. Type `YOURNAME.github.io` and click **Add**.
7. Back on GitHub: open your repository, click **config.js**, click the **pencil** (edit) icon. Find the line `firebase: null,` and replace `null` with the `{ … }` you copied in step 5. Click **Commit changes…**, then **Commit changes**.
8. Open your teacher page. The first time, it shows a line like *Your anonymous id on this device: abc123…*. Copy that id. In Firebase go to **Firestore Database → Start collection**: Collection ID `teachers`, click **Next**, Document ID = that id, field name `ok`, type boolean, value true, click **Save**.

Refresh the teacher page. From now on every student's scores, timing, and explanations appear there, and the board page works on the projector.

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
