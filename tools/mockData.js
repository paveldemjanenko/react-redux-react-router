const courses = [
  {
    id: 1,
    title: "Securing React Apps with Auth0",
    slug: "react-auth0-authentication-security",
    authorId: 1,
    category: "JavaScript"
  },
  {
    id: 2,
    title: "React: The Big Picture",
    slug: "react-big-picture",
    authorId: 1,
    category: "JavaScript"
  },
  {
    id: 3,
    title: "Creating Reusable React Components",
    slug: "react-creating-reusable-components",
    authorId: 1,
    category: "JavaScript"
  },
  {
    id: 4,
    title: "Building a JavaScript Development Environment",
    slug: "javascript-development-environment",
    authorId: 1,
    category: "JavaScript"
  },
  {
    id: 5,
    title: "Building Applications with React and Redux",
    slug: "react-redux-react-router-es6",
    authorId: 1,
    category: "JavaScript"
  },
  {
    id: 6,
    title: "Building Applications in React and Flux",
    slug: "react-flux-building-applications",
    authorId: 1,
    category: "JavaScript"
  },
  {
    id: 7,
    title: "Clean Code: Writing Code for Humans",
    slug: "writing-clean-code-humans",
    authorId: 1,
    category: "Software Practices"
  },
  {
    id: 8,
    title: "Architecting Applications for the Real World",
    slug: "architecting-applications-dotnet",
    authorId: 1,
    category: "Software Architecture"
  },
  {
    id: 9,
    title: "Becoming an Outlier: Reprogramming the Developer Mind",
    slug: "career-reboot-for-developer-mind",
    authorId: 1,
    category: "Career"
  },
  {
    id: 10,
    title: "Web Component Fundamentals",
    slug: "web-components-shadow-dom",
    authorId: 1,
    category: "HTML5"
  },
  {
    id: 11,
    title: "Test 11",
    slug: "test-11",
    authorId: 2,
    category: "JavaScript"
  },
  {
    id: 12,
    title: "Test 12",
    slug: "test-12",
    authorId: 1,
    category: "JavaScript"
  },
  {
    id: 13,
    title: "Test 13",
    slug: "test-13",
    authorId: 1,
    category: "JavaScript"
  },
  {
    id: 14,
    title: "Test 14",
    slug: "test-14",
    authorId: 1,
    category: "JavaScript"
  },
  {
    id: 15,
    title: "Test 15",
    slug: "test-15",
    authorId: 1,
    category: "JavaScript"
  },
  {
    id: 16,
    title: "Test 16",
    slug: "test-16",
    authorId: 1,
    category: "JavaScript"
  },
  {
    id: 17,
    title: "Test 17",
    slug: "test-17",
    authorId: 1,
    category: "Software Practices"
  },
  {
    id: 18,
    title: "Test 18",
    slug: "test-18",
    authorId: 1,
    category: "Software Architecture"
  },
  {
    id: 19,
    title: "Test 19",
    slug: "test-19",
    authorId: 1,
    category: "Career"
  },
  {
    id: 20,
    title: "Test 20",
    slug: "test-20",
    authorId: 1,
    category: "HTML5"
  },
  {
    id: 21,
    title: "Test 21",
    slug: "test-21",
    authorId: 1,
    category: "HTML5"
  }
];

const authors = [
  { id: 1, name: "Cory House" },
  { id: 2, name: "Scott Allen" },
  { id: 3, name: "Dan Wahlin" }
];

const newCourse = {
  id: null,
  title: "",
  authorId: null,
  category: ""
};

const newAuthor = {
  id: null,
  name: ""
};

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  newCourse,
  newAuthor,
  courses,
  authors
};
