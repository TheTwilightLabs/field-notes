from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
GAME = ROOT / "public" / "game" / "signal-garden"
errors: list[str] = []

starters = sorted(GAME.glob("*-starter.py"))
completed = sorted(GAME.glob("*-completed.py"))

if len(starters) != 7 or len(completed) != 7:
    errors.append(f"expected 7 starter and 7 completed files, found {len(starters)} and {len(completed)}")

for file in starters:
    if "TODO:" not in file.read_text():
        errors.append(f"{file.name}: starter has no TODO")

for file in completed:
    result = subprocess.run([sys.executable, str(file), "--demo"], cwd=GAME, capture_output=True, text=True)
    if result.returncode != 0 or "DEMO COMPLETE" not in result.stdout:
        errors.append(f"{file.name}: demo failed\n{result.stdout}\n{result.stderr}")

if errors:
    print("\n".join(errors), file=sys.stderr)
    raise SystemExit(1)

print("Validated 14 Signal Garden files and executed every completed chapter.")
