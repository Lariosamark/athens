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
  TextField,
  Container,
} from '@mui/material';
import { db } from '../lib/firebase/firebaseConfig';
import {
  doc,
  getDoc,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

const StartExam = () => {
  const { id } = useParams(); // Get exam ID from URL
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [reviewMode, setReviewMode] = useState(false);
  const [examTaken, setExamTaken] = useState(false); // Check if the exam is already taken

  // State for user info
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [userInfoSubmitted, setUserInfoSubmitted] = useState(false);

  // Check if user has already taken the exam
  useEffect(() => {
    const checkIfTaken = async () => {
      const resultQuery = query(
        collection(db, 'examResults'),
        where('examId', '==', id),
        where('fullName', '==', fullName)
      );

      const resultSnapshot = await getDocs(resultQuery);

      if (!resultSnapshot.empty) {
        const resultData = resultSnapshot.docs[0].data();
        setScore(resultData.score);
        setAnswers(resultData.answers || {});
        setSubmitted(true);
        setReviewMode(false);
        setExamTaken(true);
      }
    };

    if (fullName) {
      checkIfTaken();
    }
  }, [id, fullName]);

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

  // Submit user information before starting the exam
  const handleSubmitUserInfo = () => {
    if (fullName && address && contactNumber) {
      setUserInfoSubmitted(true);
    } else {
      alert('Please fill in all fields before starting the exam.');
    }
  };

  // Submit the exam and calculate the score
  const handleSubmit = async () => {
    if (examTaken) {
      alert('You have already taken this exam. You can only review it.');
      return;
    }

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
      fullName,
      address,
      contactNumber,
      examId: id,
      score: totalScore,
      totalQuestions: exam?.questions.length,
      answers, // Store user's answers for review
      timestamp: new Date(),
    };

    await addDoc(collection(db, 'examResults'), resultData);
    console.log('Exam results saved successfully!');
  };

  // Handle review mode
  const handleReview = () => {
    console.log('Review mode activated');
    setReviewMode(true);
    setSubmitted(true); // Ensure this triggers a re-render to show the review
  };

  // Return to the exams page
  const handleBackToExams = () => {
    navigate('/exams');
  };

  // Navigate to dashboard
  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  if (!exam) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h5">Loading Exam...</Typography>
      </Box>
    );
  }

  // Render user info form if not submitted and exam not already taken
  if (!userInfoSubmitted && !examTaken) {
    return (
      <Container maxWidth="sm" sx={{ mt: 10, textAlign: 'center' }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Enter Your Information
        </Typography>
        <Box sx={{ mt: 4 }}>
          <TextField
            fullWidth
            label="Full Name"
            variant="outlined"
            margin="normal"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <TextField
            fullWidth
            label="Address"
            variant="outlined"
            margin="normal"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            fullWidth
            label="Contact Number"
            variant="outlined"
            margin="normal"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleSubmitUserInfo}
          sx={{ mt: 4 }}
        >
          Proceed to Exam
        </Button>
      </Container>
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

      {examTaken && !reviewMode ? (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" color="info.main">
            You have already taken this exam. You can review your answers below.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleReview}
            sx={{ mt: 3 }}
          >
            Review Exam
          </Button>
        </Box>
      ) : !submitted && !reviewMode ? (
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
          {reviewMode ? (
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
                    {answers[index] !== q.correctAnswer && (
                      <Typography variant="body2" color="green">
                        Correct Answer: {q.correctAnswer}
                      </Typography>
                    )}
                  </Box>
                </ListItem>
              ))}
            </List>
          ) : (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" color="success.main">
                🎉 Exam Completed!
              </Typography>
              <Typography variant="h6" sx={{ mt: 1 }}>
                Your Score: {score}/{exam.questions.length}
              </Typography>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleReview}
                sx={{ mt: 3, mr: 2 }}
              >
                Review Answers
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleBackToExams}
                sx={{ mt: 3, mr: 2 }}
              >
                Back to Exams
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={handleGoToDashboard}
                sx={{ mt: 3 }}
              >
                Go to Dashboard
              </Button>
            </Box>
          )}
        </>
      )}

      {!submitted && !examTaken && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 4 }}
        >
          Submit Exam
        </Button>
      )}
    </Box>
  );
};

export default StartExam;
