from flask import Flask, jsonify, request
import joblib
import numpy as np

app = Flask(__name__)

# Load the trained model
model = joblib.load("food-recommender.joblib")

# Define the API endpoint


@app.route("/predict", methods=["POST"])
def predict():
    # Get the input data from the request body
    data = request.get_json()

    # Parse the input data
    age = data["age"]
    weight = data["weight"]
    height = data["height"]
    gender = data["gender"]
    bmi = data["bmi"]
    bmr = data["bmr"]
    activity_level = data["activity_level"]

    # Make the prediction
    input_data = np.array(
        [[age, weight, height, gender, bmi, bmr, activity_level]])
    prediction = model.predict(input_data)
    predicted_cal = prediction[0]

    # Adjust the predicted calorie value based on BMI and gender
    if float(bmi) < 16.55 and gender == 0:
        predicted_cal = predicted_cal + 700.0
    elif float(bmi) < 17.0:
        predicted_cal = predicted_cal + 300.0
    elif float(bmi) > 25.0 and gender == 1:
        predicted_cal = predicted_cal - 500.0

    # Return the predicted calorie value as JSON
    return jsonify({"predicted_cal": predicted_cal})


if __name__ == "__main__":
    app.run(debug=True)
