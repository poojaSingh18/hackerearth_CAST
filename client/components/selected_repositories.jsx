import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Search from 'material-ui/svg-icons/action/search';
import Code from 'material-ui/svg-icons/action/code';
import Star from 'material-ui/svg-icons/toggle/star';
import FlatButton from 'material-ui/FlatButton';


 export default class RepositoriesComponent extends React.Component {
   constructor(props){
     super(props);
     this.state={
       //Initialize state for repositories
       repositories: {},
     }
     this.handleRepoSelect = this.handleRepoSelect.bind(this);
     this.handlePagination = this.handlePagination.bind(this);
     this.handleSearch = this.handleSearch.bind(this);
   };

   componentDidMount(){

     //get all repositories under selected language
     axios.post('/getSelectedLanguageRepositories',{selectedLanguage: this.props.selectedLanguage,page:1})
     .then((response) => {
       console.log(response.data);
       this.setState({
         repositories: response.data.repositories,
         selectedRepoTotalCount: response.data.total_count,
       });
     })
      .catch((error) => {
        console.log("Error while fetching Repositories:: ", error);
      });

   }

   handleRepoSelect(user_url){
     //handle when a repository is selected, it will get the url of the owner
     this.props.onRepoSelect(user_url);
   }

   handlePagination(page){
     //get respective respositories under Pagination
     //it will get next nine respositories and total count of the respositories under selected language
     axios.post('/getSelectedLanguageRepositories',{selectedLanguage: this.props.selectedLanguage,page:page})
     .then((response) => {
       console.log(response.data);
       this.setState({
         repositories: response.data.repositories,
         selectedRepoTotalCount: response.data.total_count,
       });
     })
      .catch((error) => {
        console.log("Error while fetching Repositories:: ", error);
      });
   }

// function to handle search.
//after search click it will search respositories base on full_name
  handleSearch(){
  var searchInput = this.refs.searchInput.value;
  var resultRepoList = [];
  console.log("searchInput value is", searchInput);
  this.state.repositories.forEach(function(repo, i){
    if(repo.full_name == searchInput){
      resultRepoList.push(repo);
    }
    if(i == this.state.repositories.length-1){
      this.setState({
        repositories: resultRepoList,
        selectedRepoTotalCount: resultRepoList.length,
      })
    }
  }.bind(this))
  }

   render() {
     var repoList = [];
     if(Object.keys(this.state.repositories).length != 0){
       this.state.repositories.forEach(function(repository, i){

         //code to format the update timestamp to human readable date
        var formattedDate = new Date(repository.updated_at);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = formattedDate.getFullYear();
        var month = months[formattedDate.getMonth()];
        var date = formattedDate.getDate();
        var hour = formattedDate.getHours();
        var min = formattedDate.getMinutes();
        var sec = formattedDate.getSeconds();
        var formattedDate = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;

        //push to of each repo into an array
         repoList.push(
           <div key={i} className="repository_list_div">
             <div>
             <div className="repo_name_des">
             <h3><a onClick={this.handleRepoSelect.bind(this, repository.owner.url)}>{repository.full_name}</a></h3>
              <p>{repository.description}</p>
             </div>
               <div className="repo_lang_rating">
                 {(repository.language != null) ? <p><Code />{repository.language}</p> : <p></p>}
                 <p><Star />{repository.watchers > 999 ? (repository.watchers/1000).toFixed(1) + 'k' : repository.watchers}</p>
               </div>
             </div>

             <h5> Updated on <span style={{textDecoration: 'underline'}}>{formattedDate}</span></h5>
           </div>
         );
       }.bind(this));
     }
      return (
         <div>
          <div className="repo_header">
           <div>
            <h2>{(this.props.selectedLanguage).charAt(0).toUpperCase() + this.props.selectedLanguage.substring(1)}</h2>
            {(repoList.length != 0) ? <h5><pre>{this.state.selectedRepoTotalCount} repositories found</pre></h5> : null}
            </div>
            <div className="search">
               <input type="text" className="searchTerm" ref="searchInput" placeholder="search respositories" />
               <button type="submit" className="searchButton" onClick={this.handleSearch}>
                <Search />
              </button>
            </div>
          </div>

            {(repoList.length != 0) ? repoList : <span>..loading</span>}
            <div style={{textAlign: "right"}}>
            { (repoList.length != 0) ?
              <div className="pagination">
                <div><a onClick={this.handlePagination.bind(this, 1)}>1</a></div>
                <div><a onClick={this.handlePagination.bind(this, 2)}>2</a></div>
                <div><a onClick={this.handlePagination.bind(this, 3)}>3</a></div>
                <div><a onClick={this.handlePagination.bind(this, 4)}>4</a></div>
              </div> : null
            }
            </div>
         </div>
      )
   }
}
