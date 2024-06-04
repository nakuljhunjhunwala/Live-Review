import { useCallback, useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';

interface Review {
  _id: string;
  title: string;
  content: string;
  date: string;
}

function Home() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigator = useNavigate();
  const ws = useRef<WebSocket | null>(null);

  const getReviews = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:${import.meta.env.VITE_API_PORT}/reviews/all`);
      if (!response.ok) {
        throw new Error('Error fetching reviews');
      }
      const data = await response.json();
      setReviews(data?.data?.reverse() || []);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    try {
      await fetch(`http://localhost:${import.meta.env.VITE_API_PORT}/reviews/remove/${id}`, {
        method: 'DELETE',
      });
      setReviews((prevReviews) => prevReviews.filter((review) => review._id !== id));
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  }, []);

  useEffect(() => {
    getReviews();
  }, [getReviews]);

  const handleWsMessage = useCallback((message: MessageEvent) => {
    const data = JSON.parse(message?.data);

    setReviews((prevReviews) => {
      switch (data?.task) {
        case 'add':
          return [data?.data, ...prevReviews];
        case 'remove':
          return prevReviews.filter((review) => review._id !== data?.data._id);
        case 'update':
          return prevReviews.map((review) =>
            review._id === data?.data._id ? data?.data : review
          );
        default:
          return prevReviews;
      }
    });
  }, []);

  useEffect(() => {
    ws.current = new WebSocket(`ws://localhost:${import.meta.env.VITE_API_PORT}/ws`);

    ws.current.onopen = () => {
      console.log('Connected to websocket');
    };

    ws.current.onmessage = handleWsMessage;

    ws.current.onclose = () => {
      console.log('Disconnected from websocket');
    };

    return () => {
      ws.current?.close();
    };
  }, [handleWsMessage]);

  return (
    <div>
      <h1>Reviews</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && reviews.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Content</th>
              <th>Date Time</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review, i) => (
              <tr key={review._id}>
                <td>{i + 1}</td>
                <td>{review.title}</td>
                <td>{review.content}</td>
                <td>{new Date(review.date).toDateString()}</td>
                <td>
                  <button onClick={() => navigator(`/${review._id}`)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(review._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <p>No reviews found</p>
      )}

      <br />
      <button onClick={() => navigator('/new')}>New Review</button>
    </div>
  );
}

export default Home;
