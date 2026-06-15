import type { DiagramType } from "@/lib/course-data";

export function ConceptDiagram({ type, label = "FIG_001" }: { type: DiagramType; label?: string }) {
  return (
    <figure className="concept-diagram technical-figure">
      <span className="figure-label top-left">{label}</span>
      <span className="figure-label top-right">[ MODEL VIEW ]</span>
      {type === "regression" && <RegressionDiagram />}
      {type === "classification" && <ClassificationDiagram />}
      {type === "gradient" && <GradientDiagram />}
      {type === "tree" && <TreeDiagram />}
      {type === "pipeline" && <PipelineDiagram />}
      {type === "cluster" && <ClusterDiagram />}
      {type === "reduction" && <ReductionDiagram />}
      {type === "flowchart" && <FlowchartDiagram />}
      {type === "bias" && <BiasDiagram />}
      {type === "confusion_matrix" && <ConfusionMatrixDiagram />}
      {type === "drift" && <DriftDiagram />}
    </figure>
  );
}

function RegressionDiagram() {
  const points = [[80, 340], [145, 310], [190, 285], [260, 300], [315, 235], [380, 220], [440, 175], [505, 190], [570, 125], [640, 100]];
  return (
    <svg viewBox="0 0 720 430" aria-label="Regression line through data points">
      <path className="axis" d="M55 35 V375 H680" />
      <path className="model-line" d="M75 345 L650 80" />
      {points.map(([x, y], index) => <circle key={index} cx={x} cy={y} r="7" className="data-point" />)}
    </svg>
  );
}

function ClassificationDiagram() {
  const left = [[100, 110], [160, 160], [105, 245], [210, 260], [260, 185], [175, 320]];
  const right = [[430, 95], [520, 135], [590, 210], [460, 245], [550, 310], [635, 285]];
  return (
    <svg viewBox="0 0 720 430" aria-label="Classification boundary">
      <path className="boundary" d="M330 35 C410 125 285 270 380 395" />
      {left.map(([x, y], index) => <circle key={`l-${index}`} cx={x} cy={y} r="12" className="class-a" />)}
      {right.map(([x, y], index) => <rect key={`r-${index}`} x={x - 10} y={y - 10} width="20" height="20" className="class-b" />)}
    </svg>
  );
}

function GradientDiagram() {
  return (
    <svg viewBox="0 0 720 430" aria-label="Gradient descent contour plot">
      {[70, 120, 175, 235].map((rx, index) => <ellipse key={rx} cx="370" cy="220" rx={rx} ry={rx * 0.62} className="contour" />)}
      <path className="descent-line" d="M135 90 L215 130 L275 180 L325 205 L365 220" />
      {[135, 215, 275, 325, 365].map((x, index) => <circle key={x} cx={x} cy={[90, 130, 180, 205, 220][index]} r="6" className="data-point" />)}
    </svg>
  );
}

function TreeDiagram() {
  return (
    <svg viewBox="0 0 720 430" aria-label="Decision tree">
      <g className="tree-lines"><path d="M360 85 L210 190 M360 85 L510 190 M210 190 L120 320 M210 190 L285 320 M510 190 L440 320 M510 190 L600 320" /></g>
      {[[360, 85], [210, 190], [510, 190]].map(([x, y]) => <rect key={`${x}-${y}`} x={x - 55} y={y - 25} width="110" height="50" className="tree-node" />)}
      {[[120, 320], [285, 320], [440, 320], [600, 320]].map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="24" className="tree-leaf" />)}
    </svg>
  );
}

function PipelineDiagram() {
  const labels = ["RAW", "CLEAN", "FEATURE", "MODEL", "DECIDE"];
  return (
    <svg viewBox="0 0 720 430" aria-label="Machine learning pipeline">
      <path className="pipeline-line" d="M95 220 H625" />
      {labels.map((item, index) => {
        const x = 95 + index * 132.5;
        return <g key={item}><circle cx={x} cy="220" r="34" className="pipeline-node" /><text x={x} y="225">{item}</text></g>;
      })}
    </svg>
  );
}

