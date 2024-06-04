import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import InputForm from '../components/InputForm';

interface Review {
  _id: string;
  title: string;
  content: string;
    date: string;
}

function EditReview() {
  const [review, setReview] = useState<Review | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const navigator = useNavigate();

  const getReview = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8000/reviews/${id}`);
      if (!response.ok) {
        throw new Error('Error fetching review');
      }
      const data = await response.json();
      setReview(data?.data || null);
    } catch (error) {
      setError('Error fetching review');
    } finally {
      setLoading(false);
    }
  }, [id]);

  const updateReview = useCallback(
    async (title: string, content: string) => {
      try {
        await fetch(`http://localhost:8000/reviews/update/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, content }),
        });
        navigator('/');
      } catch (error) {
        console.error('Error updating review:', error);
      }
    },
    [id, navigator]
  );

  useEffect(() => {
    getReview();
  }, [getReview]);

  return (
    <div>
      <h1>Edit Review</h1>
      <div>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {review && (
          <InputForm
            title={review.title}
            content={review.content}
            buttonText="Update"
            onSave={updateReview}
          />
        )}
      </div>
    </div>
  );
}

export default EditReview;
