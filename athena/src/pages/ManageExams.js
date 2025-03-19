import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from '@mui/material';
import { db } from '../lib/firebase/firebaseConfig';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
} from 'firebase/firestore';

const ManageExams = () => {
  const [exams, setExams] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState('');
  const [choices, setChoices] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Fetch exams from Firestore
  useEffect(() => {
    const fetchExams = async () => {
      const examCollection = await getDocs(collection(db, 'exams'));
      setExams(examCollection.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    fetchExams();
  }, []);

  // Add or update exam with questions
  const handleAddOrUpdateExam = async () => {
    const examData = {
      title,
      description,
      questions,
    };

    if (editingId) {
      const examDoc = doc(db, 'exams', editingId);
      await updateDoc(examDoc, examData);
    } else {
      await addDoc(collection(db, 'exams'), examData);
    }

    resetForm();
    window.location.reload();
  };

  // Add Question with Multiple Choices
  const handleAddQuestion = () => {
    if (question && choices.some((choice) => choice.trim()) && correctAnswer) {
      setQuestions([
        ...questions,
        {
          question,
          choices: choices.filter((choice) => choice.trim() !== ''), // Remove empty choices
          correctAnswer,
        },
      ]);
      setQuestion('');
      setChoices(['', '', '', '']);
      setCorrectAnswer('');
    }
  };

  // Edit an existing exam
  const handleEdit = (exam) => {
    setTitle(exam.title);
    setDescription(exam.description);
    setQuestions(exam.questions || []);
    setEditingId(exam.id);
  };

  // Delete an exam
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'exams', id));
    window.location.reload();
  };

  // Reset form after adding or updating
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setQuestions([]);
    setQuestion('');
    setChoices(['', '', '', '']);
    setCorrectAnswer('');
    setEditingId(null);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Manage Exams
      </Typography>

      {/* Exam Title */}
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
      />

      {/* Exam Description */}
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
      />

      <Divider sx={{ my: 2 }} />

      {/* Question and Answer Section */}
      <Typography variant="h6" sx={{ mt: 2 }}>
        Add Multiple-Choice Questions
      </Typography>

      {/* Question Input */}
      <TextField
        label="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        fullWidth
        margin="normal"
      />

      {/* Choice Inputs */}
      {choices.map((choice, index) => (
        <TextField
          key={index}
          label={`Choice ${index + 1}`}
          value={choice}
          onChange={(e) => {
            const newChoices = [...choices];
            newChoices[index] = e.target.value;
            setChoices(newChoices);
          }}
          fullWidth
          margin="normal"
        />
      ))}

      {/* Select Correct Answer */}
      <FormControl component="fieldset" sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Select Correct Answer:</Typography>
        <RadioGroup
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
        >
          {choices
            .filter((choice) => choice.trim() !== '')
            .map((choice, index) => (
              <FormControlLabel
                key={index}
                value={choice}
                control={<Radio />}
                label={choice}
              />
            ))}
        </RadioGroup>
      </FormControl>

      {/* Add Question Button */}
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleAddQuestion}
        sx={{ mt: 2 }}
      >
        Add Question
      </Button>

      {/* List of Added Questions */}
      <List sx={{ mt: 2 }}>
        {questions.map((q, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`Q: ${q.question}`}
              secondary={
                <>
                  {q.choices.map((choice, idx) => (
                    <Typography
                      key={idx}
                      variant="body2"
                      color={choice === q.correctAnswer ? 'success.main' : 'text.secondary'}
                    >
                      {`${String.fromCharCode(65 + idx)}. ${choice}`}
                    </Typography>
                  ))}
                  <Typography variant="body2" fontWeight="bold" sx={{ mt: 1 }}>
                    Correct Answer: {q.correctAnswer}
                  </Typography>
                </>
              }
            />
          </ListItem>
        ))}
      </List>

      <Button
        variant="contained"
        color="primary"
        onClick={handleAddOrUpdateExam}
        sx={{ mt: 3 }}
      >
        {editingId ? 'Update Exam' : 'Add Exam'}
      </Button>

      <Divider sx={{ my: 4 }} />

      {/* List of Existing Exams */}
      <Typography variant="h5" gutterBottom>
        Existing Exams
      </Typography>
      <List>
        {exams.map((exam) => (
          <ListItem key={exam.id}>
            <ListItemText
              primary={exam.title}
              secondary={
                <>
                  <Typography variant="body2">{exam.description}</Typography>
                  {exam.questions?.length > 0 && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Questions: {exam.questions.length}
                    </Typography>
                  )}
                </>
              }
            />
            <Button
              onClick={() => handleEdit(exam)}
              sx={{ mr: 1 }}
              variant="outlined"
              color="secondary"
            >
              Edit
            </Button>
            <Button
              onClick={() => handleDelete(exam.id)}
              variant="outlined"
              color="error"
            >
              Delete
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ManageExams;
