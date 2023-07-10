import { useState } from 'react';
import { ToastContainer } from 'react-toastify';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';



export const Dashboard = () => {
  const [query, setQuery] = useState('');

const handleFormSubmit = (query) => {
  setQuery(query);
};

  return (
    <div className='Dashboard'>
            <Searchbar onSubmit={handleFormSubmit} />
            <ImageGallery query={query} />
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </div>
  );
};


