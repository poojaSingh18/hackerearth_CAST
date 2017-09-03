import React from 'react';
import axios from 'axios';
import Repositories from 'material-ui/svg-icons/device/storage';
import RepositoriesComponent from './selected_repositories.jsx';
import UserComponent from './selected_repository_user.jsx';


export default class Content extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                //Initialize states to show language menu initial load
                languagePage: true,
                repoPage: false,
                userPage: false,
                //Initialize allLanguage array to show all languages menu
                allLanguages: [{
                        language: "Javascript",
                        languageIconSrc: "../images/languages_logo/javascript_logo.png",
                        repoCount: 0
                    },
                    {
                        language: "Java",
                        languageIconSrc: "../images/languages_logo/java_logo.png",
                        repoCount: 0
                    },
                    {
                        language: "Python",
                        languageIconSrc: "../images/languages_logo/python_logo.png",
                        repoCount: 0
                    },
                    {
                        language: "Php",
                        languageIconSrc: "../images/languages_logo/php_logo.png",
                        repoCount: 0
                    },
                    {
                        language: "Ruby",
                        languageIconSrc: "../images/languages_logo/ruby_logo.png",
                        repoCount: 0
                    }
                ],
                //Initialize state to show loading till all repositories are loading
                repoCountRecieved: false,
                //Initialize state to no language select on initial load
                selectedLanguage: "",
            }
            this.onlanguageSelect = this.onlanguageSelect.bind(this);
            this.handleRepoSelect = this.handleRepoSelect.bind(this);

        };

        componentDidMount() {
            var repoCountObject = {};

            // AJAX/axios call to load counts of respositories under each language
            axios.get('/getRepoCount')
                .then((response) => {
                    console.log(response.data.javascript);
                    repoCountObject = response.data;

                    //set allLanguages state with loaded repositories count
                    var allLanguagesArray = [{
                            language: "Javascript",
                            languageIconSrc: "../images/languages_logo/javascript_logo.png",
                            repoCount: repoCountObject.javascript
                        },
                        {
                            language: "Java",
                            languageIconSrc: "../images/languages_logo/java_logo.png",
                            repoCount: repoCountObject.java
                        },
                        {
                            language: "Python",
                            languageIconSrc: "../images/languages_logo/python_logo.png",
                            repoCount: repoCountObject.python
                        },
                        {
                            language: "Php",
                            languageIconSrc: "../images/languages_logo/php_logo.png",
                            repoCount: repoCountObject.php
                        },
                        {
                            language: "Ruby",
                            languageIconSrc: "../images/languages_logo/ruby_logo.png",
                            repoCount: repoCountObject.ruby
                        }
                    ];
                    this.setState({
                        allLanguages: allLanguagesArray,
                        repoCountRecieved: true
                    });
                    console.log(this.state.allLanguages);
                })
                .catch((error) => {
                    console.log("Error while fetching Repo Count:: ", error);
                });

        }

        onlanguageSelect(selectedLanguage) {
            //set state to navigate to repositories page
            this.setState({
                languagePage: false,
                repoPage: true,
                selectedLanguage: selectedLanguage,
            })
        }

        //on particular repository select, function to navigate to user profile page
        handleRepoSelect(user_url) {
            console.log("selected repositories repo id ::", user_url);
            this.setState({
                repoPage: false,
                userPage: true,
                selectedRepoUserURL: user_url,
            })
        }

        render() {
                var allLanguagesDisplay = [];

                this.state.allLanguages.forEach(function(language, i) {

                            //push each langauge data in a circular div
                            allLanguagesDisplay.push(
                               <div className = "language_box_style"
                                key = {i}
                                onClick = {this.onlanguageSelect.bind(this, language.language.toLowerCase())} >
                                <img
                                src = {language.languageIconSrc}
                                alt = "img" / >
                                <p> {language.language} </p>
                                <p> <Repositories
                                style = {{ color: '#1e90ff' }}
                                />{(this.state.repoCountRecieved)?<span>{language.repoCount}</span >: < span > ..loading < /span>}</p >
                                </div>
                            );

                            //if on 1st row 3 languages are accomodated, start next language from new line
                            if (i == 2) {
                                allLanguagesDisplay.push( < br key = {
                                        "br" + i
                                    }
                                    />)
                                }

                            }.bind(this));

                        return ( <
                            div className = "language_menu_style" >

                            {
                                this.state.languagePage ? allLanguagesDisplay : null
                            } {
                                this.state.repoPage ? < RepositoriesComponent selectedLanguage = {
                                    this.state.selectedLanguage
                                }
                                onRepoSelect = {
                                    this.handleRepoSelect
                                }
                                />:null} {
                                    this.state.userPage ? < UserComponent user_url = {
                                        this.state.selectedRepoUserURL
                                    }
                                    />:null}

                                    <
                                    /div>
                                )
                            }
                        }
