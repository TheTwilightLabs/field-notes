from pathlib import Path
import json
import sys

import nbformat
from nbclient import NotebookClient

ROOT = Path(__file__).resolve().parents[1]
NOTEBOOKS = ROOT / "public" / "notebooks"
errors: list[str] = []

for notebook_path in sorted(NOTEBOOKS.glob("*.ipynb")):
    try:
        notebook = nbformat.read(notebook_path, as_version=4)
        text = "\n".join("".join(cell.get("source", "")) for cell in notebook.cells)
        if notebook_path.name.endswith("-starter.ipynb"):
            if "TODO:" not in text:
                errors.append(f"{notebook_path.name}: starter has no TODO exercise")
            if "Completed solution" in text:
                errors.append(f"{notebook_path.name}: starter exposes solution content")
        else:
            if "TODO:" in text:
                errors.append(f"{notebook_path.name}: solution still contains TODO")
            NotebookClient(notebook, timeout=90, kernel_name="python3").execute(cwd=str(NOTEBOOKS))
    except Exception as exc:
        errors.append(f"{notebook_path.name}: {exc}")

expected = 36
actual = len(list(NOTEBOOKS.glob("*.ipynb")))
if actual != expected:
    errors.append(f"expected {expected} notebooks, found {actual}")

if errors:
    print("\n".join(errors), file=sys.stderr)
    raise SystemExit(1)

print(f"Validated {actual} notebooks and executed every solution notebook.")
