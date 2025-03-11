document.addEventListener("DOMContentLoaded", function () {
    const cacheBuster = `?v=${new Date().getTime()}`;
  
    const postFiles = [
      { file: "seaglass_project_lnk.html", date: "2025-03-11" },
      { file: "contact_form_project_lnk.html", date: "2025-03-10" }
    ];
  
    const postsPerPage = 5;
    let currentPage = 1;
  
    postFiles.sort((a, b) => new Date(b.date) - new Date(a.date));
  
    function loadPosts(page) {
      const startIndex = (page - 1) * postsPerPage;
      const endIndex = startIndex + postsPerPage;
      const postsToShow = postFiles.slice(startIndex, endIndex);
  
      const container = document.querySelector(".widget-container");
      container.innerHTML = "";
  
      postsToShow.forEach(post => {
        fetch(`/components/${post.file}${cacheBuster}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(`Failed to load ${post.file}: ${response.statusText}`);
            }
            return response.text();
          })
          .then(data => {
            container.insertAdjacentHTML("beforeend", data);
          })
          .catch(error => console.error(error));
      });
  
      updatePagination();
    }
  
    function updatePagination() {
      const paginationContainer = document.querySelector(".pagination");
      paginationContainer.innerHTML = "";
  
      if (currentPage > 1) {
        const prevBtn = document.createElement("button");
        prevBtn.textContent = "← Previous";
        prevBtn.classList.add("pagination-btn");
        prevBtn.onclick = () => {
          currentPage--;
          loadPosts(currentPage);
        };
        paginationContainer.appendChild(prevBtn);
      }
  
      const totalPages = Math.ceil(postFiles.length / postsPerPage);
      for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement("button");
        pageBtn.textContent = i;
        pageBtn.classList.add("pagination-btn");
        if (i === currentPage) {
          pageBtn.classList.add("active");
        }
        pageBtn.onclick = () => {
          currentPage = i;
          loadPosts(currentPage);
        };
        paginationContainer.appendChild(pageBtn);
      }
  
      if (currentPage < totalPages) {
        const nextBtn = document.createElement("button");
        nextBtn.textContent = "Next →";
        nextBtn.classList.add("pagination-btn");
        nextBtn.onclick = () => {
          currentPage++;
          loadPosts(currentPage);
        };
        paginationContainer.appendChild(nextBtn);
      }
    }
  
    loadPosts(currentPage);
  });
  