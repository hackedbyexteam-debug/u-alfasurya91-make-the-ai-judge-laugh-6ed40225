// Make the AI Judge Laugh — one office-life line, under 200 characters.
//
// The line:
//   "My calendar blocked an hour for focus time, then invited six people
//    to watch me focus."
//
// Why this line: the judge's criteria are lexicographic, and criterion 2
// wants an observation true to office life while criterion 3 wants a
// surprising turn in the last word, not a pun or a stock line. Focus time
// is a real calendar feature, and the turn lands in the final three words:
// the calendar does not protect the hour, it fills it with an audience.
// Concrete nouns all the way (calendar, hour, six people), no wasted
// setup, easy to read aloud in one breath, and the frame is fresh — it is
// not another "this meeting could have been an email" line.
// Rejected candidates: the printer that only jams on urgent documents
// (true, but the "it can smell fear" frame is crowded); the meeting that
// ended early so a second meeting was scheduled to discuss it (good
// escalation, but "a meeting about the meeting" is the modal office joke);
// the boss replying to an out-of-office reply to ask if I was really out
// (strong turn, weaker than the calendar line because the punch is a
// question, not an image).
//
// The grader runs this file with Node 22 and reads the single line back
// from /output/entry.txt (1-200 characters, UTF-8).
import { mkdirSync, writeFileSync } from "node:fs";

// The one office-life line this entry submits.
const LINE =
  "My calendar blocked an hour for focus time, then invited six people to watch me focus.";

// The grader's output directory; overridable for a local dry run so the
// same file can be tested without root access to /output.
const outputDir = process.env.OUTPUT_DIR ?? "/output";
const entryPath = `${outputDir}/entry.txt`;

// Fail loudly instead of submitting an invalid line: the gate requires
// exactly one line of 1-200 non-blank characters, and a silent truncation
// would change the joke.
if (LINE.length > 200 || LINE.trim().length === 0) {
  throw new Error(
    `entry is ${LINE.length} characters, must be 1-200 non-blank characters`,
  );
}
if (/[\r\n]/.test(LINE)) {
  throw new Error("entry must be a single line with no line breaks");
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(entryPath, LINE, "utf8");
console.log(`wrote ${LINE.length}-character entry to ${entryPath}`);
