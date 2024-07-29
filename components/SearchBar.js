import React, { useState } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const SearchBar = ({ onSearch }) => {
  const [tags, setTags] = useState([]);

  const handleTagDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleTagAddition = (tag) => {
    const newTag = { id: tag.id, text: tag.text, color: 'bg-orange-500' };
    setTags([...tags, newTag]);
  };

  const handleTagDrag = (tag, currPos, newPos) => {
    const newTags = [...tags];
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    setTags(newTags);
  };

  const handleTagSearch = () => {
    onSearch(tags.map(tag => tag.text));
  };

  const renderTag = ({ tag, key, disabled, onRemove, classNameRemove, getTagDisplayValue, readOnly }) => {
    return (
      <span key={key} className={`bg-orange-500 text-white rounded px-2 py-1 m-1 inline-block`}>
        {getTagDisplayValue(tag)}
        {!readOnly && (
          <button type="button" className="ml-2 cursor-pointer" onClick={() => onRemove(key)}>
            x
          </button>
        )}
      </span>
    );
  };

  return (
    <div className="mb-4 text-center">
      <div className="flex flex-col items-center">
        <ReactTags
          tags={tags}
          delimiters={delimiters}
          handleDelete={handleTagDelete}
          handleAddition={handleTagAddition}
          handleDrag={handleTagDrag}
          inputFieldPosition="top"
          autocomplete
          placeholder="Enter tags..."
          classNames={{
            tagInputField: 'border rounded px-4 py-2 w-full mb-2', // Added margin-bottom to create space below input
            tags: 'flex justify-center flex-wrap', // Ensure tags are centered and wrapped
            selected: 'flex justify-center flex-wrap', // Ensure selected tags are centered
            tag: 'bg-orange-500 text-white rounded px-2 py-1 m-1 inline-block', // Styling class for tags
          }}
          renderTag={renderTag}
        />
        <button
          onClick={handleTagSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
