document.getElementById("myForm").addEventListener('submit',saveBookmark);

function saveBookmark(e){

 var siteName=document.getElementById("siteName").value;   
 var siteUrl=document.getElementById("siteUrl").value;   

console.log('Savedwd');   
//Object to submit to localstorage
var bookmark = {
    name:siteName,
    url:siteUrl
}
 
localStorage.setItem('test','Hello');
    
//Prevent form from submitting
e.preventDefault();
}