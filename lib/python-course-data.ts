import type { CodeStep, Course, DiagramType, Lesson, LessonResource } from "@/lib/course-data";

type LessonSpec = {
  slug: string;
  title: string;
  summary: string;
  duration: string;
  concept: string;
  diagram?: DiagramType;
  objectives: string[];
  prerequisites?: string[];
  outcome: string;
  steps: CodeStep[];
  guidance?: { title: string; body: string[] }[];
  dataset?: {
    file: string;
    title: string;
    description: string;
    size: string;
    attribution?: string;
  };
};

const notebookResource = (slug: string, kind: "starter" | "solution"): LessonResource => ({
  title: `${kind === "starter" ? "Starter" : "Solution"} notebook`,
  description: kind === "starter"
    ? "A guided notebook with exercises ready for you to complete."
    : "A completed, executable notebook with explanations and answers.",
  href: `/notebooks/${slug}-${kind}.ipynb`,
  kind,
  format: "IPYNB",
  size: "4–12 KB",
});

function codingLesson(index: number, spec: LessonSpec): Lesson {
  const resources: LessonResource[] = [
    notebookResource(spec.slug, "starter"),
    notebookResource(spec.slug, "solution"),
  ];

  if (spec.dataset) {
    resources.push({
      title: spec.dataset.title,
      description: spec.dataset.description,
      href: `/datasets/${spec.dataset.file}`,
      kind: "dataset",
      format: "CSV",
      size: spec.dataset.size,
      attribution: spec.dataset.attribution,
    });
  }

  return {
    slug: spec.slug,
    title: spec.title,
    eyebrow: `FOUNDATION ${String(index).padStart(2, "0")} / PYTHON FOR DATA SCIENCE`,
    summary: spec.summary,
    duration: spec.duration,
    diagram: spec.diagram ?? "pipeline",
    concept: spec.concept,
    sections: [
      {
        title: "Why this skill matters",
        body: [
          spec.summary,
          `By the end of this lesson, you will ${spec.outcome.charAt(0).toLowerCase()}${spec.outcome.slice(1)}. Work through the code in order, predict what each cell will do, and then compare the result with the expected output.`,
        ],
      },
      ...(spec.guidance ?? []),
    ],
    keyIdeas: [
      spec.concept,
      "Read code from top to bottom and inspect every output.",
      "Small experiments make errors easier to understand.",
      "The starter notebook is for practice; the solution notebook is for checking your reasoning.",
    ],
    exercises: {
      conceptual: {
        prompt: `Explain ${spec.title.toLowerCase()} in your own words without using code.`,
        hint: "Describe the input, the operation, and the result.",
      },
      applied: {
        prompt: `Open the starter notebook and complete the practice task for “${spec.title}”.`,
        hint: "Run one cell at a time and compare your output with the expected result shown on this page.",
      },
      critical: {
        prompt: "Change one assumption in the example. What breaks, and how would you make the code more reliable?",
        hint: "Try a missing value, unexpected type, empty collection, or different input size.",
      },
    },
    coding: {
      objectives: spec.objectives,
      prerequisites: spec.prerequisites ?? ["No prior coding experience required"],
      outcome: spec.outcome,
      steps: spec.steps,
      resources,
      colabNotebook: `${spec.slug}-starter.ipynb`,
    },
  };
}

const learnersDataset = {
  file: "learners.csv",
  title: "Learner practice dataset",
  description: "An original compact dataset containing study time, attendance, track, and assessment scores.",
  size: "1 KB",
  attribution: "Original Field Notes teaching dataset. CC BY 4.0.",
};

const salesDataset = {
  file: "sales.csv",
  title: "Sales practice dataset",
  description: "An original order-level dataset containing dates, regions, products, quantities, and revenue.",
  size: "2 KB",
  attribution: "Original Field Notes teaching dataset. CC BY 4.0.",
};

const irisDataset = {
  file: "iris.csv",
  title: "Iris classification dataset",
  description: "A local CSV copy of the classic Iris flower classification dataset.",
  size: "5 KB",
  attribution: "R. A. Fisher's Iris dataset, public domain; local copy generated through scikit-learn.",
};

