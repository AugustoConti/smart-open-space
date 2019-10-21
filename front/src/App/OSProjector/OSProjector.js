import React from 'react';
import { Button } from 'grommet';

import { nextTalk } from '#api/os-client';
import MyProps from '#helpers/MyProps';

const OSProjector = ({
  match: {
    params: { id },
  },
}) => (
  <>
    <h1>OSProjector</h1>
    <Button
      label="Siguiente"
      onClick={() => {
        nextTalk(id);
      }}
    />
  </>
);
OSProjector.propTypes = { match: MyProps.match };

export default OSProjector;
