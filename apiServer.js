 const express = require('express');
 const mongoose = require('mongoose');
 const bodyParser = require('body-parser');
 const dotenv = require("dotenv");

//  const multer = require('multer');
//  const path = require('path');
//  const fs = require('fs');
//  const csv = require('csv-parser');
 
 const Exercise = require('./models/exercise');
 dotenv.config({path:"./config.env"});

 const app = express();
 app.use(bodyParser.json());
 
 const DB = process.env.DB
 mongoose.connect(DB).then(()=>{
     console.log("connection successful");
  }).catch((err)=>{
     console.log(err);
  });
  
 // Configure multer for file uploads
//  const storage = multer.diskStorage({
//      destination: function (req, file, cb) {
//          cb(null, 'uploads/');
//      },
//      filename: function (req, file, cb) {
//          cb(null, Date.now() + path.extname(file.originalname)); // Appending extension
//      }
//  });
//  const upload = multer({ storage: storage });
 

 // Parse and save CSV data to the database
//  app.post('/upload-csv', upload.single('file'), (req, res) => {
//      const results = [];
//      fs.createReadStream(req.file.path)
//          .pipe(csv())
//          .on('data', (data) => results.push(data))
//          .on('end', async () => {
//              try {
//                  await Exercise.insertMany(results);
//                  res.status(201).send({ message: 'CSV data imported successfully' });
//              } catch (error) {
//                  res.status(400).send(error);
//              }
//          });
//  });
 
 // Create an exercise
 app.post('/exercises', async (req, res) => {
     try {
         const exercise = new Exercise(req.body);
         await exercise.save();
         res.status(201).send(exercise);
     } catch (error) {
         res.status(400).send(error);
     }
 });
 
 // Get all exercises
 app.get('/exercises', async (req, res) => {
     try {
         const exercises = await Exercise.find();
         res.send(exercises);
     } catch (error) {
         res.status(500).send(error);
     }
 });
 
// Get an exercise by ID
 app.get('/exercisesById/:id', async (req, res) => {
     try {
         const exercise = await Exercise.findById(req.params.id);
         if (!exercise) {
             return res.status(404).send();
         }
         res.send(exercise);
     } catch (error) {
         res.status(500).send(error);
     }
 });

 // Get an exercise by name
 app.get('/exercisesByName/:name', async (req, res) => {
    try {
        const exerciseName = req.query.name;
        console.log(exerciseName)
        if (!exerciseName) {
            return res.status(400).send({ error: 'Exercise name query parameter is required' });
        }

        const exercise = await Exercise.findOne({ name: exerciseName });
        if (!exercise) {
            return res.status(404).send({ error: 'Exercise not found' });
        }

        res.send(exercise);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get an exercise by bodypart
app.get('/exercisesByBodyPart/:bodyPart', async (req, res) => {
    try {
        const bodyPartName = req.query.bodyPart;
        if (!bodyPartName) {
            return res.status(400).send({ error: 'Exercise name query parameter is required' });
        }

        const exercise = await Exercise.find({ bodyPart: bodyPartName });
        if (!exercise) {
            return res.status(404).send({ error: 'Exercise not found' });
        }

        res.send(exercise);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get an exercise by equipment
app.get('/exercisesByEquipment/:equipment', async (req, res) => {
    try {
        const EquipmentName = req.query.equipment;
        if (!EquipmentName) {
            return res.status(400).send({ error: 'Exercise name query parameter is required' });
        }

        const exercise = await Exercise.find({ equipment: EquipmentName });
        if (!exercise) {
            return res.status(404).send({ error: 'equipment not found' });
        }

        res.send(exercise);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get an exercise by bodypart + equipment
app.get('/exercisesByBodyPartEquipment/:bodyPartEquipment', async (req, res) => {
    try {
        const bodyPartEquipment = req.query.bodyPartEquipment;
        const wordsArray = bodyPartEquipment.split(',');
       
        const bodyPartName = wordsArray[0].trim(); 
        const equipmentName = wordsArray[1].trim();
 
        if (!bodyPartName, !equipmentName) {
            return res.status(400).send({ error: 'Exercise name query parameter is required' });
        }
        const exercises = await Exercise.find({ bodyPart : bodyPartName , equipment: equipmentName });
        if (!exercises) {
            return res.status(404).send({ error: 'Exercise not found' });
        }
        res.send(exercises);
    } catch (error) {
        res.status(500).send(error);
    }
});


 // Update an exercise
 app.patch('/exercises/:id', async (req, res) => {
     try {
         const exercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
         if (!exercise) {
             return res.status(404).send();
         }
         res.send(exercise);
     } catch (error) {
         res.status(400).send(error);
     }
 });
 
 // Delete an exercise
 app.delete('/exercises/:id', async (req, res) => {
     try {
         const exercise = await Exercise.findByIdAndDelete(req.params.id);
         if (!exercise) {
             return res.status(404).send();
         }
         res.send(exercise);
     } catch (error) {
         res.status(500).send(error);
     }
 });
 
 const PORT = process.env.PORT || 5001;
 app.listen(PORT, () => {
     console.log(`Server is running on port ${PORT}`);
 });