const gettingReady = [
  codingLesson(1, {
    slug: "python-in-data-science",
    title: "Python in data science",
    summary: "Understand the role Python plays between a question, a dataset, and a useful result.",
    duration: "35 min",
    concept: "Python is the glue that turns data-science reasoning into repeatable work.",
    objectives: ["Recognize the main stages of a data workflow", "Run a first Python expression", "Distinguish notebooks from production programs"],
    outcome: "run a first Python cell and explain where it fits in a data workflow",
    steps: [
      { title: "Make Python answer a question", explanation: "A Python expression evaluates to a value. Start with a calculation you can verify yourself.", code: "hours_per_day = 2\nstudy_days = 5\nhours_per_day * study_days", output: "10" },
      { title: "Label the result", explanation: "Variables give useful names to intermediate results so the reasoning remains readable.", code: "total_hours = hours_per_day * study_days\nprint(f\"Planned study time: {total_hours} hours\")", output: "Planned study time: 10 hours" },
    ],
  }),
  codingLesson(2, {
    slug: "start-with-google-colab",
    title: "Start immediately with Google Colab",
    summary: "Use a browser-based notebook to write and run Python without installing anything.",
    duration: "40 min",
    concept: "A notebook combines executable code, results, and explanation in one document.",
    objectives: ["Open a notebook in Colab", "Run and edit cells", "Restart and run all cells"],
    outcome: "complete a short notebook entirely in the browser",
    guidance: [{
      title: "A zero-install first path",
      body: [
        "Google Colab runs notebooks on Google's computers and displays the interface in your browser. Sign in with a Google account, open the starter notebook from this lesson once the public repository is configured, and choose File → Save a copy in Drive before editing.",
        "Colab sessions are temporary. Files uploaded directly to a session disappear when the runtime resets, so keep notebooks in Drive and write code that can reload its datasets from a stable URL.",
      ],
    }],
    steps: [
      { title: "Run a code cell", explanation: "Select a cell and use Shift+Enter. Colab executes it and displays the final expression.", code: "message = \"My first Colab notebook\"\nmessage", output: "'My first Colab notebook'" },
      { title: "Install only when needed", explanation: "Colab already includes common data libraries. The import confirms that pandas is ready.", code: "import pandas as pd\nprint(pd.__name__)", output: "pandas" },
    ],
  }),
  codingLesson(3, {
    slug: "install-miniconda-and-jupyter",
    title: "Install Miniconda and JupyterLab",
    summary: "Set up a consistent local Python environment on Windows, macOS, or Linux.",
    duration: "60 min",
    concept: "A dedicated environment keeps a project's Python and packages reproducible.",
    objectives: ["Install Miniconda", "Create the course environment", "Launch JupyterLab"],
    outcome: "create and launch a local course environment",
    guidance: [
      {
        title: "Choose the correct installer",
        body: [
          "On Windows, use the 64-bit graphical Miniconda installer and launch commands from Anaconda Prompt. On macOS, choose the Apple Silicon installer for M-series Macs or the Intel installer for older Macs, then use Terminal. On Linux, use the 64-bit shell installer and reopen your terminal after installation.",
          "Keep the default installation location. Windows learners should not manually add Conda to the system PATH; Anaconda Prompt configures it safely. macOS and Linux learners can run `conda init` if a newly opened terminal does not recognize the `conda` command.",
        ],
      },
      {
        title: "Verify before continuing",
        body: [
          "Run `conda --version` and `python --version` after reopening the terminal. If either command fails, restart the terminal first, then confirm that Miniconda was installed for your current operating-system user.",
          "The course environment is deliberately separate from your system Python. If Jupyter opens the wrong environment, select the `field-notes` kernel from JupyterLab's kernel menu and restart the notebook.",
        ],
      },
    ],
    steps: [
      { title: "Create the environment", explanation: "Run these commands in Anaconda Prompt on Windows or a terminal on macOS and Linux.", code: "conda create -n field-notes python=3.11 -y\nconda activate field-notes\nconda install jupyterlab numpy pandas matplotlib scikit-learn -y", output: "The field-notes environment is active." },
      { title: "Launch JupyterLab", explanation: "JupyterLab opens a local workspace in your browser. Stop it later with Ctrl+C in the terminal.", code: "jupyter lab", output: "A browser opens the JupyterLab interface." },
    ],
  }),
  codingLesson(4, {
    slug: "notebooks-environments-and-debugging",
    title: "Notebooks, environments, and debugging",
    summary: "Understand kernels, execution order, package errors, and the recovery habits that prevent confusion.",
    duration: "50 min",
    concept: "Notebook state is invisible, so reproducibility begins with restarting and running from the top.",
    objectives: ["Explain notebook state", "Read a traceback", "Diagnose common package and kernel problems"],
    outcome: "recover from common notebook failures",
    steps: [
      { title: "Read the final traceback line", explanation: "The last line usually names the error and gives the most useful clue.", code: "scores = [72, 84, 91]\nprint(score)", output: "NameError: name 'score' is not defined" },
      { title: "Make execution order visible", explanation: "Define values before using them, then restart the kernel and run all cells.", code: "score = scores[-1]\nprint(score)", output: "91" },
    ],
  }),
];

