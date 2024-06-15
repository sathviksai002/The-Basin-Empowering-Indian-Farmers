import TextandAudio
from flask import Flask, request, jsonify, send_file, redirect, send_from_directory
from flask_cors import CORS
import uuid
import os
from firebase_admin import storage, credentials, initialize_app

app = Flask(__name__)
CORS(app,origins='*')
# CORS(app, resources={r"/translate": {"origins": "https://192.168.0.103:3000"}})
# CORS(app, resources={r"/translate": {"origins": "https://localhost:3000"}})
# CORS(app, resources={r"/audio": {"origins": "https://localhost:3000"}})
# CORS(app, resources={r"/articles": {"origins": "https://localhost:3000"}})
# CORS(app, resources={r"/download": {"origins": "https://localhost:3000"}})

cred = credentials.Certificate("serviceAccountKey.json")
firebase_app = initialize_app(cred)


bucket_name = "schemes-20bbb.appspot.com"
bucket = storage.bucket(bucket_name)

@app.before_request
def enforce_https():
    if not request.is_secure:
        url = request.url.replace('http://', 'https://', 1)
        return redirect(url, code=301)

@app.route('/translate', methods=['POST'])
def translate():
    data = request.json
    loc = data.get('locationName')
    lang = data.get('selectedLanguage')
    desc = data.get('description')
    print(loc,lang,desc)
    text1 = TextandAudio.TextAudio(loc,lang,'')
    text2 = TextandAudio.TextAudio(desc,lang,'')
    loc = text1.translate_text()
    desc = text2.translate_text()
    dict = {'loc':loc,'desc':desc}
    print(dict)
    return jsonify(dict)


@app.route('/audio', methods=['POST'])
def audiofile():
    data = request.json

    # Construct the text for translation and audio generation
    text = f"Weather forecast on {data.get('selectedDate')} at {data.get('selectedTime')} is {data.get('description')}"

    # Generate a unique audio file name using UUID
    audio_filename = str(uuid.uuid4()) + '.mp3'

    # Directory to store audio files
    directory = 'audios'

    # Ensure the directory exists
    os.makedirs(directory, exist_ok=True)

    # Full path for the audio file
    audio_filepath = os.path.join(directory, audio_filename)

    # Translate text and generate audio
    audio_generator = TextandAudio.TextAudio(text, data.get('selectedLanguage'), audio_filepath)
    audio_generator.translate_text()
    audio_generator.text_to_audio()


    local_file_path = 'audios/' + audio_filename

    # Destination path in Firebase Storage
    destination_blob_name = 'Audios/' + audio_filename

    # Upload the local file to Firebase Storage
    blob = bucket.blob(destination_blob_name)
    blob.upload_from_filename(local_file_path)

    # Get the public URL of the uploaded file
    blob.make_public()
    public_url = blob.public_url
    print(public_url)
    return jsonify({'audio_url': public_url})


# @app.route('/articles',methods=['POST'])
# def articleLinks():
#     return jsonify(ArticleLinks())

@app.route('/download', methods=['GET', 'POST'])
def file_download():
    if request.method == 'POST':
        data = request.get_json()
        file_path = data.get('filePath')
        filename = data.get('filename')
        # Handle file download
        return send_file(file_path, as_attachment=True)
    else:
        # Handle GET requests here if needed
        pass
@app.route('/audios/<path:filename>')
def serve_static(filename):
    # Serve static audio files from the 'audios' directory
    return send_from_directory('audios', filename)

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0',port=5000, ssl_context=('cert.crt', 'cert.key'))