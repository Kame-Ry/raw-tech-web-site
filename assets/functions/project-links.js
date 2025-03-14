const postFiles = [
    { file: "seaglass_project_link.html", date: "2025-03-11" },
    { file: "quotes_project_link.html", date: "2025-03-11" },
    { file: "tags_article_link.html", date: "2025-03-11" },
    { file: "contact_form_project_link.html", date: "2025-03-10" }
];

const sortedPostFiles = postFiles.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

export default sortedPostFiles;