function ClusterDiagram() {
  const clusterA = [
    [180, 120], [240, 110], [190, 170], [250, 160], [210, 130], [230, 180]
  ];
  const clusterB = [
    [460, 130], [520, 120], [480, 180], [530, 170], [510, 140], [470, 200]
  ];
  const clusterC = [
    [320, 280], [380, 290], [340, 340], [390, 330], [360, 300], [330, 310]
  ];
  
  return (
    <svg viewBox="0 0 720 430" aria-label="Clustering diagram showing three groups and centroids">
      {clusterA.map(([x, y], i) => (
        <circle key={`a-${i}`} cx={x} cy={y} r="8" className="class-a" />
      ))}
      <path className="descent-line" d="M210 150 H230 M220 140 V160" strokeWidth="2.5" />
      <circle cx="220" cy="150" r="12" fill="none" stroke="var(--blue)" strokeWidth="1.5" strokeDasharray="3 3" />

      {clusterB.map(([x, y], i) => (
        <rect key={`b-${i}`} x={x - 8} y={y - 8} width="16" height="16" className="class-b" />
      ))}
      <path className="descent-line" d="M490 160 H510 M500 150 V170" strokeWidth="2.5" />
      <circle cx="500" cy="160" r="12" fill="none" stroke="var(--blue)" strokeWidth="1.5" strokeDasharray="3 3" />

      {clusterC.map(([x, y], i) => (
        <polygon key={`c-${i}`} points={`${x},${y-9} ${x-8},${y+7} ${x+8},${y+7}`} className="class-c" fill="var(--paper)" stroke="var(--blue)" strokeWidth="2" />
      ))}
      <path className="descent-line" d="M350 310 H370 M360 300 V320" strokeWidth="2.5" />
      <circle cx="360" cy="310" r="12" fill="none" stroke="var(--blue)" strokeWidth="1.5" strokeDasharray="3 3" />

      <text x="220" y="210">Centroid A</text>
      <text x="500" y="230">Centroid B</text>
      <text x="360" y="375">Centroid C</text>
    </svg>
  );
}

function ReductionDiagram() {
  const planePoints = [
    { x3d: 220, y3d: 140, xp: 250, yp: 190 },
    { x3d: 460, y3d: 90, xp: 420, yp: 160 },
    { x3d: 310, y3d: 280, xp: 330, yp: 240 },
    { x3d: 550, y3d: 270, xp: 490, yp: 220 }
  ];

  return (
    <svg viewBox="0 0 720 430" aria-label="Dimensionality reduction showing projection onto a 2D plane">
      <path className="axis" d="M80 350 L200 350 M80 350 L80 230 M80 350 L140 290" />
      <text x="215" y="354">X</text>
      <text x="80" y="215">Z</text>
      <text x="150" y="285">Y</text>

      <polygon points="180,260 520,120 580,220 240,360" fill="var(--blue-light)" opacity="0.3" stroke="var(--blue)" strokeWidth="1.5" strokeDasharray="5 5" />
      <text x="380" y="325" fill="var(--blue)" opacity="0.6">[ 2D PROJECTION PLANE ]</text>

      {planePoints.map((p, i) => (
        <path key={`line-${i}`} d={`M${p.x3d} ${p.y3d} L${p.xp} ${p.yp}`} stroke="var(--blue)" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.7" />
      ))}

      {planePoints.map((p, i) => (
        <circle key={`pt3d-${i}`} cx={p.x3d} cy={p.y3d} r="7" fill="var(--paper)" stroke="var(--blue)" strokeWidth="2" />
      ))}

      {planePoints.map((p, i) => (
        <circle key={`pt2d-${i}`} cx={p.xp} cy={p.yp} r="5" fill="var(--blue)" />
      ))}
      
      <text x="220" y="100">Original 3D Data</text>
      <text x="560" y="180">2D Projection</text>
    </svg>
  );
}

function FlowchartDiagram() {
  return (
    <svg viewBox="0 0 720 430" aria-label="Machine learning algorithm selection flowchart">
      <rect x="280" y="40" width="160" height="50" className="tree-node" rx="5" />
      <text x="360" y="70">DO YOU HAVE LABELS?</text>

      <path className="pipeline-line" d="M280 65 H170 V150" />
      <path className="pipeline-line" d="M440 65 H550 V150" />
      <text x="210" y="60">YES (Supervised)</text>
      <text x="500" y="60">NO (Unsupervised)</text>

      <rect x="90" y="150" width="160" height="50" className="tree-node" rx="5" />
      <text x="170" y="180">LABEL TYPE?</text>

      <rect x="470" y="150" width="160" height="50" className="tree-node" rx="5" />
      <text x="550" y="180">GOAL?</text>

      <path className="pipeline-line" d="M90 175 H40 V260" />
      <path className="pipeline-line" d="M250 175 H300 V260" />
      <text x="50" y="170">Discrete</text>
      <text x="290" y="170">Continuous</text>

      <path className="pipeline-line" d="M470 175 H420 V260" />
      <path className="pipeline-line" d="M630 175 H680 V260" />
      <text x="430" y="170">Group</text>
      <text x="670" y="170">Simplify</text>

      <circle cx="40" cy="285" r="25" className="tree-leaf" />
      <text x="40" y="289">CLASSIFY</text>

      <circle cx="300" cy="285" r="25" className="tree-leaf" />
      <text x="300" y="289">REGRESS</text>

      <circle cx="420" cy="285" r="25" className="tree-leaf" />
      <text x="420" y="289">CLUSTER</text>

      <circle cx="680" cy="285" r="25" className="tree-leaf" />
      <text x="680" y="289">REDUCE</text>

      <text x="170" y="370" fill="var(--muted)" fontStyle="italic">Supervised Learning</text>
      <text x="550" y="370" fill="var(--muted)" fontStyle="italic">Unsupervised Learning</text>
    </svg>
  );
}

