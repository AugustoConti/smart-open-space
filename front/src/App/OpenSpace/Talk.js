import React, { useState } from 'react';

import { Box, Button, Layer } from 'grommet';
import PropTypes from 'prop-types';

import Card from '#shared/Card';
import Detail from '#shared/Detail';
import { FormCloseIcon, HomeIcon, UserIcon } from '#shared/icons';
import Row from '#shared/Row';
import Title from '#shared/Title';

const DescriptionInfo = ({ title, speaker, info, onClose }) => (
  <Layer onClickOutside={onClose} onEsc={onClose}>
    <Box gap="medium" pad={{ horizontal: 'medium', bottom: 'medium', top: 'small' }}>
      <Row justify="end">
        <Button icon={<FormCloseIcon />} onClick={onClose} plain />
      </Row>
      <Title>{title}</Title>
      <Detail icon={UserIcon} text={speaker} />
      <Detail color="dark-1" text={info} />
    </Box>
  </Layer>
);
DescriptionInfo.propTypes = {
  info: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  speaker: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

const ButtonMoreInfo = ({ onClick }) => (
  <Button
    alignSelf="center"
    color="accent-3"
    label="Mas Info"
    onClick={onClick}
    primary
  />
);
ButtonMoreInfo.propTypes = { onClick: PropTypes.func.isRequired };

const Talk = ({ talk: { description, name, speaker }, room }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Card
        borderColor="accent-3"
        height={room ? '230px' : undefined}
        margin="xsmall"
        gap="small"
      >
        <Box>
          <Box overflow="hidden">
            <Title>{name}</Title>
          </Box>
          <Detail icon={UserIcon} text={speaker.name} />
          {room && <Detail icon={HomeIcon} text={room.name} />}
        </Box>
        {description && <ButtonMoreInfo onClick={() => setOpen(true)} />}
      </Card>
      {open && (
        <DescriptionInfo
          title={name}
          speaker={speaker.name}
          info={description}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
};
Talk.propTypes = {
  room: PropTypes.shape(),
  talk: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    speaker: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
  }).isRequired,
};

export default Talk;
