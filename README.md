# SendTheClimb
<h3>The app that helps you find your next project!</h3>
<a href='https://send-the-climb.firebaseapp.com/'>Heres a link to the deployed project</a> <br>
This app I made in a week finds nearby climbs relative to Flatiron School's (The Hub 3601 Walnut St, Denver, CO 80205) location.
<br>
There were features I wanted to impliment before this week was up, but wasn't able to due to time constraints. I challenged myself to make it purely front end, although originally users were planned for the project the idea was ultimately scrapped.
<h2>Requirements</h2>
<ul>
  <li>A web browser</li>  
</ul>
This is a purely front-end app that makes calls to a couple APIs. I deployed the app to firebase for easy use. This is the first time I have deployed an app.
<br/>
If one wants to run this app standalone then you'll likely have to install lite-server by running these in your terminal: <br/>
<code>npm install lite-server</code> <br/>
Navigate the the directory "Front-end Climb" and run the following:<br/>
<code>lite-server -p 3000</code> <br/>
This will get the application up and running, this is a multipage app.
<h2>Usage</h2>
The app is very simple. The home page automatically gives you climbs within 10 miles, theres a search page where you can see a lot more. The search form allows for a range of 50 miles max and can show both climbs in the trad/sport category, as well as boulders. Each of the names of the climbs will navigate you to the mountain project site with further info about the given climb including it's difficulty, distance, type, and more.
