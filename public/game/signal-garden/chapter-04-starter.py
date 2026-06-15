#!/usr/bin/env python3
"""Signal Garden — Chapter 4: Game loop

Run interactively:
    python chapter-04-starter.py

Run the deterministic verification demo:
    python chapter-04-starter.py --demo
"""

import json
import random
import sys
from pathlib import Path

CHAPTER = 4
SAVE_FILE = Path("signal-garden-save.json")
WORLD = {
    "Observatory": {"exits": ["Moss Gate", "Echo Pond"], "signal": None},
    "Moss Gate": {"exits": ["Observatory", "Sunken Library"], "signal": "green"},
    "Echo Pond": {"exits": ["Observatory", "Glass Grove"], "signal": "blue"},
    "Sunken Library": {"exits": ["Moss Gate", "Heart Tree"], "signal": "gold"},
    "Glass Grove": {"exits": ["Echo Pond", "Heart Tree"], "signal": None},
    "Heart Tree": {"exits": ["Sunken Library", "Glass Grove"], "signal": None},
}


class Player:
    def __init__(self, name="Nova"):
        self.name = name
        self.energy = 5
        self.location = "Observatory"
        self.signals = set()

    def status(self):
        return f"{self.name} | {self.location} | energy: {self.energy} | signals: {len(self.signals)}/3"


def move(player, destination):
    if destination not in WORLD[player.location]["exits"]:
        return "That path is not connected."
    player.location = destination
    player.energy -= 1
    return f"You travel to {destination}."


def listen(player):
    signal = WORLD[player.location]["signal"]
    if signal and signal not in player.signals:
        player.signals.add(signal)
        return f"A {signal} signal joins your receiver."
    return random.choice(["Leaves answer in static.", "The receiver hums softly.", "No new signal answers."])


def rest(player):
    player.energy = min(player.energy + 1, 5)
    return "You rest beneath the glass trees."


def save(player):
    data = {"name": player.name, "energy": player.energy, "location": player.location, "signals": sorted(player.signals)}
    SAVE_FILE.write_text(json.dumps(data, indent=2))
    return f"Progress saved to {SAVE_FILE}."


def handle(player, command):
    parts = command.strip().split(maxsplit=1)
    action = parts[0].lower() if parts else ""
    if action == "status":
        return player.status()
    if action == "move" and len(parts) == 2:
        return move(player, parts[1].title())
    if action == "listen":
        return listen(player)
    if action == "rest":
        return rest(player)
    if action == "save" and CHAPTER >= 6:
        return save(player)
    if action == "quit":
        return "quit"
    return "Try: status, move LOCATION, listen, rest, save, or quit."


def run_demo():
    random.seed(7)
    player = Player()
    commands = ["status", "move Moss Gate", "listen", "move Sunken Library", "listen", "status"]
    print(f"SIGNAL GARDEN / CHAPTER {CHAPTER} / GAME LOOP")
    for command in commands:
        print(f"> {command}")
        print(handle(player, command))
    assert len(player.signals) == 2
    assert player.energy == 3
    print("DEMO COMPLETE")


def play():
    player = Player(input("Explorer name: ").strip() or "Nova")
    print("\nSIGNAL GARDEN")
    print("Restore three lost signals. Type status to begin.")
    while player.energy > 0 and len(player.signals) < 3:
        result = handle(player, input("\n> "))
        if result == "quit":
            print("The garden remembers your footsteps.")
            return
        print(result)
    print("\nThe Signal Garden sings again." if len(player.signals) == 3 else "\nYour receiver falls silent.")


def chapter_task():
    """Keep processing commands until a win, loss, or quit."""
    # TODO: Complete this chapter's mechanic, then compare with the completed file.
    pass


if __name__ == "__main__":
    run_demo() if "--demo" in sys.argv else play()