const pythonEssentials = [
  codingLesson(5, {
    slug: "variables-values-and-types",
    title: "Variables, values, and data types",
    summary: "Represent text, numbers, booleans, and missing values clearly.",
    duration: "55 min",
    concept: "A data type determines which operations make sense for a value.",
    objectives: ["Create variables", "Inspect types", "Convert compatible values"],
    outcome: "represent a small real-world record with appropriate Python types",
    steps: [
      { title: "Represent one learner", explanation: "Python uses different types for text, whole numbers, decimal values, and true/false facts.", code: "name = \"Asha\"\nlessons = 4\nscore = 88.5\ncompleted = True\nprint(type(name), type(lessons), type(score), type(completed))", output: "<class 'str'> <class 'int'> <class 'float'> <class 'bool'>" },
      { title: "Convert text safely", explanation: "Input often arrives as text. Convert it before numerical calculations.", code: "raw_hours = \"6\"\nint(raw_hours) * 2", output: "12" },
    ],
  }),
  codingLesson(6, {
    slug: "collections-for-data",
    title: "Lists, dictionaries, tuples, and sets",
    summary: "Organize related values using Python's core collection types.",
    duration: "60 min",
    concept: "Choose a collection based on whether order, labels, uniqueness, or immutability matters.",
    objectives: ["Create and index collections", "Use dictionary keys", "Remove duplicates with sets"],
    outcome: "organize a small dataset before using pandas",
    steps: [
      { title: "Store ordered values", explanation: "Lists preserve order and allow values to change.", code: "scores = [72, 84, 91]\nprint(scores[0], scores[-1])", output: "72 91" },
      { title: "Label values", explanation: "Dictionaries connect meaningful keys to values.", code: "learner = {\"name\": \"Asha\", \"score\": 91, \"track\": \"ML\"}\nlearner[\"score\"]", output: "91" },
    ],
  }),
  codingLesson(7, {
    slug: "conditions-and-loops",
    title: "Conditions and loops",
    summary: "Make decisions and repeat operations across collections.",
    duration: "65 min",
    concept: "Control flow turns individual expressions into repeatable rules.",
    objectives: ["Write conditions", "Loop through a list", "Build a result incrementally"],
    outcome: "classify a list of scores using a repeatable rule",
    steps: [
      { title: "Make one decision", explanation: "A condition selects which branch should run.", code: "score = 84\nlabel = \"pass\" if score >= 60 else \"review\"\nlabel", output: "'pass'" },
      { title: "Apply the rule repeatedly", explanation: "A loop visits every value in a collection.", code: "scores = [42, 76, 91]\nlabels = []\nfor score in scores:\n    labels.append(\"pass\" if score >= 60 else \"review\")\nlabels", output: "['review', 'pass', 'pass']" },
    ],
  }),
  codingLesson(8, {
    slug: "functions-imports-and-errors",
    title: "Functions, imports, and errors",
    summary: "Package repeated reasoning into functions and use Python libraries confidently.",
    duration: "65 min",
    concept: "Functions make assumptions explicit and let you test one piece of reasoning at a time.",
    objectives: ["Define a function", "Import a library", "Raise a useful error"],
    outcome: "write and test a reusable data-cleaning function",
    steps: [
      { title: "Define reusable behavior", explanation: "Parameters are inputs and return values are outputs.", code: "def clean_label(value):\n    return value.strip().lower()\n\nclean_label(\"  Machine Learning \")", output: "'machine learning'" },
      { title: "Reject invalid input", explanation: "A clear error is better than silently producing a misleading result.", code: "def percentage(part, total):\n    if total == 0:\n        raise ValueError(\"total must be greater than zero\")\n    return part / total * 100\n\npercentage(18, 20)", output: "90.0" },
    ],
  }),
];

