document.getElementById("myForm").addEventListener('submit',saveBookmark);

function saveBookmark(e){

 var siteName=document.getElementById("siteName").value;   
 var siteUrl=document.getElementById("siteUrl").value;   


 if(!validateForm(siteName,siteUrl))
     {
         return false;
     }
//Object to submit to localstorage
var bookmark = {
    name:siteName,
    url:siteUrl
}
 
if(localStorage.getItem('bookmarks') === null)
    {
        
        var bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    
        
    }
else{
    
    
    bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    
  }
    
 document.getElementById("myForm").reset();
fetchBookmarks();
    
//Prevent form from submitting
e.preventDefault();
    
}

function validateForm(siteName,siteUrl){
    

    if(!siteName || !siteUrl)
        {
            alert("Invalid! Please re-enter form");
            return false;
        }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);
    
    if(!siteUrl.match(regex))
    {
        alert("Please use valid url");
        return false;
    }
    
    return true;
}

function fetchBookmarks(){

var fetched=JSON.parse(localStorage.getItem('bookmarks'));
    
var bookmarksResult=document.getElementById('bookmarksResult');
    
    bookmarksResult.innerHTML='';
    
    for(var i=0;i<fetched.length;i++)
        {
            
            var siteName=fetched[i].name;
            var url=fetched[i].url;
            
            bookmarksResult.innerHTML += "<div class='well'>"+
                                         "<h3>"+siteName+" "+
                                         "<a class='btn btn-primary' target='_blank' href='"+url+"'>Visit</a> "+
                                         "<a onclick='deleteBookmark(\""+url+"\")' class='btn btn-danger' href='#'>Delete</a> "+
                                         "</h3>"+
                                         "</div>";                                         
        }

   console.log(fetched);
}

function deleteBookmark(url){
    
  var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
    
    for(var i=0;i<bookmarks.length;i++)
        {
            
            if(bookmarks[i].url == url)
                {
                    bookmarks.splice(i,1);
                    break;
                }
            
        }
    
    
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    fetchBookmarks();    
    
}