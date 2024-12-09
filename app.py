from flask import Flask, render_template, request
import pyttsx3

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        text = request.form['text']
        # Initialize the pyttsx3 engine
        engine = pyttsx3.init()
        # Convert text to speech
        engine.say(text)
        engine.runAndWait()
        return render_template('index.html', text=text)
    return render_template('index.html', text=None)

if __name__ == '__main__':
    app.run(debug=True)
