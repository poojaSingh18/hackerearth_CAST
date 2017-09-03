import React from 'react';
import axios from 'axios';
import Avatar from 'material-ui/Avatar';
import Code from 'material-ui/svg-icons/action/code';
import Star from 'material-ui/svg-icons/toggle/star';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Company from 'material-ui/svg-icons/communication/business';
import Location from 'material-ui/svg-icons/maps/place';


export default  class UserComponent extends React.Component {
  constructor(props){
    super(props);
    this.state={
      //Initialize state to store details of user and their respective respositories
      userDetailsObject: {},
      userRepos:[],
    }

  };

  componentDidMount(){

    // AJAX/axios call to get user details object
    axios.post('/getSelectedRepoUserDetails',{user_url: this.props.user_url})
    .then((response) => {
      this.setState({
        userDetailsObject: response.data,
      }, function(){
        //AJAX/axios call to get all the respositories belonging to particular user
        axios.get(this.state.userDetailsObject.repos_url)
        .then((response) => {
          this.setState({
            userRepos : response.data,
          })
        })
        .catch((error) => {
         console.log("Error while fetching User Repositories:: ", error);
        })
      });

    })
     .catch((error) => {
       console.log("Error while fetching User details:: ", error);
     });

  }

   render() {
     var userReposArray = [];
     //push details to an array
     this.state.userRepos.forEach(function(repository, i){
       if(i%2 == 0){
         userReposArray.push(
           <div className="user_repos_array_style" key={i} >
             <div className="repository_list_div user_repository_list_div">
             <div>
                <div className="repo_name_des">
                  <h3><a>{repository.full_name}</a></h3>
                  <p>{repository.description}</p>
                </div>
                <div className="repo_lang_rating">
                  <p><Star />{repository.watchers > 999 ? (repository.watchers/1000).toFixed(1) + 'k' : repository.watchers}</p>
                </div>
                </div>
                <h5>{repository.updated_at}</h5>
              </div>
            <div className="repository_list_div  user_repository_list_div">
             <div>
               <div className="repo_name_des">
                <h3><a>{this.state.userRepos[i+1].full_name}</a></h3>
                <p>{this.state.userRepos[i+1].description}</p>
               </div>
               <div className="repo_lang_rating">
                 <p><Star />{this.state.userRepos[i+1].watchers > 999 ? (this.state.userRepos[i+1].watchers/1000).toFixed(1) + 'k' : this.state.userRepos[i+1].watchers}</p>
               </div>
               </div>
               <h5>{this.state.userRepos[i+1].updated_at}</h5>
             </div>
           </div>
        );
       }
       else{
         userReposArray.push(<br key={i+"br"} />);
       }
    }.bind(this));

      return (
         <div className="user_profile">
           <div className="user_profile_header">
             <Avatar
               src={this.state.userDetailsObject.avatar_url}
               size={150}
             />
             <h2>{this.state.userDetailsObject.name}</h2>
             {(this.state.userDetailsObject.company != null) ? <div><Company /><h4>{this.state.userDetailsObject.company}</h4></div>:null}
             {(this.state.userDetailsObject.location != null) ? <div><Location /><h5>{this.state.userDetailsObject.location}</h5></div>: null}
             <br />
             <br />
             <p>{this.state.userDetailsObject.bio}</p>
             <br />
             <RaisedButton label="Follow" primary={true} />
           </div>
           <div className="user_profile_repositories">
             {userReposArray}
           </div>
         </div>
      );
   }
}