const numpyLessons = [
  codingLesson(9, {
    slug: "numpy-arrays-and-shapes",
    title: "NumPy arrays and shapes",
    summary: "Represent numerical data as fast, consistent arrays.",
    duration: "60 min",
    concept: "An array's shape describes how numerical observations are organized.",
    objectives: ["Create an array", "Inspect shape and dimensions", "Select rows and columns"],
    outcome: "represent a feature matrix and inspect its structure",
    steps: [
      { title: "Create a feature matrix", explanation: "Each row is an observation and each column is a feature.", code: "import numpy as np\nfeatures = np.array([[2, 70], [5, 84], [7, 91]])\nprint(features.shape)\nprint(features[:, 1])", output: "(3, 2)\n[70 84 91]" },
      { title: "Use boolean indexing", explanation: "A boolean condition creates a mask that selects matching rows.", code: "features[features[:, 1] >= 80]", output: "[[ 5 84]\n [ 7 91]]" },
    ],
  }),
  codingLesson(10, {
    slug: "vectorized-calculations",
    title: "Vectorized calculations and statistics",
    summary: "Calculate across entire arrays without writing manual loops.",
    duration: "60 min",
    concept: "Vectorization expresses numerical intent directly and efficiently.",
    objectives: ["Apply array arithmetic", "Calculate summary statistics", "Standardize values"],
    outcome: "summarize and transform an array of measurements",
    steps: [
      { title: "Calculate across all values", explanation: "NumPy broadcasts one operation across the complete array.", code: "import numpy as np\nscores = np.array([72, 84, 91, 63])\nprint(scores.mean(), scores.min(), scores.max())", output: "77.5 63 91" },
      { title: "Standardize the values", explanation: "Center values around zero and express them in standard-deviation units.", code: "standardized = (scores - scores.mean()) / scores.std()\nstandardized.round(2)", output: "[-0.4   0.55  1.1  -1.25]" },
    ],
  }),
];

const pandasLessons = [
  codingLesson(11, {
    slug: "load-and-inspect-csv-data",
    title: "Load and inspect CSV data",
    summary: "Read a dataset into pandas and ask the first diagnostic questions.",
    duration: "65 min",
    concept: "Always inspect shape, columns, types, and missingness before analysis.",
    objectives: ["Load a CSV", "Inspect rows and columns", "Summarize data types and missing values"],
    outcome: "perform a reliable first inspection of a CSV dataset",
    dataset: learnersDataset,
    steps: [
      { title: "Load the dataset", explanation: "pandas reads a CSV into a DataFrame: a labeled table.", code: "import pandas as pd\ndf = pd.read_csv(\"learners.csv\")\nprint(df.shape)\ndf.head()", output: "(12, 7)\nFirst five learner records" },
      { title: "Inspect types and missingness", explanation: "Types reveal how pandas interpreted each column; missing counts reveal incomplete fields.", code: "print(df.dtypes)\nprint(df.isna().sum())", output: "Column types followed by missing-value counts" },
    ],
  }),
  codingLesson(12, {
    slug: "select-filter-sort-and-group",
    title: "Select, filter, sort, and group",
    summary: "Ask focused questions of a pandas DataFrame.",
    duration: "70 min",
    concept: "Most analysis is selecting the right rows, columns, and level of aggregation.",
    objectives: ["Select columns", "Filter rows", "Group and aggregate records"],
    outcome: "answer a practical question using filtering and grouping",
    dataset: salesDataset,
    steps: [
      { title: "Filter relevant records", explanation: "Boolean conditions keep only rows that satisfy the question.", code: "import pandas as pd\nsales = pd.read_csv(\"sales.csv\")\nhigh_value = sales[sales[\"revenue\"] >= 500]\nhigh_value[[\"region\", \"product\", \"revenue\"]]", output: "Orders with revenue of at least 500" },
      { title: "Aggregate by group", explanation: "groupby splits rows into groups, applies a calculation, and combines the results.", code: "sales.groupby(\"region\")[\"revenue\"].sum().sort_values(ascending=False)", output: "Revenue totals ordered by region" },
    ],
  }),
  codingLesson(13, {
    slug: "clean-missing-and-duplicate-data",
    title: "Clean missing and duplicate data",
    summary: "Detect incomplete, inconsistent, and repeated records before they distort conclusions.",
    duration: "75 min",
    concept: "Cleaning is a sequence of documented decisions, not a button that makes data correct.",
    objectives: ["Find missing values", "Remove duplicates", "Standardize text and fill values"],
    outcome: "create a documented cleaning pipeline for a small dataset",
    dataset: learnersDataset,
    steps: [
      { title: "Measure the problem", explanation: "Count missing and duplicated records before deciding how to handle them.", code: "import pandas as pd\ndf = pd.read_csv(\"learners.csv\")\nprint(df.isna().sum())\nprint(\"duplicates:\", df.duplicated().sum())", output: "Missing counts and duplicate total" },
      { title: "Apply explicit cleaning rules", explanation: "Keep each transformation readable so another person can audit the decision.", code: "clean = df.drop_duplicates().copy()\nclean[\"track\"] = clean[\"track\"].str.strip().str.title()\nclean[\"study_hours\"] = clean[\"study_hours\"].fillna(clean[\"study_hours\"].median())", output: "A cleaned DataFrame with consistent tracks and no missing study hours" },
    ],
  }),
  codingLesson(14, {
    slug: "combine-tables-and-create-features",
    title: "Combine tables and create features",
    summary: "Join related records and derive useful columns from existing data.",
    duration: "75 min",
    concept: "A useful analytical table often has to be assembled from multiple sources.",
    objectives: ["Merge tables", "Create derived columns", "Validate join results"],
    outcome: "combine related records into an analysis-ready table",
    dataset: salesDataset,
    steps: [
      { title: "Create a derived feature", explanation: "Derived columns make important relationships explicit.", code: "import pandas as pd\nsales = pd.read_csv(\"sales.csv\")\nsales[\"unit_price\"] = (sales[\"revenue\"] / sales[\"quantity\"]).round(2)\nsales[[\"product\", \"unit_price\"]].head()", output: "Products with calculated unit prices" },
      { title: "Validate the result", explanation: "Check assumptions after every transformation, especially row counts and missing values.", code: "assert len(sales) > 0\nassert sales[\"unit_price\"].notna().all()\nprint(\"validation passed\")", output: "validation passed" },
    ],
  }),
];

