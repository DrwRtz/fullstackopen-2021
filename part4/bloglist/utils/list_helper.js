const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => 
  blogs.reduce((prevBlog, currBlog) => prevBlog + currBlog.likes, 0)

const favoriteBlog = (blogs) => {
  if (blogs.length == 0)
    return 0

  const maxLikes = blogs.reduce((prevBlog, currBlog) => 
    Math.max(prevBlog, currBlog.likes), 0)

  const target = blogs.find(el => el.likes == maxLikes)
  return { title: target.title, author: target.author, likes: target.likes }
}

const mostBlogs = (blogs) => {
  if (blogs.length == 0)
    return 0

  const authors = {}

  blogs.forEach(blog => {
    if (blog.author in authors)
      authors[blog.author] += 1
    else
      authors[blog.author] = 1
  })
  
  const valueArray = Object.values(authors)
  const maxValue = Math.max(...valueArray)

  const keyArray = Object.keys(authors)
  const targetAuthor = keyArray.find(key => authors[key] === maxValue) 

  return { author: targetAuthor, blogs: maxValue }
}

const mostLikes = (blogs) => {
  if (blogs.length == 0)
    return 0

  const authors = {}

  blogs.forEach(blog => {
    if (blog.author in authors)
      authors[blog.author] += blog.likes
    else
      authors[blog.author] = blog.likes
  })
  
  const valueArray = Object.values(authors)
  const maxValue = Math.max(...valueArray)

  const keyArray = Object.keys(authors)
  const targetAuthor = keyArray.find(key => authors[key] === maxValue) 

  return { author: targetAuthor, likes: maxValue }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}