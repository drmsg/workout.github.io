let data = [];

var exerciesByBodyPart = [
    {
      "name": "Chest",
      "exercises": ["Bench Press", "Push Ups"]
    },
    {
      "name": "Legs",
      "exercises": ["Squats", "Lunges"]
    }
  ];


window.onload = function() {
    populateSelects(exerciesByBodyPart)


    // Fetch saved data from localStorage
    const savedData = localStorage.getItem('workoutData');
    if (savedData) {
        data = JSON.parse(savedData);
        data.forEach(exercise => addExerciseToTable(exercise));
    }
};

function populateSelects(bodyParts) {
    const bodyPartSelect = document.getElementById('bodypart');
    const exerciseSelect = document.getElementById('exercise');

    bodyParts.forEach((part, index) => {
        const option = document.createElement('option');
        option.text = part.name;
        option.value = index;
        bodyPartSelect.add(option);
    });

    // Populate initial exercises
    populateExercises(bodyParts[0].exercises);

    // Update exercises when body part changes
    bodyPartSelect.onchange = function() {
        const exercises = bodyParts[this.value].exercises;
        populateExercises(exercises);
    };
}

function populateExercises(exercises) {
    const exerciseSelect = document.getElementById('exercise');
    exerciseSelect.innerHTML = '';
    exercises.forEach(exercise => {
        const option = document.createElement('option');
        option.text = exercise;
        exerciseSelect.add(option);
    });
}

function addExercise() {
    const bodyPartSelect = document.getElementById('bodypart');
    const exerciseSelect = document.getElementById('exercise');
    const weightInput = document.getElementById('weight');
    const repsInput = document.getElementById('reps');

    const exercise = {
        bodyPart: bodyPartSelect.options[bodyPartSelect.selectedIndex].text,
        exercise: exerciseSelect.value,
        weight: weightInput.value,
        reps: repsInput.value
    };

    addExerciseToTable(exercise);

    // Add to local data and save it to localStorage
    data.push(exercise);
    localStorage.setItem('workoutData', JSON.stringify(data));

    // Clear inputs
    weightInput.value = '';
    repsInput.value = '';
}

function addExerciseToTable(exercise) {
    const tableBody = document.getElementById('tableBody');
    const row = tableBody.insertRow();

    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);

    cell1.innerHTML = exercise.bodyPart;
    cell2.innerHTML = exercise.exercise;
    cell3.innerHTML = exercise.weight;
    cell4.innerHTML = exercise.reps;
}