function BiasDiagram() {
  return (
    <svg viewBox="0 0 720 430" aria-label="Bias-Variance Tradeoff diagram">
      <path className="axis" d="M80 40 V370 H660" />
      <text x="370" y="405">MODEL COMPLEXITY (Capacity)</text>
      <text x="50" y="200" transform="rotate(-90 50 200)">ERROR</text>

      <path d="M100 80 Q 220 280, 620 330" fill="none" stroke="var(--blue)" strokeWidth="1.5" strokeDasharray="4 4" />
      <text x="600" y="315" fill="var(--blue)">Training Error</text>

      <path d="M100 120 Q 350 400, 620 100" fill="none" stroke="var(--blue)" strokeWidth="2.5" />
      <text x="590" y="80" fill="var(--blue)">Validation Error</text>

      <path d="M330 40 V370" stroke="var(--blue)" strokeWidth="1" strokeDasharray="3 3" />
      <circle cx="330" cy="217" r="6" fill="var(--blue)" />
      
      <text x="330" y="30" fill="var(--blue)">SWEET SPOT</text>
      <text x="180" y="340" fill="var(--muted)">Underfitting</text>
      <text x="490" y="340" fill="var(--muted)">Overfitting</text>
      <text x="180" y="358" fill="var(--muted)" fontSize="9px">(High Bias)</text>
      <text x="490" y="358" fill="var(--muted)" fontSize="9px">(High Variance)</text>
    </svg>
  );
}

function ConfusionMatrixDiagram() {
  return (
    <svg viewBox="0 0 720 430" aria-label="Confusion Matrix 2x2 grid">
      <text x="375" y="30" fontWeight="bold">PREDICTED CLASS</text>
      <text x="30" y="225" transform="rotate(-90 30 225)" fontWeight="bold">ACTUAL CLASS</text>

      <text x="260" y="70">Predicted Positive</text>
      <text x="490" y="70">Predicted Negative</text>

      <text x="110" y="165" textAnchor="end">Actual Positive</text>
      <text x="110" y="285" textAnchor="end">Actual Negative</text>

      <rect x="150" y="90" width="220" height="110" className="tree-node" fill="var(--blue-light)" />
      <text x="260" y="135" fontWeight="bold">TRUE POSITIVE (TP)</text>
      <text x="260" y="160" fill="var(--muted)">Hit / Correct Detection</text>

      <rect x="380" y="90" width="220" height="110" className="tree-node" strokeDasharray="4 4" />
      <text x="490" y="135" fontWeight="bold">FALSE NEGATIVE (FN)</text>
      <text x="490" y="160" fill="var(--blue)">Miss / Type II Error</text>

      <rect x="150" y="210" width="220" height="110" className="tree-node" strokeDasharray="4 4" />
      <text x="260" y="255" fontWeight="bold">FALSE POSITIVE (FP)</text>
      <text x="260" y="280" fill="var(--blue)">False Alarm / Type I Error</text>

      <rect x="380" y="210" width="220" height="110" className="tree-node" fill="var(--blue-light)" />
      <text x="490" y="255" fontWeight="bold">TRUE NEGATIVE (TN)</text>
      <text x="490" y="280" fill="var(--muted)">Correct Rejection</text>

      <text x="260" y="365" fontSize="10px" fill="var(--muted)">Precision = TP / (TP + FP)</text>
      <text x="490" y="365" fontSize="10px" fill="var(--muted)">Recall = TP / (TP + FN)</text>
      <text x="375" y="395" fontSize="11px" fontWeight="bold">Accuracy = (TP + TN) / Total</text>
    </svg>
  );
}

function DriftDiagram() {
  return (
    <svg viewBox="0 0 720 430" aria-label="Dataset Drift curves">
      <path className="axis" d="M80 40 V370 H660" />
      <text x="370" y="405">FEATURE VALUE</text>
      <text x="50" y="200" transform="rotate(-90 50 200)">PROBABILITY DENSITY</text>

      <path d="M100 370 C 180 370, 200 100, 260 100 C 320 100, 340 370, 420 370" fill="var(--blue-light)" opacity="0.3" stroke="var(--blue)" strokeWidth="2" />
      <circle cx="260" cy="100" r="4" fill="var(--blue)" />
      <text x="260" y="80" fill="var(--blue)">Training Data P(X)</text>

      <path d="M300 370 C 380 370, 400 140, 460 140 C 520 140, 540 370, 620 370" fill="none" stroke="var(--blue)" strokeWidth="2.5" strokeDasharray="6 4" />
      <circle cx="460" cy="140" r="4" fill="var(--blue)" />
      <text x="480" y="120" fill="var(--blue)">Production Data P'(X)</text>

      <path d="M275 100 H445" stroke="var(--blue)" strokeWidth="2.5" />
      <path d="M435 95 L445 100 L435 105 Z" fill="var(--blue)" />
      <text x="360" y="88" fontWeight="bold">DATASET DRIFT</text>
      <text x="360" y="125" fill="var(--muted)" fontSize="10px">(Covariate Shift over time)</text>
    </svg>
  );
}
