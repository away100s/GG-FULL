import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { useVideoContext } from '../contexts/VideoContext';
import { SearchIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Searchbar() {
  const { onSearchedVideo } = useVideoContext();
  const [tempSearch, setTempSearch] = useState('');
  const navigate = useNavigate();

  function handleSearchVideo(ev) {
    if (ev.key === 'Enter' || ev.type === 'click') {
      onSearchedVideo(tempSearch);
      navigate(`/search?q=${tempSearch}`);
      setTempSearch('');
    }
  }

  return (
    <InputGroup mx={8}>
      <Input
        placeholder='Cari video yang mau ditonton'
        size='md'
        value={tempSearch}
        onChange={(ev) => setTempSearch(ev.target.value)}
        onKeyDown={(ev) => handleSearchVideo(ev)}
      />
      <InputRightElement>
        <IconButton
          colorScheme='green'
          aria-label='Cari video'
          icon={<SearchIcon />}
          onClick={(ev) => handleSearchVideo(ev)}
        />
      </InputRightElement>
    </InputGroup>
  );
}

export default Searchbar;
