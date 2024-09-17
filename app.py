from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html', page='home', logged_in=False)

@app.route('/login')
def login():
    return render_template('login.html', page='login', logged_in=False)

@app.route('/streaming')
def streaming():
    return render_template('streaming.html', page='streaming', logged_in=True)


@app.route('/video')
def video():
    return render_template('video.html', page='video', logged_in=True)

@app.route('/report')
def report():
    return render_template('report.html', page='report', logged_in=True)

@app.route('/signup')
def signup():
    return render_template('signup.html')

if __name__ == '__main__':
    app.run(debug=True)
