import fs from "fs";
import { globSync } from "glob";

// Function to generate README content
const generateReadmeContent = (documentation, lang, availableLanguages) => {
  const links = availableLanguages
    .filter((availableLang) => availableLang !== lang)
    .map((availableLang) => {
      const fileName =
        availableLang === "en" ? "README.md" : `README-${availableLang}.md`;
      return `[${availableLang.toUpperCase()}](${fileName})`;
    })
    .join(" | ");

  return `
# ${documentation.title}

${documentation.description}

${links}

## ${documentation["title0-1"]}

${documentation["description0-1"]}

${documentation["description0-2"]}

${documentation["description0-3"]}

## ${documentation.title2}

${documentation["description2-1"]}

## ${documentation.title3}

### ${documentation["description3-1"]}

\`\`\`bash
git clone https://github.com/danielpaez-dev/my-portfolio.git
\`\`\`

### ${documentation["description3-2"]}

\`\`\`bash
npm install
npm run dev
\`\`\`

${documentation["description3-3"]}

${documentation["description3-4"]}

${documentation["description3-5"]}

## ${documentation.title4}

${documentation["description4-1"]}
`;
};

// Get all JSON files in the locales directory
const localeFiles = globSync("./src/i18n/locales/*.json");

// Extract available languages
const availableLanguages = localeFiles.map(
  (filePath) => filePath.match(/([\w-]+)\.json$/)[1],
);

// Loop through each locale file and generate the README file
localeFiles.forEach((filePath) => {
  const lang = filePath.match(/([\w-]+)\.json$/)[1];
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const documentation = data.documentation;
  const readmeContent = generateReadmeContent(
    documentation,
    lang,
    availableLanguages,
  );

  const fileName = lang === "en" ? "README.md" : `README-${lang}.md`;
  fs.writeFileSync(fileName, readmeContent.trim());
  console.log(`${fileName} generated successfully`);
});
