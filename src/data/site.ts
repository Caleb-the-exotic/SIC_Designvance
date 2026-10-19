import chassis from "@/assets/project-chassis.jpg";
import truss from "@/assets/project-truss.jpg";
import printing from "@/assets/project-printing.jpg";
import tensile from "@/assets/project-tensile.jpg";
import visitSteel from "@/assets/visit-steel-plant.jpg";
import visitCnc from "@/assets/visit-cnc.jpg";

export type TeamMember = {
  name: string;
  role: string;
  department: string;
  bio?: string;
  photo?: string;
  linkedin?: string;
};

export type Mentor = {
  name: string;
  role: string;
  department: string;
  institution: string;
  photo?: string;
  linkedin?: string;
};

export const leadership: TeamMember[] = [
  {
    name: "Mari Mathesh",
    role: "Team leader",
    department: "II - Mech",
    photo: "/Members/Mari%20Mathesh.jpeg",
    linkedin: "https://www.linkedin.com/in/mari-mathesh-g/",
  },
  {
    name: "Dharineesh",
    role: "Team Manager",
    department: "II - Mech",
    photo: "/Members/Dharineesh.jpeg",
    linkedin: "https://www.linkedin.com/in/dharineesh-k/",
  },
];

export const members: TeamMember[] = [
  {
    name: "Anandha Akshaya",
    role: "Team member",
    department: "II - Mech",
    photo: "/Members/Anandha%20Akshaya.jpeg",
    linkedin: "https://www.linkedin.com/in/anandha-akshaya/",
  },
  {
    name: "Anish Kumar",
    role: "Team member",
    department: "II - Mech (Lateral Entry)",
    photo: "/Members/Anish%20Kumar.jpeg",
  },
  {
    name: "Caleb",
    role: "Team member",
    department: "II - Mech",
    photo: "/Members/Caleb.png",
    linkedin: "https://www.linkedin.com/in/caleb-caleb-s/",
  },
  {
    name: "Monisha Devi",
    role: "Team member",
    department: "II - Mech",
    photo: "/Members/Monisha%20Devi.jpeg",
    linkedin: "https://www.linkedin.com/in/monisha-yathavan-079694300/",
  },
];

export const mentor: Mentor = {
  name: "Dr. P.T.Saravanakumar",
  role: "Mentor",
  department: "Head of Department of Mechanical Engineering",
  institution: "Sri Ramakrishna Institute of Technology",
  photo: "/Members/PTS.jpeg",
  linkedin:
    "https://www.linkedin.com/in/dr-p-t-saravanakumar-pts-m-e-phd-mba-fie-miste-27b736237/",
};

export const team: TeamMember[] = [...leadership, ...members];

export type Visit = {
  company: string;
  location: string;
  date: string;
  images: string[];
  outcomes?: string[];
  reports?: { label: string; url: string }[];
};

export const visits: Visit[] = [
  {
    company: "AIRAA Engineering works & Kiruthiga Industries",
    location: "Coimbatore, Tamil Nadu",
    date: "14-08-2026",
    images: [
      "/IV/AIRAA Engineering works & Kiruthiga Industries/1.jpeg",
      "/IV/AIRAA Engineering works & Kiruthiga Industries/2.jpeg",
      "/IV/AIRAA Engineering works & Kiruthiga Industries/3.jpeg",
    ],
    reports: [
      {
        label: "IV Report",
        url: "/IV/iv-report.pdf",
      },
    ],
    outcomes: [
      "Understanding of CNC turning and milling operations",
      "Knowledge of VMC and multi-axis machining",
      "Basic understanding of CNC programming and machine control",
      "Familiarity with FANUC and Siemens CNC systems",
      "Understanding of machining tools and tool stations",
      "Knowledge of dimensional tolerances and precision machining",
      "Practical exposure to measurement and inspection instruments",
      "Understanding of fiber laser cutting and MIG welding",
      "Knowledge of sheet-metal materials such as MS, SS, GI and aluminium",
      "Understanding of oxygen and nitrogen gas selection in laser cutting",
      "Understanding of the CAD → DXF → cutting software → G-code → machine workflow",
      "Awareness of the importance of quality control, accuracy, repeatability and productivity",
      "Ability to connect classroom concepts with real industrial manufacturing practices",
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