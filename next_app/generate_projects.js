/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const projectsDir = '/Users/ahmadabdullah/Downloads/techmatic_pro/next_app/public/assets/projects';
const projects = [];

// Helper to get all files in a directory
function getFiles(dir) {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir).filter(file => !file.startsWith('.'));
}

// Map folder names to potential titles/categories if possible
const titleMap = {
    'project 8': { title: 'AI DASHBOARD', category: 'AI / DASHBOARD', desc: 'Advanced AI analytics dashboard.' },
    'project 11': { title: 'WORDPRESS SITE', category: 'WEB DEVELOPMENT', desc: 'Custom WordPress solution.' },
    // Add more if I can guess
};

try {
    const folders = fs.readdirSync(projectsDir).filter(f => f.startsWith('project '));

    // Sort logically: project 1, project 2... not project 1, project 10
    folders.sort((a, b) => {
        const numA = parseInt(a.replace('project ', ''));
        const numB = parseInt(b.replace('project ', ''));
        return numA - numB;
    });

    let idCounter = 10; // Start from 10 to avoid conflict with existing

    folders.forEach(folder => {
        const folderPath = path.join(projectsDir, folder);
        const files = getFiles(folderPath);

        if (files.length === 0) return;

        const info = titleMap[folder] || {
            title: `PROJECT ${folder.replace('project ', '')}`,
            category: 'WEB DEVELOPMENT',
            desc: `Showcase of Project ${folder.replace('project ', '')}, featuring responsive design and modern web technologies.`
        };

        // Use the first image as main, all as gallery
        const mainImage = `/assets/projects/${folder}/${files[0]}`;
        const gallery = files.map(f => `/assets/projects/${folder}/${f}`);

        projects.push({
            id: idCounter++,
            title: info.title,
            category: info.category,
            image: mainImage,
            height: "h-[500px]", // Default height
            description: info.desc,
            gallery: gallery
        });
    });

    console.log(JSON.stringify(projects, null, 2));

} catch (e) {
    console.error(e);
}
