import os
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin


app = Flask(__name__)
CORS(app)

@app.route('/submit_form', methods=['POST'])
@cross_origin()
def submit_form():
    data = request.json
    fileName = "database/" + data["id"] + ".txt"
    file = open(fileName, "w+")
    for i in data:
        file.write(data[i]+"\n")
    file.close()
    return jsonify({'message': 'Success'})

@app.route('/give_info', methods=['POST'])
@cross_origin()
def give_info():
    data = request.json
    fileName =  "database/" + data["id"] + ".txt"
    file = open(fileName, "r+")
    info = file.readlines()
    for i in range(len(info)):
        info[i] = info[i][0:-1]
    file.close()
    return jsonify(info)

@app.route('/update_info', methods=['POST'])
@cross_origin()
def update_info():
    data = request.json
    fileName =  "database/" + data["id"] + ".txt"
    file = open(fileName, "r+")
    for i in data:
        file.write(data[i]+"\n")
    file.close()
    return jsonify({'message': 'Success'})

@app.route('/get', methods=['GET'])
@cross_origin()
def dis_info():
    folder_path = 'database'
    infoList = os.listdir(folder_path)
    infoList.remove('.DS_Store')
    info = []
    for i in infoList:
        fileName = "database/" + i
        file = open(fileName, "r")
        info.append(file.readline()[0:-1])
        file.close
        info.append(fileName[9:-4])
    return jsonify(info)

@app.route('/del', methods=['POST'])
@cross_origin()
def delete():
    data = request.json
    fileName =  "database/" + data["id"] + ".txt"
    if os.path.exists(fileName):
        os.remove(fileName)
    return jsonify("done")

if __name__ == '__main__':
    app.run(debug=True)
