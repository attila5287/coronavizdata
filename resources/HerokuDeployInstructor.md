## Heroku Deployment Guide - Flask App


### Sign up for Heroku and download the CLI
* Sign up for [Heroku](https://signup.heroku.com/?c=70130000001xDpdAAE&gclid=CjwKCAiAt4rfBRBKEiwAC678KeCa3cBb3qnOM2yz4RY3UC8Q3QhM2dwZjlMIQWn-F-OvXY6p0gi2FBoCNykQAvD_BwE)
* Download [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
* Enter in credit-card info to your Heroku account (don't worry, everything we'll do today *should* be free)



### Prep/get the app
* Clone [my repo](https://github.com/tehClayton/costa-unsolved) - or push yours to Github for safe keeping
	* Ensure there's a .gitignore!

* Log into Heroku
	```
	heroku login
	```



### We're going to want to clean up our app a bit

* Remove splinter from `scrape_costa.py`
	* The scraping we are doing doesn't really need splinter,
	so why complicate our lives?
	* Commit changes (why now?)



### We need to add a few extra files for Heroku
* Add requirements.txt
	```
	flask==1.0.2
	flask_pymongo==2.2
	beautifulsoup4==4.6.0
	six==1.11.0
	gunicorn==19.9.0
	requests==2.20.0
	```

	* What's this for?


* Add Procfile
	```
	web: gunicorn app:app
	```

	* What's this for?


* Commit changes (why now?)



### Now we'll create our Heroku app

* Create your app
	```
	heroku create [your-unique-app-name-here]
	```
	* What's happening here?
	
		
* Add MongoLab add-in
	```
	heroku addons:create mongolab
	```

	* What is MongoLab and why do we need it?



### Let's clean up how we handle our config

* Add `dev_config.py` file
	```(python)
	mongo_uri = [your connection string to your MongoDB]
	flask_debug = True
	```


* Add FLASK_DEBUG config var to your app
	1. Go to your app page
	2. Click on *Settings*
	3. Click *Reveal Config Vars*
	# 4. Notice our MongoLab URI is pre-populated
	5. Lets add FLASK_DEBUG with value: `False`


* Update how we handle these values/variables in `app.py`
	* If environment variable for `MONGODB_URI` is available then we can use it and read in our flask variable too
	* Otherwise we'll import it from our local (gitignored) config file


* Commit our changes (why now?)



### Where the magic happens

* Push our changes to heroku
	```
	git push heroku master
	```

* Open our newly deployed app
	```
	heroku open
	```

