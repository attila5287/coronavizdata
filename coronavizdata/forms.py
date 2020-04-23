from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed
from flask_login import current_user
from wtforms import SelectField, StringField, PasswordField, SubmitField, BooleanField, TextAreaField
from wtforms.validators import DataRequired, Length, Email, EqualTo, ValidationError
from squares.models import User


class RegistrationForm(FlaskForm):
    username = StringField('Username',
                           validators=[DataRequired(), Length(min=2, max=20)])
    email = StringField('Email',
                        validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    confirm_password = PasswordField('Confirm Password',
                                     validators=[DataRequired(), EqualTo('password')])
    submit = SubmitField('Sign Up')

    def validate_username(self, username):
        user = User.query.filter_by(username=username.data).first()
        if user:
            raise ValidationError(
                'That username is taken. Please choose a different one.')

    def validate_email(self, email):
        user = User.query.filter_by(email=email.data).first()
        if user:
            raise ValidationError(
                'That email is taken. Please choose a different one.')


class LoginForm(FlaskForm):
    email = StringField('Email',
                        validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    remember = BooleanField('Remember Me')
    submit = SubmitField('Login')


class UpdateAccountForm(FlaskForm):
    username = StringField('Username',
                           validators=[DataRequired(), Length(min=2, max=20)])
    email = StringField('Email',
                        validators=[DataRequired(), Email()])
    picture = FileField('Update Profile Picture', validators=[
                        FileAllowed(['jpg', 'png'])])
    submit = SubmitField('Update')

    def validate_username(self, username):
        if username.data != current_user.username:
            user = User.query.filter_by(username=username.data).first()
            if user:
                raise ValidationError(
                    'That username is taken. Please choose a different one.')

    def validate_email(self, email):
        if email.data != current_user.email:
            user = User.query.filter_by(email=email.data).first()
            if user:
                raise ValidationError(
                    'That email is taken. Please choose a different one.')


class PostForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    content = TextAreaField('Content', validators=[DataRequired()])
    submit = SubmitField('Post')


class ItemForm(FlaskForm):
      pass
      make = StringField('make', validators=[DataRequired()], default='Ford')
      model = StringField('model', validators=[DataRequired()], default='Mustang')
      year = StringField('year', validators=[DataRequired()], default='2007')
      body_type = SelectField(
          choices=[
              ('0', 'Sedan'),('1', 'Compact'),
              ('2', 'Coupe'), ('3', 'Pickup'),
              ('4' ,'SUV')
              ], default='2')

      dest_id = SelectField(
          choices=[('0', 'Alabama'),('1', 'Baltimore'),
                   ('2', 'California'), ('3', 'Delaware'), ('4', 'Exeter')], default='0')
      ship_status = SelectField(
          choices=[
              ('0', 'not yet shipped'),
              ('1', 'receive next week'),
              ('2', 'receive following week'),
              ('3', 'receive within a month'),
              ('4', 'receive next month'),
          ], default='0'
      )


class ItemDemo():
    pass
    date_posted = 'date_posted'

    def __init__(self, make='', model='', year='', body_type='', dest_id='', ship_status=''):
        pass

        self.make = make
        self.model = model
        self.year = year
        self.body_type = body_type
        self.dest_id = dest_id
        self.ship_status = ship_status

    def __repr__(self):
        return f"ItemDemo('\n...{self.make}'\n\t '{self.model}' \n\t '{self.year}')"
