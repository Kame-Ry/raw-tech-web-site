import frontmatter
import os
import json

stats = {
    "pages": 0,
    "posts": 0,
    "nonPosts": 0,
    "tags": set(),
    "categories": set(),
    "words": 0,
}

for root, _, files in os.walk("content"):
    for file in files:
        if not file.endswith(".md"):
            continue
        post = frontmatter.load(os.path.join(root, file))
        stats["pages"] += 1

        if post.get("type") == "post" or "/posts/" in os.path.join(root, file):
            stats["posts"] += 1
            word_count = len(post.content.split())
            stats["words"] += word_count
        else:
            stats["nonPosts"] += 1

        stats["tags"].update(post.get("tags", []))
        stats["categories"].update(post.get("categories", []))

stats["tags"] = sorted(stats["tags"])
stats["categories"] = sorted(stats["categories"])
stats["avgWords"] = round(stats["words"] / stats["posts"], 2) if stats["posts"] else 0

with open("data/site_stats.json", "w") as f:
    json.dump(stats, f, indent=2)