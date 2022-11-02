
var CODEFELLOW_VOTING_URL="https://codefellow.vercel.app/privacy/policy";
// display data
displayVotingData();
defaultSettings();

(function () {
    window.onpageshow = function(event) {
        if (event.persisted) {
            // window.location.reload();
            displayVotingData();
        }
    };
})();


function defaultSettings(){
    //document.getElementById('file_download_id').style.visibility = 'hidden';
    $(document).ready(function() {
        $('a').on("click", function(e) {
            e.preventDefault();
            // Execute default action
            let cookie_name=getDateCookieName();
            let count=getTodayCookieCount(cookie_name);
            let Flink=e.currentTarget.href;

            if(count===0){
                displayAlertDialog();
            }else{
                // Go to voting Page
                window.location.href=Flink;
            }
        });
    });
}

function displayAlertDialog() {
  var txt;
  if (confirm("Go and vote for CodeFellow, if you want to download zimsec resources (vote 3 times per day)")) {
    txt = "You pressed OK";
     handleVoteButtonClick();
  } else {
    txt = "You pressed Cancel!";
     handleVoteButtonClick();
  }
  //console.log(txt);
}//end of myFunction

function displayVotingData(){
    let cookie_name=getDateCookieName();
    let count=getTodayCookieCount(cookie_name);
    let message="";
    if(count===0){
        message="*You can vote 3 times per day";
    }else if (count==1) {
        message="*You have voted once today, you can vote 2 more times";
    }else if (count===2) {
        message="*You have voted 2 times, you can still vote again";
    }else {
        message="*Thank you for voting today, do it again tommorow";
    }
    document.getElementById("voting_status").innerHTML=message;
    // setting the history
}// end of  displayVotingData

function handleVoteButtonClick(){
  // console.log("Vote button has been clicked <::> ");
  increaseCookieCounter();

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
