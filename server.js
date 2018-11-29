const path = require('path');
const express = require('express');
const fs = require('fs');
const parseCsv = require('csv-parse')

function loadCsvFile(csvFile) {
  return new Promise((resolve, reject) => {
    const output = [];
    const csvString = fs.readFileSync(csvFile).toString('utf8');

    parseCsv(csvString, { trim: true, skip_empty_lines: true })
      .on('readable', function() {
        let record;
        while (record = this.read()) output.push(record)
      })
      .on('end', function() {
        // remove header
        output.shift();
        resolve(output);
      });
  });
}

function parseCourseRawData(rawData) {
  const coursesById = {};
  const coursesBySemester = {};

  rawData.forEach(course => {
    const [ phase, id, name, hours, equivalent, requirements ] = course;

    coursesById[id] = {
      id,
      name,
      phase,
      hours,
      requirements: requirements.trim() != "" ? requirements.split(",").map(r => r.trim()) : [],
    };

    if (!coursesBySemester[phase]) {
      coursesBySemester[phase] = { courses: [] };
    }

    coursesBySemester[phase].courses.push(id);
  });

  return {
    courses: {
      byId: coursesById,
    },
    semesters: Object.values(coursesBySemester),
  };
}

// setup
const PORT = process.env.PORT || 3000
const app = express();

// routes
app.use('/', express.static(path.join(__dirname + '/dist')))

app.use('/course/1', (req, res) => {
  loadCsvFile(path.join(__dirname + '/courses/sin-inf.csv')).then(rawData => {
    res.json(parseCourseRawData(rawData));
  });
});

// Serve the files on port 3000.
app.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`)
  console.log("Press Ctrl+C to quit.")
})
