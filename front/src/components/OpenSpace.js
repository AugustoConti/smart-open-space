import React from 'react';

import PropTypes from 'prop-types';
import { Box, Heading, Grid, Text } from 'grommet';

import ButtonNew from './shared/ButtonNew';
import RowBetween from './shared/RowBetween';
import { useGetOS } from '../helpers/api/os-client';

const TalkCard = ({ description, name }) => (
  <Box background="white" elevation="small" fill pad="medium" round overflow="hidden">
    <Heading level="2" margin="none" size="small">
      {name}
    </Heading>
    <Text color="dark-5" size="small">
      {description}
    </Text>
  </Box>
);

TalkCard.propTypes = {
  description: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const OpenSpace = ({
  match: {
    params: { id },
  },
  history,
}) => {
  const [{ name, talks }] = useGetOS(id, () => history.push('/'));

  return (
    <>
      <RowBetween>
        <Heading level="2">{name}</Heading>
        <ButtonNew onClick={() => history.push(`/newTalk/${id}`)} />
      </RowBetween>
      <Grid columns="small" gap="small" margin={{ bottom: 'medium' }}>
        {talks.map(talk => (
          <TalkCard key={talk.id} {...talk} />
        ))}
      </Grid>
    </>
  );
};

OpenSpace.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string.isRequired }).isRequired,
  }).isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default OpenSpace;
