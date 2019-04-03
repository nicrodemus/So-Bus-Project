# So-Bus-Project
copy of So Bus website


the Post method to the SoBus API get conflicts with the autocomplete places by google, if i type just name of a city, the response is ok, if the value is longer, the response is an empty array.
At the beginning it was quite hard to access to your API, there was some security protocol, and i couldn't access, then i found this interesting command to add to the terminal and start a new session of Google Chrome, wich unblocked the security(open -na Google\ Chrome --args --disable-web-security --user-data-dir="/tmp/chrome_dev"), and it worked,

Implemented for both searchBars.
I used even the geoCode API by google.
You can see it clicking on the button "info" after typing on the research bars, it will display two div with some information from Google GeoCode, "IT'S WORKS ONLY WITH MAX-WIDTH SCREEN".
