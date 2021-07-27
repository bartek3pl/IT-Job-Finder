import * as React from 'react';

import Button from '@components/forms/Button/Button';
import { MdArrowForward } from 'react-icons/md';

const App: React.FC = () => {
  return (
    <>
      <Button>
        <MdArrowForward />
      </Button>
    </>
  );
};

export default App;
