const questionModel = require('../Model/questionModel');
const fs = require('fs');

exports.postQuestions = async (req, res) => {
    console.log('Controller entered');
    const { url, catagory, data } = req.body;

    if (!req.body || !url || !catagory || !data) {
        return res.status(400).json({
            status: 'fail',
            data: { message: 'Please fill in the question details.' }
        });
    }

    try {
        const isExist = await questionModel.findOne({ catagory });
        let questions;

        if (!isExist) {
            questions = await questionModel.create({ url, catagory });
            if (!questions) {
                return res.status(200).json({
                    status: 'success',
                    data: { message: 'Not saved.' }
                });
            }
        }

        // Reading current file content and appending new data as JSON array
        fs.readFile(url, 'utf8', (readErr, fileData) => {
            if (readErr && readErr.code !== 'ENOENT') {
                console.error('Error reading file:', readErr);
                return res.status(500).json({
                    status: 'fail',
                    data: { message: 'Error reading file.' }
                });
            }

            const currentData = fileData ? JSON.parse(fileData) : [];
            currentData.push(data);

            fs.writeFile(url, JSON.stringify(currentData, null, 2), 'utf8', (writeErr) => {
                if (writeErr) {
                    console.error('Error writing to file:', writeErr);
                    return res.status(500).json({
                        status: 'fail',
                        data: { message: 'Error while saving to file.' }
                    });
                }

                res.status(200).json({
                    status: 'success',
                    data: {
                        message: 'Questions saved successfully!',
                        data: questions
                    }
                });
            });
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({
            status: 'fail',
            data: { message: 'Error: ' + err.message }
        });
    }
};

exports.getQuestions = async (req, res) => {
    try {
        // console.log('reqBody', req.body);
        const questions = await questionModel.findOne({ url: req.body.url });
        // console.log('questions from db', questions)

        if (!questions) {
            return res.status(404).json({
                status: 'fail',
                message: 'Unable to find resources.'
            });
        }

        fs.readFile(req.body.url, 'utf8', (error, data) => {
        
            if (error) {
                console.error('Error reading file:', error);
                return res.status(404).json({
                    status: 'fail',
                    data: 'Error while reading the file.'
                });
            }

            res.status(200).json({
                status: 'success',
                data: { fileContent: JSON.parse(data) }
            });
        });
    } catch (error) {
        console.error('Error in getQuestions:', error);
        res.status(404).json({
            status: 'fail',
            message: 'Unable to process the request.'
        });
    }
};
