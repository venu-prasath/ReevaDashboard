import Link from "next/link";
import React from "react";

type ProjectCardProps = {
  ctaText: string;
  href: string;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ ctaText, href }) => {
  return (
    <Link href={href}>
      <div className="flex justify-center items-center w-72 h-36 border border-gray-400 rounded-lg bg-gray-400 text-white">
        <h3 className="text-lg font-bold text-white">{ctaText}</h3>
      </div>
    </Link>
  );
};
export default ProjectCard;
