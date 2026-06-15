import type { CodeStep, GameChapterContent, Lesson, Module } from "@/lib/course-data";

type Chapter = {
  slug: string;
  title: string;
  summary: string;
  mechanic: string;
  outcome: string;
  objectives: string[];
  steps: CodeStep[];
  unlocks: string[];
  preview: GameChapterContent["preview"];
};

const chapters: Chapter[] = [
  {
    slug: "game-player-state",
    title: "Chapter 1: Create the explorer",
    summary: "Use variables and types to create the player at the center of Signal Garden.",
    mechanic: "Player state",
    outcome: "represent the explorer's name, energy, signals, and current location",
    objectives: ["Use strings, integers, and booleans", "Update changing values", "Print a readable status panel"],
    unlocks: ["Explorer identity", "Energy meter", "Signal counter"],
    preview: { location: "Observatory", energy: 5, signals: 0, message: "The garden is silent. Your receiver flickers awake." },
    steps: [
      { title: "Create player state", explanation: "Variables hold the facts the game needs to remember.", code: "player_name = \"Nova\"\nenergy = 5\nsignals = 0\nlocation = \"Observatory\"", output: "Nova begins at the Observatory with 5 energy." },
      { title: "Show a status panel", explanation: "A formatted string turns raw state into useful player feedback.", code: "print(f\"{player_name} | {location} | energy: {energy} | signals: {signals}\")", output: "Nova | Observatory | energy: 5 | signals: 0" },
    ],
  },
  {
    slug: "game-build-the-world",
    title: "Chapter 2: Build the garden map",
    summary: "Use dictionaries, lists, tuples, and sets to represent a connected world.",
    mechanic: "World map",
    outcome: "build a map that connects locations and remembers discovered signals",
    objectives: ["Model locations with dictionaries", "Store exits in lists", "Track discoveries with a set"],
    unlocks: ["Four locations", "Connected paths", "Discoverable signals"],
    preview: { location: "Observatory", energy: 5, signals: 0, message: "Paths illuminate toward the Moss Gate and Echo Pond." },
    steps: [
      { title: "Describe the world", explanation: "A nested dictionary gives each location a description, exits, and optional signal.", code: "world = {\n    \"Observatory\": {\"exits\": [\"Moss Gate\", \"Echo Pond\"], \"signal\": None},\n    \"Moss Gate\": {\"exits\": [\"Observatory\", \"Sunken Library\"], \"signal\": \"green\"},\n}", output: "A connected map stored as structured data." },
      { title: "Track discoveries", explanation: "A set stores unique signals, preventing the same discovery from being counted twice.", code: "found_signals = set()\nfound_signals.add(\"green\")\nfound_signals.add(\"green\")\nlen(found_signals)", output: "1" },
    ],
  },
  {
    slug: "game-choices-and-rules",
    title: "Chapter 3: Add choices and rules",
    summary: "Use conditions to turn player commands into meaningful consequences.",
    mechanic: "Command rules",
    outcome: "validate movement and respond differently to explore, listen, and rest commands",
    objectives: ["Compare command strings", "Validate allowed moves", "Handle unknown commands"],
    unlocks: ["Movement rules", "Explore command", "Helpful error messages"],
    preview: { location: "Moss Gate", energy: 4, signals: 1, message: "A green signal answers when you listen." },
    steps: [
      { title: "Validate a move", explanation: "Conditions protect the game from impossible actions.", code: "destination = \"Moss Gate\"\nif destination in world[location][\"exits\"]:\n    location = destination\n    energy -= 1\nelse:\n    print(\"That path is not connected.\")", output: "The player moves only along a valid path." },
      { title: "Branch on a command", explanation: "elif lets the game choose one response from several possibilities.", code: "if command == \"listen\":\n    print(\"You tune the receiver.\")\nelif command == \"rest\":\n    energy += 1\nelse:\n    print(\"Try: move, listen, rest, status, or quit.\")", output: "The game responds to the selected command." },
    ],
  },
  {
    slug: "game-loop",
    title: "Chapter 4: Make the game run",
    summary: "Use a loop to keep accepting commands until the story ends.",
    mechanic: "Game loop",
    outcome: "create the repeating input-process-output cycle used by interactive programs",
    objectives: ["Write a while loop", "Use break and continue", "Define clear win and loss conditions"],
    unlocks: ["Continuous play", "Win condition", "Energy loss condition"],
    preview: { location: "Echo Pond", energy: 3, signals: 2, message: "The world waits for your next command." },
    steps: [
      { title: "Repeat while the player can act", explanation: "The loop keeps the world alive until a condition ends the story.", code: "running = True\nwhile running and energy > 0:\n    command = input(\"> \").strip().lower()\n    if command == \"quit\":\n        running = False", output: "The prompt repeats until the player quits or loses all energy." },
      { title: "Check the win condition", explanation: "The goal is another condition checked after each turn.", code: "if len(found_signals) == 3:\n    print(\"The Signal Garden sings again.\")\n    running = False", output: "Collecting all three signals completes the game." },
    ],
  },
  {
    slug: "game-functions",
    title: "Chapter 5: Organize actions with functions",
    summary: "Turn repeated game behavior into small functions with clear responsibilities.",
    mechanic: "Action functions",
    outcome: "separate status, movement, listening, and command handling into testable functions",
    objectives: ["Define parameters and return values", "Separate responsibilities", "Test one action at a time"],
    unlocks: ["Reusable actions", "Readable game loop", "Testable mechanics"],
    preview: { location: "Sunken Library", energy: 2, signals: 2, message: "Each action now has one clear job." },
    steps: [
      { title: "Extract a status function", explanation: "A function names a behavior and keeps formatting out of the main loop.", code: "def show_status(player):\n    return f\"{player['name']} | {player['location']} | energy: {player['energy']}\"", output: "A reusable status string." },
      { title: "Return updated state", explanation: "Small functions can receive state, apply one rule, and return the result.", code: "def rest(player):\n    player['energy'] = min(player['energy'] + 1, 5)\n    return \"You rest beneath the glass trees.\"", output: "The player gains energy without exceeding the maximum." },
    ],
  },
  {
    slug: "game-classes-and-save-data",
    title: "Chapter 6: Add classes and saved progress",
    summary: "Use a class to package player state and JSON to save progress between sessions.",
    mechanic: "Player object and saves",
    outcome: "create a Player class and serialize progress to a save file",
    objectives: ["Create a class", "Use methods", "Read and write JSON safely"],
    unlocks: ["Player class", "Save command", "Load command"],
    preview: { location: "Glass Grove", energy: 4, signals: 2, message: "Your journey can now survive after the program closes." },
    steps: [
      { title: "Create a Player class", explanation: "A class packages related state and behavior into one reusable object.", code: "class Player:\n    def __init__(self, name):\n        self.name = name\n        self.energy = 5\n        self.location = \"Observatory\"\n        self.signals = set()", output: "A Player object with its own state." },
      { title: "Save as JSON", explanation: "JSON turns basic Python values into a portable text file.", code: "import json\nsave_data = {\"name\": player.name, \"energy\": player.energy, \"location\": player.location, \"signals\": list(player.signals)}\nwith open(\"signal-garden-save.json\", \"w\") as file:\n    json.dump(save_data, file)", output: "Progress is written to signal-garden-save.json." },
    ],
  },
  {
    slug: "game-complete-signal-garden",
    title: "Chapter 7: Complete Signal Garden",
    summary: "Assemble every concept into one playable, resilient Python adventure.",
    mechanic: "Complete game",
    outcome: "run, explain, modify, and share the complete Signal Garden game",
    objectives: ["Assemble the complete program", "Handle invalid input safely", "Design and add one original feature"],
    unlocks: ["Complete adventure", "Three endings", "Your own extension"],
    preview: { location: "Heart Tree", energy: 2, signals: 3, message: "Every signal joins. The garden wakes in blue light." },
    steps: [
      { title: "Run the complete game", explanation: "The final program combines state, collections, rules, loops, functions, classes, files, and randomness.", code: "python signal-garden.py", output: "Signal Garden starts in your terminal." },
      { title: "Make it yours", explanation: "A complete program becomes a learning tool when you change its rules deliberately.", code: "# Extension ideas:\n# - add a new location\n# - create an inventory item\n# - add a fourth signal\n# - write a second ending", output: "Your own version of Signal Garden." },
    ],
  },
];

