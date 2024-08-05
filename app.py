from flask import Flask, render_template, request
import pickle
import cv2
import numpy as np

app = Flask(__name__)

with open("brain_tumor_model.pkl", "rb") as file:
    loaded_model = pickle.load(file)

@app.route('/predict', methods=['POST'])
def predict():
    if 'imagefile' not in request.files:
        return {'error': 'No file part'}

    imagefile = request.files['imagefile']
    if imagefile.filename == '':
        return {'error': 'No selected file'}

    image_path = "./images/" + imagefile.filename
    imagefile.save(image_path)

    img = cv2.imread(image_path, 0)
    img = cv2.resize(img, (200, 200))
    z = [img]
    z = np.array(z)
    z_u = z.reshape(len(z), -1)
    z_u = z_u / 255

    yhat = loaded_model.predict(z_u)

    if yhat == 0:
        classification = 'no tumor'
    elif yhat == 1:
        classification = 'pituitary tumor'
    elif yhat == 2:
        classification = 'glioma tumor'
    elif yhat == 3:
        classification = 'meningioma tumor'

    return {'prediction': classification}

if __name__ == '__main__':
    app.run(port=5001, debug=True)
