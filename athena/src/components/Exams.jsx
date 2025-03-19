// components/Exams.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { db } from '../lib/firebase/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const Exams = () => {
  const [exams, setExams] = useState([]);
  const [takenExams, setTakenExams] = useState([]);
  const navigate = useNavigate();
  const auth = getAuth();
  const currentUser = auth.currentUser;

  // Fetch all exams and check for taken exams
  useEffect(() => {
    const fetchExams = async () => {
      // Get all available exams
      const examCollection = await getDocs(collection(db, 'exams'));
      const examList = examCollection.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setExams(examList);

      // Check if the user has already taken any exams
      if (currentUser) {
        const resultsQuery = query(
          collection(db, 'examResults'),
          where('userId', '==', currentUser.uid)
        );
        const resultsSnapshot = await getDocs(resultsQuery);
        const takenExamIds = resultsSnapshot.docs.map((doc) => doc.data().examId);
        setTakenExams(takenExamIds);
      }
    };

    fetchExams();
  }, [currentUser]);

  // Check if the exam has been taken
  const isExamTaken = (examId) => takenExams.includes(examId);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Available Exams
      </Typography>
      <List>
        {exams.map((exam) => (
          <React.Fragment key={exam.id}>
            <ListItem
              secondaryAction={
                isExamTaken(exam.id) ? (
                  <Button variant="contained" color="secondary" disabled>
                    Exam Taken
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/start-exam/${exam.id}`)}
                  >
                    Start Exam
                  </Button>
                )
              }
            >
              <ListItemText primary={exam.title} secondary={exam.description} />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default Exams;
