 function randomArticle() {
    console.log("randomArticle() ran");    
    window.open("https://en.wikipedia.org/wiki/Special:Random", "_blank");
    }

function search(){
    $("#submitButton").click(function() {
    $(".searchContent").remove();
    });
    console.log("The search() function ran");
    var searchTerm = document.getElementById("searchTerm").value;
    console.log(searchTerm + " is your search term");
            
        //get request to wikipedia API 
    $.get({ 
    url: "https://en.wikipedia.org/w/api.php?action=query&prop=info&inprop=url&format=json&list=search&utf8=1&srsearch=" + searchTerm, dataType: "JSONP",
        //if request succeeds
    }).done(function(data) {
                //for every term in the first page of results
    for(var i=0; i<data.query.search.length; i++) {
    var url = "https://en.wikipedia.org/?curid=" + data.query.search[i].pageid; 
                
                    //result title                
    var titleDiv = document.createElement("div");
    var titleAnchor = document.createElement("a");
    titleAnchor.setAttribute('href', url);
    titleAnchor.setAttribute('class', 'title searchContent');
//                    var titleContent = document.createTextNode(data.query.search[i].title);
    titleDiv.appendChild(titleAnchor);
    titleAnchor.textContent = data.query.search[i].title;

//                        titleAnchor.appendChild(titleContent);
                    
                //result synopsis                    
    var descriptionDiv = document.createElement("div");
    var descriptionAnchor = document.createElement("a"); 
    descriptionAnchor.setAttribute('href', url);
    descriptionDiv.setAttribute('class', 'well searchContent');
    descriptionDiv.appendChild(descriptionAnchor);
    descriptionDiv.innerHTML = data.query.search[i].snippet;
                    
    var currentDiv = document.getElementById("searchResults");
    document.body.insertBefore(descriptionDiv, currentDiv);
    document.body.insertBefore(titleDiv, descriptionDiv);
    }
    console.log(data);
    });
            
                
            
            
        
        }