import speech_recognition as sr
def transform_voice_to_text():
    """Transforms the human voice to text and returns it"""
    recognizer = sr.Recognizer() # Initialize recognizer
    with sr.Microphone() as source: # Use microphone as input source
        # print("Please say something...")
        recognizer.adjust_for_ambient_noise(source) # Adjust for ambient noise and capture audio
        audio = recognizer.listen(source)
        try:
            text = recognizer.recognize_google(audio)
            return text
        except sr.UnknownValueError:
            print("Sorry, I could not understand the audio.")
        except sr.RequestError as e:
            print("Could not request results; {0}".format(e))
def main():
    print(transform_voice_to_text())
if __name__ == "__main__":
    main()