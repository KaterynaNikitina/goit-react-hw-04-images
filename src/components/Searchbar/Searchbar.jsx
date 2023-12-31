import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { Header, Form, SearchButton, Input } from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleQueryChange = e => {
    setQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (query.trim() === '') {
      toast.error('Type something!');
      return;
    }

    onSubmit(query);
    setQuery('');
  };

  return (
    <>
      <Header>
        <Form onSubmit={handleSubmit}>
          <SearchButton type="submit" className="button">
            <span className="Button-label">Search</span>
          </SearchButton>

          <Input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleQueryChange}
            value={query}
          />
        </Form>
      </Header>
    </>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
