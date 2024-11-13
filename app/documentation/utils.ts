import fs from "fs";
import path from "path";
import Markdoc from "@markdoc/markdoc";
import yaml from "js-yaml";

type Metadata = {
  title: string;
  published: Date;
  description: string;
  image?: string;
};


// Markdoc NextJS Plugin has a lot of cool things, like built in custom nodes for Next Image, Link, etc
// but its all using the old Next Page Router instead of the App Router and the documentation is outdated
// will use as standard markdown until plugin is out of beta

export const parseMarkdocFrontmatter = (ast: any) => {
  return ast.attributes.frontmatter
    ? yaml.load(ast.attributes.frontmatter)
    : {};
};

function getMDFiles(dir: any) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".md");
}

function readMDFile(filePath: any) {
  // let rawContent = fs.readFileSync(filePath, "utf-8");
  // return parseFrontmatter(rawContent);
  return fs.readFileSync(filePath, "utf-8");
}

function getMDData(dir: any) {
  let mdxFiles = getMDFiles(dir);
  return mdxFiles.map((file) => {
    let markdownFileContent = readMDFile(path.join(dir, file));
    let slug = path.basename(file, path.extname(file));


  // parse markdown into Abstract Syntax Tree (AST)
  const ast = Markdoc.parse(markdownFileContent);

  // parse AST into render-ready content and frontmatter data
  const content = Markdoc.transform(ast);
  const metadata = parseMarkdocFrontmatter(ast);


    return {
      metadata: metadata as Metadata,
      slug,
      content,
      //content: JSON.parse(JSON.stringify(content)),
    };
  });
}

export function getMarkdoc() {
  return getMDData(path.join(process.cwd(), "app", "documentation", "markdoc"));
}

export function formatDate(date: Date, includeRelative = false) {
  let currentDate = new Date();
  //if (!date.includes("T")) {
  //  date = `${date}T00:00:00`;
  //}
  let targetDate = new Date(date);

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  let daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = "";

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`;
  } else {
    formattedDate = "Today";
  }

  let fullDate = targetDate.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (!includeRelative) {
    return fullDate;
  }

  return `${fullDate} (${formattedDate})`;
}
