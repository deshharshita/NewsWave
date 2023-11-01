import { useEffect, useState } from "react";
import  NewsItem from "./NewsItem";
import  Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=>{
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    

   const updateNews =  async()=>{
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
       setLoading(true);
        props.setProgress(30);
        let data = await fetch(url);
        props.setProgress(50);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
    }

    useEffect(()=>{
        updateNews();

    },[])

   
    const fetchMoreData = ()=>{
        setPage(page+1);
    }

    const fetchData = async()=>{
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
        setLoading(false);
    }

    useEffect(()=>{
        fetchData();
    },[page])
    
        return(
            <>
                <h1 className="text-center" style={{marginTop: "90px"}}>NewsWave - Top Headlines</h1>
                <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles!==totalResults}
          loader={<Spinner/>}
        >
            <div className="container">
            <div className="row">
                    {articles.map((element)=>{
                        return(
                            <div key={element.url} className="col-md-4">
                            <NewsItem  title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage?element.urlToImage:"https://yt3.googleusercontent.com/5zuagxNY_4wiHVLoQSC0wWCud4NhFHQP2GrJJI5_pUhEX_tuPc-BC2KEfBryFAxrdhpaHwbs=s900-c-k-c0x00ffffff-no-rj"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                            </div>

                        )
                       
                    })}
                </div>
            </div>
                
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
            <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
            <button type="button" disabled={this.state.nextDisabled} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
            </div> */}

            </>
           
            
            
        )
    
}

 News.defaultProps = {
    pageSize: 12,
    country: "in",
    category: "general"
  }

News.propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string

  }

  export default News;