const visualizationLessons = [
  codingLesson(15, {
    slug: "matplotlib-fundamentals",
    title: "Matplotlib fundamentals",
    summary: "Build readable charts using explicit figures, axes, labels, and titles.",
    duration: "65 min",
    concept: "A chart is an argument about data, so every visual choice should clarify the question.",
    objectives: ["Create a figure and axes", "Draw a bar and line chart", "Add useful labels"],
    outcome: "build a labeled chart that answers one clear question",
    dataset: salesDataset,
    steps: [
      { title: "Aggregate before plotting", explanation: "Prepare the values the chart needs instead of hiding analysis inside plotting code.", code: "import pandas as pd\nimport matplotlib.pyplot as plt\nsales = pd.read_csv(\"sales.csv\")\nby_region = sales.groupby(\"region\")[\"revenue\"].sum()", output: "A Series containing revenue by region" },
      { title: "Build an explicit chart", explanation: "Using fig and ax makes later customization predictable.", code: "fig, ax = plt.subplots()\nby_region.plot.bar(ax=ax, color=\"#164bff\")\nax.set(title=\"Revenue by region\", xlabel=\"Region\", ylabel=\"Revenue\")\nplt.tight_layout()", output: "A labeled bar chart of revenue by region" },
    ],
  }),
  codingLesson(16, {
    slug: "distributions-relationships-and-honest-charts",
    title: "Distributions, relationships, and honest charts",
    summary: "Choose charts that reveal variation and avoid visual choices that mislead.",
    duration: "75 min",
    concept: "Good visualization reveals uncertainty and scale instead of decorating averages.",
    objectives: ["Plot a distribution", "Plot a relationship", "Identify misleading axes and encodings"],
    outcome: "choose and create an honest chart for a dataset",
    dataset: learnersDataset,
    steps: [
      { title: "See the distribution", explanation: "A histogram shows the shape and spread hidden by a single average.", code: "import pandas as pd\nimport matplotlib.pyplot as plt\ndf = pd.read_csv(\"learners.csv\")\nfig, ax = plt.subplots()\nax.hist(df[\"final_score\"], bins=5, color=\"#164bff\", edgecolor=\"white\")\nax.set(title=\"Distribution of final scores\", xlabel=\"Score\", ylabel=\"Learners\")", output: "A histogram of final scores" },
      { title: "Inspect a relationship", explanation: "A scatterplot helps you see association, outliers, and variation.", code: "fig, ax = plt.subplots()\nax.scatter(df[\"study_hours\"], df[\"final_score\"], color=\"#164bff\")\nax.set(title=\"Study time and final score\", xlabel=\"Study hours\", ylabel=\"Final score\")", output: "A scatterplot of study hours and scores" },
    ],
  }),
];

