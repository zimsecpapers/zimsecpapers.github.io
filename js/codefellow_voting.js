
var CODEFELLOW_VOTING_URL="https://codefellow.vercel.app/privacy/policy";
// display data
displayVotingData();

function displayVotingData(){
    let cookie_name=getDateCookieName();
    let count=getTodayCookieCount(cookie_name);
    let message="";
    if(count===0){
        message="*You haven't voted today, please vote";
    }else if (count==1) {
        message="*You have voted once today, you can vote 2 more times";
    }else if (count===2) {
        message="*You have voted 2 times, you can still vote again";
    }else {
        message="*Thank you for voting today, do it again tommorow";
    }
    document.getElementById("voting_status").innerHTML=message;
}// end of  displayVotingData


function handleVoteButtonClick(){
  // console.log("Vote button has been clicked <::> ");
  increaseCookieCounter();

  // display data
  displayVotingData();

  // Go to voting Page
  window.location.href = CODEFELLOW_VOTING_URL;

}// end of handleVoteButtonClick()

function increaseCookieCounter(){
    let days=2;
    let cookie_name=getDateCookieName();

    let count=getTodayCookieCount(cookie_name);

    let newcount=count+1;

    console.log("cookie_name:"+count);
    // setting the cookie
    setCookie(cookie_name, newcount, days);
}// end of increaseCookieCounter


// create a cokkie name using the current Date
function getDateCookieName(){
    const d = new Date();
    let day=d.getUTCDate();
    let month=d.getMonth()+1;
    let full_year=d.getUTCFullYear();
    let cookie_name=day+"_"+month+"_"+full_year;

    return cookie_name;
}

/*
cname: name of cookie
cvalue: value
exdays:; expires after how many days

*/

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();

  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";

}// end of setCookie

// check for a cookie
function getTodayCookieCount(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return parseInt(c.substring(name.length, c.length));
    }
  }
  return 0;
}// end of getCookie()