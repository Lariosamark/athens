// components/ReviewResults.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import { db } from '../lib/firebase/firebaseConfig';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

const ReviewResults = () => {
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [examDetails, setExamDetails] = useState(null);
  const [open, setOpen] = useState(false);

  // Fetch all exam results
  useEffect(() => {
    const fetchResults = async () => {
      const resultSnapshot = await getDocs(collection(db, 'examResults'));
      const resultList = resultSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setResults(resultList);
    };

    fetchResults();
  }, []);

  // Open result details dialog
  const handleViewDetails = async (result) => {
    setSelectedResult(result);

    // Fetch corresponding exam details
    const examDoc = await getDoc(doc(db, 'exams', result.examId));
    if (examDoc.exists()) {
      setExamDetails(examDoc.data());
    } else {
      setExamDetails(null);
    }

    setOpen(true);
  };

  // Close the dialog
  const handleClose = () => {
    setOpen(false);
    setSelectedResult(null);
    setExamDetails(null);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Review User Exam Results
      </Typography>
      <List>
        {results.map((result) => (
          <React.Fragment key={result.id}>
            <ListItem
              secondaryAction={
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleViewDetails(result)}
                >
                  View Details
                </Button>
              }
            >
              <ListItemText
                primary={`${result.userName}'s Exam`}
                secondary={`Score: ${result.score}/${result.totalQuestions}`}
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>

      {/* Dialog for Exam Details */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>
          {selectedResult?.userName}'s Exam Review
        </DialogTitle>
        <DialogContent dividers>
          {examDetails ? (
            <Box>
              <Typography variant="h6" gutterBottom>
                Exam: {examDetails.title}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Score: {selectedResult?.score}/{selectedResult?.totalQuestions}
              </Typography>

              {examDetails?.questions?.map((q, index) => (
                <Box key={index} sx={{ my: 2 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {index + 1}. {q.question}
                  </Typography>
                  <Typography
                    variant="body2"
                    color={
                      selectedResult?.answers[index] === q.correctAnswer
                        ? 'success.main'
                        : 'error.main'
                    }
                  >
                    Your Answer: {selectedResult?.answers[index] || 'No Answer'}
                  </Typography>
                  <Typography variant="body2" color="primary.main">
                    Correct Answer: {q.correctAnswer}
                  </Typography>
                </Box>
              ))}
            </Box>
          ) : (
            <Typography>No exam data available!</Typography>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ReviewResults;
