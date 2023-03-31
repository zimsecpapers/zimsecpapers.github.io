
let adsWidth = document.getElementsByClassName('ads').offsetWidth;
let isAdBlockAvailable = false;

if (adsWidth == 0){
    isAdBlockAvailable = true;
	//alert("Adblocker detected. Please deactivate your adblocker");
    const turnOffAddBlocker = confirm(
      'Disable your adblocker so that ads can display if want to download resources here?',
    );
    if (turnOffAddBlocker) {
        history.back();
    }else{
        history.back();
    }
} else {
    isAdBlockAvailable = false;
    // console.log(">> No adblocker present");
    // console.log("user is null");
}
