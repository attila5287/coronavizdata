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


@app.route("/test")
def test():
    return render_template('test.html', title='Test')

