import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  List,
  ListItem,
  Divider,
} from '@mui/material';
import { db } from '../lib/firebase/firebaseConfig';
import { doc, getDoc, collection, addDoc } from 'firebase/firestore';

const StartExam = () => {
  const { id } = useParams(); // Get exam ID from URL
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [reviewMode, setReviewMode] = useState(false); // ✅ Review Mode

  // Fetch exam data by ID
  useEffect(() => {
    const fetchExam = async () => {
      const examDoc = await getDoc(doc(db, 'exams', id));
      if (examDoc.exists()) {
        setExam(examDoc.data());
      } else {
        console.log('No such exam!');
      }
    };

    fetchExam();
  }, [id]);

  // Handle answer selection
  const handleAnswerChange = (questionIndex, choice) => {
    setAnswers({
      ...answers,
      [questionIndex]: choice,
    });
  };

  // Submit the exam and calculate the score
  const handleSubmit = async () => {
    let totalScore = 0;

    exam?.questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        totalScore++;
      }
    });

    setScore(totalScore);
    setSubmitted(true);

    // Save user's results to Firestore
    const resultData = {
      examId: id,
      score: totalScore,
      totalQuestions: exam?.questions.length,
      timestamp: new Date(),
    };

    await addDoc(collection(db, 'examResults'), resultData);
  };

  // Handle review mode
  const handleReview = () => {
    setReviewMode(true);
  };

  // Return to the exams page
  const handleBackToExams = () => {
    navigate('/exams');
  };

  if (!exam) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h5">Loading Exam...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        {exam.title}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {exam.description}
      </Typography>

      <Divider sx={{ my: 3 }} />

      {!submitted ? (
        <List>
          {exam?.questions?.map((q, index) => (
            <ListItem key={index} sx={{ mb: 2 }}>
              <Box>
                <Typography variant="h6">
                  {index + 1}. {q.question}
                </Typography>
                <FormControl component="fieldset" sx={{ mt: 1 }}>
                  <RadioGroup
                    value={answers[index] || ''}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                  >
                    {q.choices.map((choice, idx) => (
                      <FormControlLabel
                        key={idx}
                        value={choice}
                        control={<Radio />}
                        label={`${String.fromCharCode(65 + idx)}. ${choice}`}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Box>
            </ListItem>
          ))}
        </List>
      ) : (
        <>
          {!reviewMode ? (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" color="success.main">
                🎉 Exam Completed!
              </Typography>
              <Typography variant="h6" sx={{ mt: 1 }}>
                Your Score: {score}/{exam.questions.length}
              </Typography>

              {/* Review Button */}
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleReview}
                sx={{ mt: 3, mr: 2 }}
              >
                Review Exam
              </Button>
            </Box>
          ) : (
            <List>
              {exam?.questions?.map((q, index) => (
                <ListItem key={index} sx={{ mb: 2 }}>
                  <Box>
                    <Typography
                      variant="h6"
                      color={
                        answers[index] === q.correctAnswer
                          ? 'success.main'
                          : 'error.main'
                      }
                    >
                      {index + 1}. {q.question}
                    </Typography>
                    <FormControl component="fieldset" sx={{ mt: 1 }}>
                      <RadioGroup value={answers[index]} readOnly>
                        {q.choices.map((choice, idx) => (
                          <FormControlLabel
                            key={idx}
                            value={choice}
                            control={<Radio />}
                            label={
                              <Typography
                                color={
                                  choice === q.correctAnswer
                                    ? 'green'
                                    : answers[index] === choice
                                    ? 'red'
                                    : 'inherit'
                                }
                              >
                                {`${String.fromCharCode(65 + idx)}. ${choice} ${
                                  choice === q.correctAnswer ? '✅' : ''
                                }`}
                              </Typography>
                            }
                            disabled
                          />
                        ))}
                      </RadioGroup>
                    </FormControl>
                    {/* Show correct answer in review mode */}
                    {answers[index] !== q.correctAnswer && (
                      <Typography variant="body2" color="green">
                        Correct Answer: {q.correctAnswer}
                      </Typography>
                    )}
                  </Box>
                </ListItem>
              ))}
            </List>
          )}
        </>
      )}

      {/* Buttons to Submit and Return */}
      {!submitted ? (
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 3 }}
        >
          Submit Exam
        </Button>
      ) : (
        <Button
    variant="outlined"
    color="secondary"
    onClick={handleBackToExams}
    sx={{ mt: 3 }}
  >
    Back to Exams
  </Button>
      )}
    </Box>
  );
};

export default StartExam;
