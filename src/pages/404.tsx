import React, { useEffect } from 'react';
import { navigate } from 'gatsby';

function NotFoundPage(): JSX.Element {
  useEffect(() => {
    navigate('/'); // redirecting to home page
  }, []);

  return (
    <div>
      <h1>(404) NotFound Page</h1>
    </div>
  );
}

export default NotFoundPage;
