import postFiles from "/assets/functions/Project-Links.js"; 

console.log("post-entry.js loaded!");
console.log("Loaded post files:", postFiles);

document.addEventListener("DOMContentLoaded", function () {
    const cacheBuster = `?v=${new Date().getTime()}`;
    const postsPerPage = 5;
    let currentPage = 1;

    if (!postFiles || postFiles.length === 0) {
        console.error("No posts loaded! Check Project-Links.js");
        return;
    }
    
    function updatePagination() {
        const paginationContainer = document.querySelector(".pagination");
        paginationContainer.innerHTML = "";

        if (currentPage > 1) {
            const prevBtn = document.createElement("button");
            prevBtn.textContent = "← Previous";
            prevBtn.classList.add("pagination-btn");
            prevBtn.onclick = () => { currentPage--; loadPosts(currentPage); };
            paginationContainer.appendChild(prevBtn);
        }

        const totalPages = Math.ceil(postFiles.length / postsPerPage);
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement("button");
            pageBtn.textContent = i;
            pageBtn.classList.add("pagination-btn", i === currentPage ? "active" : "");
            pageBtn.onclick = () => { currentPage = i; loadPosts(currentPage); };
            paginationContainer.appendChild(pageBtn);
        }

        if (currentPage < totalPages) {
            const nextBtn = document.createElement("button");
            nextBtn.textContent = "Next →";
            nextBtn.classList.add("pagination-btn");
            nextBtn.onclick = () => { currentPage++; loadPosts(currentPage); };
            paginationContainer.appendChild(nextBtn);
        }
    }

    function loadPosts(page) {
        console.log(`Loading page ${page} with posts:`, postFiles);
        const startIndex = (page - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        const postsToShow = postFiles.slice(startIndex, endIndex);

        const container = document.querySelector(".widget-container");
        container.innerHTML = "";

        postsToShow.forEach(post => {
            const filePath = `/components/article-links/${post.file}${cacheBuster}`;
            console.log(`Fetching: ${filePath}`);

            fetch(filePath)
                .then(response => {
                    console.log(`Response for ${post.file}:`, response.status);
                    return response.ok ? response.text() : Promise.reject(`Failed to load ${post.file} (Status: ${response.status})`);
                })
                .then(data => {
                    console.log(`Successfully loaded: ${post.file}`);
                    container.insertAdjacentHTML("beforeend", data);
                })
                .catch(error => console.error(error));
        });

        updatePagination();
    }

    loadPosts(currentPage);
});
