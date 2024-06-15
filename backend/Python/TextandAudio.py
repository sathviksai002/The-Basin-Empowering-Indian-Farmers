from datetime import datetime
from gtts import gTTS
import os
from googletrans import Translator

class TextAudio:
    def __init__(self, main_str, lang, output):
        self.main_str = main_str
        self.lang = lang
        self.output = output
        self.trans_str = ''

    def translate_text(self):
        print(self.main_str, self.trans_str, self.lang)
        try:
            translator = Translator()
            # print(translator)
            # translated_text = translator.translate(self.main_str, dest=self.lang)
            # print(translated_text)
            translated_text = translator.translate(self.main_str,src='auto',dest=self.lang)
            self.trans_str = translated_text.text
            print("Translated text:", self.trans_str)
            return self.trans_str
        except Exception as e:
            print("Translation error:", e)
            return None

    def text_to_audio(self):
        if not self.trans_str:
            print("Translation is not available. Call translate_text first.")
            return None
        try:
            tts = gTTS(text=self.trans_str, lang=self.lang)
            tts.save(self.output)
            print("Audio saved successfully:", self.output)
            return self.output
        except Exception as e:
            print("Error saving audio:", e)
            return None

