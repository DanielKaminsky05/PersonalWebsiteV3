import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const experienceDirectory = path.join(process.cwd(), 'content/experience');

export interface ExperienceMetadata {
  id: string;
  company: string;
  logo: string;
  color: string;
  position: string;
  dates: string;
  shortDescription: string;
}

export interface Experience extends ExperienceMetadata {
  content: string;
}

export function getAllExperiences(): ExperienceMetadata[] {
  if (!fs.existsSync(experienceDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(experienceDirectory);
  const allExperienceData = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const id = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(experienceDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        id,
        company: data.company,
        logo: data.logo,
        color: data.color,
        position: data.position,
        dates: data.dates,
        shortDescription: data.shortDescription,
      };
    });

  return allExperienceData.sort((a, b) => (parseInt(a.id) > parseInt(b.id) ? 1 : -1));
}

export function getExperienceById(id: string): Experience | null {
  try {
    const fullPath = path.join(experienceDirectory, `${id}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      id,
      company: data.company,
      logo: data.logo,
      color: data.color,
      position: data.position,
      dates: data.dates,
      shortDescription: data.shortDescription,
      content,
    };
  } catch (error) {
    return null;
  }
}
