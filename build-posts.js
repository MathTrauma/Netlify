const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const postsDir = './posts';
const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

const posts = files.map(filename => {
  const filePath = path.join(postsDir, filename);
  const content = fs.readFileSync(filePath, 'utf8');
  const parsed = matter(content);

  return {
    title: parsed.data.title,
    date: parsed.data.date,
    slug: filename.replace('.md', '')
  };
});

fs.writeFileSync(
  './posts/index.json',
  JSON.stringify(posts, null, 2),
  'utf8'
);

console.log("posts/index.json generated");
