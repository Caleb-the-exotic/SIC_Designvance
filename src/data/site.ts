import chassis from "@/assets/project-chassis.jpg";
import truss from "@/assets/project-truss.jpg";
import printing from "@/assets/project-printing.jpg";
import tensile from "@/assets/project-tensile.jpg";
import visitSteel from "@/assets/visit-steel-plant.jpg";
import visitCnc from "@/assets/visit-cnc.jpg";

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  photo?: string;
};

// Add a new member by appending an object here.
export const team: TeamMember[] = [
  {
    name: "Aarav Menon",
    role: "Wing Lead — Structural Design",
    bio: "Drives design reviews and load-path decisions across every INTEGRIS build.",
  },
  {
    name: "Ishita Rao",
    role: "Head of FEA & Simulation",
    bio: "Owns meshing strategy, convergence studies and post-processing of stress results.",
  },
  {
    name: "Karthik Nair",
    role: "Strength of Materials Lead",
    bio: "Translates beam, torsion and fatigue theory into verified hand calculations.",
  },
  {
    name: "Sneha Patil",
    role: "CAD & Prototyping Lead",
    bio: "Maintains the parametric part library and runs the additive manufacturing cell.",
  },
  {
    name: "Rohan Desai",
    role: "Materials & Testing Engineer",
    bio: "Plans tensile, hardness and impact testing to validate simulation assumptions.",
  },
  {
    name: "Meera Krishnan",
    role: "Documentation & Outreach",
    bio: "Keeps design reports, drawings and industry collaborations in order.",
  },
];

export type Visit = {
  company: string;
  location: string;
  date: string;
  image: string;
  outcomes: string[];
};

export const visits: Visit[] = [
  {
    company: "Meridian Steel Fabrication Works",
    location: "Coimbatore, Tamil Nadu",
    date: "March 2026",
    image: visitSteel,
    outcomes: [
      "Observed weld joint preparation and its effect on fatigue life",
      "Compared rolled vs. built-up sections for real load cases",
      "Studied crane girder deflection limits used on the shop floor",
    ],
  },
  {
    company: "Axion Precision Components",
    location: "Pune, Maharashtra",
    date: "November 2025",
    image: visitCnc,
    outcomes: [
      "Walked a full CNC machining line from raw billet to inspection",
      "Learned GD&T callouts that survive production tolerance stacks",
      "Saw how DFM feedback reshapes an early CAD model",
    ],
  },
];

export type Project = {
  name: string;
  category: "Structural" | "Mechanical" | "Simulation" | "Prototyping";
  status: "Completed" | "In Progress" | "Concept";
  image: string;
  description: string;
  tech: string[];
};

export const projects: Project[] = [
  {
    name: "Lattice Chassis Optimisation",
    category: "Simulation",
    status: "In Progress",
    image: chassis,
    description:
      "Topology-optimised space frame reducing mass by 18% while holding torsional stiffness targets.",
    tech: ["SolidWorks", "ANSYS Static Structural", "Topology Optimisation"],
  },
  {
    name: "Modular Cantilever Truss",
    category: "Structural",
    status: "Completed",
    image: truss,
    description:
      "Bolted modular truss designed for a 4 m clear span, verified against deflection and buckling limits.",
    tech: ["STAAD.Pro", "Euler Buckling", "Bolted Joint Design"],
  },
  {
    name: "Compact Gear Reduction Unit",
    category: "Prototyping",
    status: "Completed",
    image: printing,
    description:
      "3D printed two-stage gearbox used to validate tooth contact and housing stiffness before machining.",
    tech: ["Fusion 360", "FDM Printing", "Gear Design"],
  },
  {
    name: "Tensile Test Rig & Data Study",
    category: "Mechanical",
    status: "Concept",
    image: tensile,
    description:
      "Low-cost UTM fixture with a repeatable specimen mount, feeding stress-strain data back into FEA material models.",
    tech: ["Strength of Materials", "Instrumentation", "MATLAB"],
  },
];

export const projectCategories = [
  "All",
  "Structural",
  "Mechanical",
  "Simulation",
  "Prototyping",
] as const;