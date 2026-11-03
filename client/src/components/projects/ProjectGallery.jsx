import React from 'react';
import ProjectCard from './ProjectCard';

export default function ProjectGallery({ projects = [] }) {
  if (!projects || projects.length === 0) {
    return (
      <div className="py-16 text-center border border-dashed border-border rounded-xl">
        <p className="text-secondary text-sm">No projects currently displayed.</p>
      </div>
    );
  }

  // Split projects across 3 columns on desktop for organic staggered floating
  const col1 = [];
  const col2 = [];
  const col3 = [];

  projects.forEach((proj, index) => {
    if (index % 3 === 0) col1.push({ proj, index });
    else if (index % 3 === 1) col2.push({ proj, index });
    else col3.push({ proj, index });
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
      {/* Column 1 */}
      <div className="flex flex-col gap-6 sm:gap-8">
        {col1.map(({ proj, index }) => (
          <ProjectCard key={proj.id || proj.slug} project={proj} columnOffset={0} />
        ))}
      </div>

      {/* Column 2 - slightly offset vertically on desktop */}
      <div className="flex flex-col gap-6 sm:gap-8 lg:mt-8">
        {col2.map(({ proj, index }) => (
          <ProjectCard key={proj.id || proj.slug} project={proj} columnOffset={1} />
        ))}
      </div>

      {/* Column 3 - rhythmic offset */}
      <div className="flex flex-col gap-6 sm:gap-8 lg:mt-4 md:col-span-2 lg:col-span-1">
        {col3.map(({ proj, index }) => (
          <ProjectCard key={proj.id || proj.slug} project={proj} columnOffset={2} />
        ))}
      </div>
    </div>
  );
}
