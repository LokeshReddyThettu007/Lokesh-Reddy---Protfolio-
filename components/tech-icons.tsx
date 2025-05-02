import {
  SiPython,
  SiCplusplus,
  SiC,
  SiHtml5,
  SiCss3,
  SiFlutter,
  SiDart,
  SiMysql,
  SiTableau,
  SiFirebase,
  SiGooglecloud,
} from "react-icons/si"
import { DiJava } from "react-icons/di"
import { BsLightningChargeFill } from "react-icons/bs"
import { FaPeopleGroup, FaChartLine, FaArrowsRotate } from "react-icons/fa6"

export const techIcons = {
  // Languages
  Python: <SiPython className="h-5 w-5" />,
  "C++": <SiCplusplus className="h-5 w-5" />,
  C: <SiC className="h-5 w-5" />,
  Java: <DiJava className="h-5 w-5" />, // Using DiJava instead of SiJava

  // Frameworks
  HTML: <SiHtml5 className="h-5 w-5" />,
  CSS: <SiCss3 className="h-5 w-5" />,
  Flutter: <SiFlutter className="h-5 w-5" />,
  Dart: <SiDart className="h-5 w-5" />,

  // Tools
  SQL: <SiMysql className="h-5 w-5" />,
  Tableau: <SiTableau className="h-5 w-5" />,
  Firebase: <SiFirebase className="h-5 w-5" />,
  "Google Cloud": <SiGooglecloud className="h-5 w-5" />,

  // Soft skills
  "Problem-Solving": <BsLightningChargeFill className="h-5 w-5" />,
  "Team Player": <FaPeopleGroup className="h-5 w-5" />,
  "Project Management": <FaChartLine className="h-5 w-5" />,
  Adaptability: <FaArrowsRotate className="h-5 w-5" />,
}
