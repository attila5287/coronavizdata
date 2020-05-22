from flask import render_template, url_for, flash, redirect, request, abort
from coronavizdata import app, db

@app.route("/")
@app.route("/dashboard")
def dashboard():
    return render_template('dashboard.html', title='dashBoard')

@app.route("/table")
def table():
    return render_template('table.html', title='Table')

@app.route("/home")
def home():
    return render_template('home.html', title='Home')

@app.route("/about")
def about():
    return render_template('about.html', title='About')

@app.route("/interactive-axis")
def interactive_axis():
    return render_template('interactive-axis.html', title='Interactive Axis')


@app.route("/leaflet/bubble")
def leaflet_bubble():
    return render_template('world-bubble.html', title='Bubble World Map')

@app.route("/leaflet/choropleth")
def leaflet_choropleth():
    return render_template('states.html', title='Choropleth US States')


@app.route("/test")
def test():
    return render_template('test.html', title='Test')
