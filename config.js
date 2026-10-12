// Journal Entry Arena — site configuration. Edit this file; nothing else needs to change.
window.JEA_CONFIG = {
  // Your three blocks. Students pick one when they first open the app. The class code is a light lock so
  // only your students join a block; hand each block its code in class. Set requireCode to false to skip codes.
  blocks: [
    { id: '1', name: 'Block 1A-1B', code: 'ARENA1' },
    { id: '2', name: 'Block 2A-2B', code: 'ARENA2' },
    { id: '3', name: 'Block 3B-3C', code: 'ARENA3' },
  ],
  requireCode: true,

  // After a student's opening round, mixed sets draw more often from these categories (1 = normal, 1.5 = fifty percent more often).
  // Set this to match what the next quiz emphasizes.
  emphasis: { REV: 1.5, EXP: 1.5 },

  // Scoring knobs. window: a category score is accuracy on the student's most recent N attempts in that category.
  // rankAfter: attempts needed before a category counts on the board (also the length of the random opening round per category).
  // focusSize: questions in a focused set. mixedSize: questions in a mixed set. focusMaxScore: focus is only offered below this score.
  scoring: { window: 5, rankAfter: 5, focusSize: 5, mixedSize: 10, focusMaxScore: 0.8 },

  // Light anti-cheat. noCopy blocks selecting, copying, printing and right-click on the question and options.
  // swapOnLeave replaces the open question (uncounted) when a student switches tabs or apps mid-question, and counts the event
  // for the teacher page. Screenshots cannot be blocked by a web page; randomized names, amounts, and option order are the real defense.
  antiCheat: { noCopy: true, swapOnLeave: true },

  // Class record (names, blocks, scores shared across devices; powers the overhead board and teacher page).
  // Leave as null to run with results saved only in each student's browser.
  // To turn it on: Firebase console -> your project -> Project settings -> "Your apps" -> Web app -> copy the
  // firebaseConfig object and paste it here (see README, step "Turn on the class record").
  firebase: { apiKey: "AIzaSyBnBpSSxGoxSSdPU188AhxiUmzJgvxUurc", authDomain: "journal-entry-arena.firebaseapp.com", projectId: "journal-entry-arena", storageBucket: "journal-entry-arena.firebasestorage.app", messagingSenderId: "378585775864", appId: "1:378585775864:web:57f5af35107c6bef4c850d" },
  // Example:
  // firebase: { apiKey: "...", authDomain: "xxx.firebaseapp.com", projectId: "xxx", storageBucket: "xxx.appspot.com", messagingSenderId: "...", appId: "..." },
};
