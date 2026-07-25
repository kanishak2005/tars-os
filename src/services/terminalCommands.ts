import profile from "@/data/portfolio/profile";
import skills from "@/data/portfolio/skills";
import projects from "@/data/portfolio/projects";
import experience from "@/data/portfolio/experience";
import certifications from "@/data/portfolio/certifications";
const helpText = `Available Commands

help
about
projects
skills
experience
resume
github
contact
system
clear`;

export function executeCommand(command: string): string {
  switch (command.toLowerCase()) {
    case "help":
      return `Available Commands

help
about
projects
skills
experience
certifications
system
clear`;

    case "about":
      return `${profile.name}

${profile.role}

${profile.bio}`;

    case "projects":
      return projects
        .map(
          (p) =>
            `${p.name} [${p.status}]
Tech: ${p.tech.join(", ")}`
        )
        .join("\n\n");

    case "skills":
      return skills.join("\n");

    case "experience":
      return experience
        .map(
          (e) =>
            `${e.role}
${e.company}
${e.period}`
        )
        .join("\n\n");

    case "certifications":
      return certifications.join("\n");

    case "system":
      return `SYSTEM STATUS

AI CORE ........ ONLINE
NETWORK ........ STABLE
MISSION ........ ACTIVE`;

    default:
      return `I'm afraid I don't recognise "${command}", Commander.

Type "help" to view available commands.`;
  }
}