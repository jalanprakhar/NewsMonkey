import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pagesize: 9,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pagesize: PropTypes.number,
  };

  nopage = 0;
  articles = [];
  CapitlizeString = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };
  constructor(props) {
    super(props);
    // console.log(this.props.pagesize);/
    // console.log("Hello");
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
    };
    document.title = `${this.CapitlizeString(this.props.category)}-NewsMonkey`;
  }
  async updateNews(pageno) {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d49f24eae10f43af9e51aeed0919cf5e&page=${pageno}&pagesize=${this.props.pagesize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedata = await data.json();
    this.setState({
      page: pageno,
      articles: parsedata.articles,
      loading: false,
    });
  }
  async componentDidMount() {
    let no = 0;
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d49f24eae10f43af9e51aeed0919cf5e&page=1&pagesize=${this.props.pagesize}`;
    let data = await fetch(url);
    let parsedata = await data.json();
    // console.log(parsedata);
    this.setState({ articles: parsedata.articles });
    no = parsedata.totalResults;
    // console.log(no);
    this.nopage = Math.ceil(no / this.props.pagesize);
    // console.log(this.state.page);
    // console.log(this.nopage);
  }
  handlePrev = async () => {
    // console.log("Previous");
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d49f24eae10f43af9e51aeed0919cf5e&page=${
    //   this.state.page - 1
    // }&pagesize=${this.props.pagesize}`;
    // this.setState({loading:true});
    // let data = await fetch(url);
    // let parsedata = await data.json();
    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedata.articles,
    //   loading:false
    // });
    this.updateNews(this.state.page - 1);
  };
  handleNext = async () => {
    // console.log("Next");
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d49f24eae10f43af9e51aeed0919cf5e&page=${
    //   this.state.page + 1
    // }&pagesize=${this.props.pagesize}`;
    // this.setState({loading:true});
    // let data = await fetch(url);
    // let parsedata = await data.json();
    // this.setState({
    //   page: this.state.page + 1,
    //   articles: parsedata.articles,
    //   loading:false
    // });
    this.updateNews(this.state.page + 1);
  };
  render() {
    return (
      <div className="container">
        <h1 className="text-center" style={{margin:'35px 0px',marginTop:'90px'}}>NewsMonkey - Top {this.CapitlizeString(this.props.category)} Headlines</h1>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <>
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <Newsitem
                      title={element.title ? element.title : ""}
                      description={
                        element.description ? element.description : ""
                      }
                      imgurl={element.urlToImage}
                      newsurl={element.url}
                      author={element.author ? element.author : "Anonymous"}
                      date={element.publishedAt}
                      sc={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
            <div className="container d-flex justify-content-between my-3">
              <button
                disabled={this.state.page <= 1}
                type="button"
                className="btn btn-dark"
                onClick={this.handlePrev}
              >
                &larr; Previous
              </button>
              {/* console.log(this.state.page); */}
              {/* console.log(this.nopage); */}
              <button
                disabled={this.state.page === this.nopage}
                type="button"
                className="btn btn-dark"
                onClick={this.handleNext}
              >
                Next &rarr;
              </button>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default News;
