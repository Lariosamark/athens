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
import { collection, getDocs, doc, getDoc, deleteDoc } from 'firebase/firestore';

const ReviewResults = () => {
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [examDetails, setExamDetails] = useState(null);
  const [open, setOpen] = useState(false);

  // Fetch all exam results and user details
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const resultSnapshot = await getDocs(collection(db, 'examResults'));
        const resultList = resultSnapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));

        setResults(resultList);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    fetchResults();
  }, []);

  // Open result details dialog
  const handleViewDetails = async (result) => {
    setSelectedResult(result);

    try {
      // Fetch corresponding exam details
      const examDoc = await getDoc(doc(db, 'exams', result.examId));
      if (examDoc.exists()) {
        setExamDetails(examDoc.data());
      } else {
        setExamDetails(null);
      }
    } catch (error) {
      console.error('Error fetching exam details:', error);
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

  // Delete result
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'examResults', id));
      setResults(results.filter((result) => result.id !== id)); // Update local state
    } catch (error) {
      console.error('Error deleting result:', error);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Review Exam Results
      </Typography>
      <List>
        {results.map((result) => (
          <React.Fragment key={result.id}>
            <ListItem
              secondaryAction={
                <Box>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleViewDetails(result)}
                    sx={{ mr: 1 }}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDelete(result.id)}
                  >
                    Delete
                  </Button>
                </Box>
              }
            >
              <ListItemText
                primary={`${result.fullName}`} // Display user's full name
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
          {selectedResult?.fullName}'s Exam Review
        </DialogTitle>
        <DialogContent dividers>
          {examDetails ? (
            <Box>
              <Typography variant="h6" gutterBottom>
                Exam: {examDetails.title || 'Untitled Exam'}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Score: {selectedResult?.score}/{selectedResult?.totalQuestions}
              </Typography>

              {examDetails?.questions?.length > 0 ? (
                examDetails.questions.map((q, index) => {
                  // If answers are stored as an object (keyed by question ID)
                  const userAnswer =
                    selectedResult?.answers?.[q.id] !== undefined
                      ? selectedResult.answers[q.id]
                      : 'No Answer';

                  const isCorrect = userAnswer === q.correctAnswer;

                  return (
                    <Box
                      key={index}
                      sx={{
                        my: 2,
                        p: 2,
                        border: '1px solid #ccc',
                        borderRadius: 2,
                        backgroundColor: isCorrect ? '#e8f5e9' : '#ffebee',
                      }}
                    >
                      <Typography variant="subtitle1" fontWeight="bold">
                        {index + 1}. {q.question}
                      </Typography>
                      <Typography
                        variant="body2"
                        color={isCorrect ? 'success.main' : 'error.main'}
                      >
                        Your Answer: {userAnswer}
                      </Typography>
                      {!isCorrect && (
                        <Typography variant="body2" color="primary.main">
                          Correct Answer: {q.correctAnswer}
                        </Typography>
                      )}
                    </Box>
                  );
                })
              ) : (
                <Typography>No questions available!</Typography>
              )}
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
