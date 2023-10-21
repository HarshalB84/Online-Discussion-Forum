import React from "react";

const Jumbotron = () => {
  const containerStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "50px solid #8cc665", // Light green border color
  };

  const jumbotronStyles = {
    background: "#f5f5f5",
    color: "#333",
    padding: "50px",
    fontFamily: "Arial, sans-serif",
  };

  const titleStyles = {
    fontSize: "3rem",
    marginTop: "20px",
    fontFamily: "Georgia, serif",
    textAlign: "center", // Center align the title
  };

  const leadStyles = {
    fontSize: "1.5rem",
    opacity: 0.8,
    fontFamily: "Verdana, sans-serif",
    textAlign: "center", // Center align the lead
  };

  const hrStyles = {
    marginTop: "20px",
    marginBottom: "20px",
    borderColor: "#333",
  };

  const paragraphStyles = {
    fontSize: "1rem",
    fontFamily: "Helvetica, sans-serif",
    textAlign: "center",
  };

  return (
    <div style={containerStyles}>
      <div style={jumbotronStyles}>
        <h1 style={titleStyles}>ONLINE DISCUSSION FORUM</h1>
        <p style={leadStyles}>Welcome to the Online Discussion Forum</p>

        <hr style={hrStyles} />
        <p style={paragraphStyles}>
        In our Online Discussion Forum project, we're constructing a user-friendly platform where individuals can engage in discussions.
         This project is created using MongoDB, Express.js, React, and Node.js. 
        Users will register and log in securely, access topic-based posts, interact in real time, reply,
         and utilize search and filter features which will help them to easily access any topic they are trying to find.
         With use of modern web technologies, we're trying to create an interactive space that can have meaningful discussions 
        and user collaboration with their peers and also with their teachers.          
        </p>
        <p style={paragraphStyles}>
        Online Discussion Forum emerges as a dynamic web-based application, serving as a platform for meaningful interactions among students and educators alike.
        It provides a space for users where each can engage in discussions through posts or messages, and have thoughtful exchanges. Students can communicate not only with their peers but also with teachers, creating a good learning experience.
        This is a versatile project, where users can share questions, ideas, and queries on a countless numbers of topics, be it technical subjects or more general areas of interest. The discussions are parameterized by categories, ensuring content is easily navigable and easily accessible for those in need.
        Basically, the Online Discussion Forum is a new and creative way to have helpful conversations. It's better than regular social media because it's a place where people can share what they know, talk about new ideas, and make stronger connections. This website shows how important it is to have meaningful conversations online nowadays.
        </p>
      </div>
      </div>
  );
};

export default Jumbotron;
