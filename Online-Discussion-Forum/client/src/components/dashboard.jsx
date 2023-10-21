import React, { Component } from "react";
import { Link } from "react-router-dom";
import Pagination from "./common/pagination";
import ListGroup from "./listgroup";
import Posts from "./posts";
import { paginate } from "../utils/paginate";
import { api } from "../config.js";
import http from "../services/httpService";

class Dashboard extends Component {
  state = {
    allposts: [],
    currentPage: 1,
    pageSize: 4,
    tags: [],
    selectedTag: { _id: "1", name: "All Posts" },
  };

  async componentDidMount() {
    const { data: allposts } = await http.get(api.postsEndPoint);
    const { data: tags } = await http.get(api.tagsEndPoint);

    this.setState({
      allposts: [...allposts],
      tags: [
        {
          _id: "1",
          name: "All Posts",
        },
        ...tags,
      ],
    });
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handlePostDelete = (post) => {};

  handleTagSelect = (tag) => {
    this.setState({ selectedTag: tag, currentPage: 1 });
  };

  getPosts() {
    const { allposts, selectedTag } = this.state;
    const filtered = [];
    for (let i in allposts) {
      const post = allposts[i];
      const { tags } = post;
      for (let j in tags) {
        if (tags[j].name === selectedTag.name) {
          filtered.push(post);
          break;
        }
      }
    }
    return filtered;
  }

  render() {
    const { user } = this.props;
    const { allposts, pageSize, currentPage, tags, selectedTag } = this.state;
    const filtered = selectedTag._id === "1" ? allposts : this.getPosts();
    const posts = paginate(filtered, currentPage, pageSize);

    if (allposts.length === 0)
      return <p>There are no posts in the database!</p>;

    const containerStyles = {
      border: "25px solid #75c9b7",
      padding: "40px",
      borderRadius: "10px",
      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
      background: "#f9f9f9",
    };

    const buttonStyles = {
      marginBottom: "30px",
    };

    return (
      <React.Fragment>
        <div className="container" style={containerStyles}>
          <div className="row">
            <div className="col">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">Dashboard</h2>
                {user && (
                  <Link to="/new-post">
                    <button
                      type="button"
                      className="btn btn-success"
                      style={buttonStyles}
                    >
                      New Post
                    </button>
                  </Link>
                )}
              </div>
              <hr className="my-2" />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-9">
              <Posts posts={posts} onDelete={this.handlePostDelete} />
            </div>
            <div className="col-lg-3">
              <ListGroup
                items={tags}
                selectedTag={this.state.selectedTag}
                onTagSelect={this.handleTagSelect}
              />
            </div>
          </div>
          <Pagination
            itemCount={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;
