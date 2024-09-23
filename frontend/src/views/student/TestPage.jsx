import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Grid, CircularProgress } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import BlankCard from 'src/components/shared/BlankCard';
import MultipleChoiceQuestion from './Components/MultipleChoiceQuestion';
import NumberOfQuestions from './Components/NumberOfQuestions';
import WebCam from './Components/WebCam';
import { useGetExamsQuery, useGetQuestionsQuery } from '../../slices/examApiSlice';
import { useSaveCheatingLogMutation } from 'src/slices/cheatingLogApiSlice';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const TestPage = () => {
  const { examId } = useParams();
  const navigate = useNavigate();

  const [selectedExam, setSelectedExam] = useState([]);
  const [examDurationInSeconds, setExamDurationInSeconds] = useState(0);
  const { data: userExamdata } = useGetExamsQuery();
  const [questions, setQuestions] = useState([]);
  const { data, isLoading } = useGetQuestionsQuery(examId);
  const [score, setScore] = useState(0);

  const [saveCheatingLogMutation] = useSaveCheatingLogMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const [cheatingLog, setCheatingLog] = useState({
    noFaceCount: 0,
    multipleFaceCount: 0,
    cellPhoneCount: 0,
    prohibitedObjectCount: 0,
    examId: examId || '',
    username: userInfo?.name || 'Unknown',
    email: userInfo?.email || 'No Email',
    copyPasting: false,  // Initialize as false
    tabsShifting: false,  // Initialize as false
  });

  useEffect(() => {
    if (userExamdata) {
      const exam = userExamdata.filter((exam) => exam.examId === examId);
      setSelectedExam(exam);

      if (exam.length > 0 && exam[0]?.duration) {
        setExamDurationInSeconds((exam[0].duration || 0) * 60);
      }
    }
  }, [userExamdata, examId]);

  useEffect(() => {
    if (data) {
      setQuestions(data || []); // Ensure questions is always an array
    }
  }, [data]);

  // Monitor copy-pasting
  useEffect(() => {
    const handleCopyPaste = () => {
      setCheatingLog((prevLog) => ({
        ...prevLog,
        copyPasting: true,
      }));
    };

    document.addEventListener('copy', handleCopyPaste);
    
    return () => {
      document.removeEventListener('copy', handleCopyPaste);
    };
  }, []);

  // Monitor tab shifting
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        setCheatingLog((prevLog) => ({
          ...prevLog,
          tabsShifting: true,
        }));
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const handleTestSubmission = async () => {
    try {
      setCheatingLog((prevLog) => ({
        ...prevLog,
        username: userInfo?.name || 'Unknown',
        email: userInfo?.email || 'No Email',
      }));

      await saveCheatingLogMutation(cheatingLog).unwrap();
      toast.success('User Logs Saved!!');
      navigate(`/Success`);
    } catch (error) {
      console.error('Error saving cheating log: ', error);
    }
  };

  const saveUserTestScore = () => {
    setScore((prevScore) => prevScore + 1);
  };

  return (
    <PageContainer title="TestPage" description="This is TestPage">
      <Box pt="3rem">
        <Grid container spacing={3}>
          <Grid item xs={12} md={7} lg={7}>
            <BlankCard>
              <Box
                width="100%"
                minHeight="400px"
                boxShadow={3}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                {isLoading ? (
                  <CircularProgress />
                ) : data && data.length > 0 ? (
                  <MultipleChoiceQuestion
                    questions={questions}
                    saveUserTestScore={saveUserTestScore}
                  />
                ) : (
                  <div>No questions available</div>
                )}
              </Box>
            </BlankCard>
          </Grid>
          <Grid item xs={12} md={5} lg={5}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <BlankCard>
                  <Box
                    maxHeight="300px"
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'start',
                      justifyContent: 'center',
                      overflowY: 'auto',
                      height: '100%',
                    }}
                  >
                    <NumberOfQuestions
                      questionLength={questions?.length || 0}
                      submitTest={handleTestSubmission}
                      examDurationInSeconds={examDurationInSeconds}
                    />
                  </Box>
                </BlankCard>
              </Grid>
              <Grid item xs={12}>
                <BlankCard>
                  <Box
                    width="300px"
                    maxHeight="180px"
                    boxShadow={3}
                    display="flex"
                    flexDirection="column"
                    alignItems="start"
                    justifyContent="center"
                  >
                    <WebCam cheatingLog={cheatingLog} updateCheatingLog={setCheatingLog} />
                  </Box>
                </BlankCard>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default TestPage;