function chapterLesson(chapter: Chapter, index: number): Lesson {
  const number = index + 1;
  return {
    slug: chapter.slug,
    title: chapter.title,
    eyebrow: `GAME CHAPTER ${String(number).padStart(2, "0")} / SIGNAL GARDEN`,
    summary: chapter.summary,
    duration: number === chapters.length ? "90 min" : "60 min",
    diagram: number === chapters.length ? "flowchart" : "pipeline",
    concept: chapter.mechanic,
    sections: [
      {
        title: "One game, one new system",
        body: [
          chapter.summary,
          `This chapter adds ${chapter.unlocks.join(", ").toLowerCase()} to the same growing project. Start from the chapter starter file, finish the missing pieces, then compare it with the completed file.`,
        ],
      },
    ],
    keyIdeas: [
      `${chapter.mechanic} is one part of a larger program.`,
      "Each chapter preserves and extends the work from the previous chapter.",
      "Small functions and explicit state make game rules easier to debug.",
      "The final game is understandable because every system was built separately first.",
    ],
    exercises: {
      conceptual: { prompt: `Explain how ${chapter.mechanic.toLowerCase()} changes the game.`, hint: "Describe what the program can remember or do after this chapter." },
      applied: { prompt: `Complete the missing code in the Chapter ${number} starter file.`, hint: "Run the file after every small change." },
      critical: { prompt: "Change one game rule without breaking the rest of the program.", hint: "State the rule first, then identify the smallest code location responsible for it." },
    },
    coding: {
      objectives: chapter.objectives,
      prerequisites: number === 1 ? ["Python variables and basic terminal use"] : [`Complete Signal Garden Chapter ${number - 1}`],
      outcome: chapter.outcome,
      steps: chapter.steps,
      resources: [
        { title: `Chapter ${number} starter`, description: "The playable project with focused TODOs for this chapter.", href: `/game/signal-garden/chapter-${String(number).padStart(2, "0")}-starter.py`, kind: "starter", format: "PY", size: "2–8 KB" },
        { title: `Chapter ${number} completed`, description: "The completed chapter implementation for comparison.", href: `/game/signal-garden/chapter-${String(number).padStart(2, "0")}-completed.py`, kind: "solution", format: "PY", size: "2–8 KB" },
      ],
    },
    game: {
      chapter: number,
      totalChapters: chapters.length,
      mechanic: chapter.mechanic,
      unlocks: chapter.unlocks,
      preview: chapter.preview,
    },
  };
}

export const signalGardenModule: Module = {
  number: "07",
  title: "Build one complete Python game",
  description: "Learn how a real program grows by building Signal Garden one system at a time.",
  lessons: chapters.map(chapterLesson),
};
