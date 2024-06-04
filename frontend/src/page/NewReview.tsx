import InputForm from '../components/InputForm';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

function NewReview() {
  const navigator = useNavigate();

  const createNewReview = useCallback(async (title: string, content: string) => {
    try {
      await fetch(`http://localhost:${import.meta.env.VITE_API_PORT}/reviews/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });
      navigator('/');
    } catch (error) {
      console.error('Error creating new review:', error);
    }
  }, [navigator]);

  return (
    <div>
      <h1>New Review</h1>
      <InputForm
        title=''
        content=''
        buttonText='Create'
        onSave={createNewReview}
      />
    </div>
  );
}

export default NewReview;