const projectLessons = [
  codingLesson(17, {
    slug: "frame-and-train-a-first-model",
    title: "Frame and train a first model",
    summary: "Turn the Iris dataset into a reproducible classification baseline.",
    duration: "90 min",
    concept: "A first model is a measured baseline, not a claim that the problem is solved.",
    objectives: ["Define features and target", "Split data", "Train and score a baseline classifier"],
    outcome: "train and evaluate a first scikit-learn model",
    dataset: irisDataset,
    diagram: "classification",
    steps: [
      { title: "Create the evaluation split", explanation: "Hold out examples so the final score measures unseen data.", code: "import pandas as pd\nfrom sklearn.model_selection import train_test_split\niris = pd.read_csv(\"iris.csv\")\nX = iris.drop(columns=\"species\")\ny = iris[\"species\"]\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)", output: "112 training rows and 38 test rows" },
      { title: "Train a baseline", explanation: "A logistic regression classifier provides a simple, inspectable starting point.", code: "from sklearn.linear_model import LogisticRegression\nmodel = LogisticRegression(max_iter=300)\nmodel.fit(X_train, y_train)\nround(model.score(X_test, y_test), 3)", output: "A test accuracy close to 0.9 or higher" },
    ],
  }),
  codingLesson(18, {
    slug: "evaluate-explain-and-complete-the-project",
    title: "Evaluate, explain, and complete the project",
    summary: "Inspect model mistakes and turn a notebook into a clear end-to-end analysis.",
    duration: "105 min",
    concept: "A useful project explains its question, evidence, mistakes, and limitations.",
    objectives: ["Calculate a confusion matrix", "Inspect incorrect predictions", "Communicate limitations"],
    outcome: "complete and explain an end-to-end beginner machine-learning project",
    dataset: irisDataset,
    diagram: "confusion_matrix",
    steps: [
      { title: "Inspect class-level mistakes", explanation: "A confusion matrix shows which categories the model confuses.", code: "from sklearn.metrics import ConfusionMatrixDisplay\npredictions = model.predict(X_test)\nConfusionMatrixDisplay.from_predictions(y_test, predictions)", output: "A confusion matrix for the test predictions" },
      { title: "Create an error table", explanation: "Read the individual mistakes instead of relying only on a summary score.", code: "errors = X_test.copy()\nerrors[\"actual\"] = y_test\nerrors[\"predicted\"] = predictions\nerrors[errors[\"actual\"] != errors[\"predicted\"]]", output: "Rows where predicted species differs from actual species" },
    ],
  }),
];

export const pythonFoundationsCourse: Course = {
  slug: "python-for-data-science",
  title: "Python for Data Science",
  shortTitle: "Python Foundations",
  kind: "foundation",
  status: "available",
  level: "Absolute beginner",
  duration: "16–20 hours",
  description: "Learn Python and Jupyter by inspecting data, writing small programs, building charts, and training your first model.",
  promise: "By the end, you will be able to work confidently in Colab or JupyterLab, clean and visualize tabular data, and complete a first scikit-learn project.",
  modules: [
    { number: "01", title: "Getting ready", description: "Start in Colab, then build a reliable local Jupyter environment.", lessons: gettingReady },
    { number: "02", title: "Python essentials", description: "Learn the small set of Python ideas used constantly in data work.", lessons: pythonEssentials },
    { number: "03", title: "Working with NumPy", description: "Represent and transform numerical data efficiently.", lessons: numpyLessons },
    { number: "04", title: "Working with pandas", description: "Load, inspect, clean, combine, and summarize tabular data.", lessons: pandasLessons },
    { number: "05", title: "Visualizing data", description: "Build clear charts that reveal variation and relationships.", lessons: visualizationLessons },
    { number: "06", title: "First machine-learning project", description: "Train, evaluate, and explain a complete classification baseline.", lessons: projectLessons },
  ],
};
