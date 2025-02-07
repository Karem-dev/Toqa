import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCheck, FaTimes, FaTrash } from 'react-icons/fa';

function DashboardComments() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/admin/comments', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setComments(response.data.comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.patch(`http://localhost:8000/api/admin/comments/${id}/status`, {
        status: true,
      });
      fetchComments();
    } catch (error) {
      console.error('Error approving comment:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.patch(`http://localhost:8000/api/admin/comments/${id}/status`, {
        status: false,
      });
      fetchComments();
    } catch (error) {
      console.error('Error rejecting comment:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/admin/comments/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchComments();
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  if (loading) return <div>Loading comments...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Comments</h1>
      {comments.length === 0 ? (
        <p>No comments to display</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Comment</th>
              <th>Rating</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment, index) => (
              <tr key={comment.id}>
                <td>{index + 1}</td>
                <td>{`${comment.user?.first_name} ${comment.user?.last_name}`}</td>
                <td>{comment.content}</td>
                <td>{comment.rating}</td>
                <td>{comment.status ? 'Approved' : 'Pending'}</td>
                <td>
                  {!comment.status && <button onClick={() => handleApprove(comment.id)}><FaCheck /></button>}
                  {comment.status && <button onClick={() => handleReject(comment.id)}><FaTimes /></button>}
                  <button onClick={() => handleDelete(comment.id)}><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DashboardComments;
