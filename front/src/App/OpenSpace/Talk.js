import React, { useState } from 'react';

import { Anchor, Box, Button, Layer, Markdown, Text } from 'grommet';
import PropTypes from 'prop-types';

import Card from '#shared/Card';
import Detail from '#shared/Detail';
import { FormCloseIcon, HomeIcon, LinkIcon, UserIcon } from '#shared/icons';
import Row from '#shared/Row';
import Title from '#shared/Title';

const DescriptionInfo = ({ title, speaker, info, onClose, meetingLink, documents }) => (
  <Layer onClickOutside={onClose} onEsc={onClose}>
    <Box gap="medium" pad={{ horizontal: 'medium', bottom: 'medium', top: 'small' }}>
      <Row justify="end">
        <Button icon={<FormCloseIcon />} onClick={onClose} plain />
      </Row>
      <Title level="2" truncate={false}>
        {title}
      </Title>
      <Detail icon={UserIcon} text={speaker} />
      {info && (
        <Markdown components={{ p: (props) => <Detail color="dark-1" {...props} /> }}>
          {info}
        </Markdown>
      )}
      {meetingLink && (
        <Anchor
          icon={<LinkIcon />}
          color="dark-1"
          href={meetingLink}
          label={meetingLink}
          target="_blank"
        />
      )}
      {documents.map((document) => (
        <Row title={document.name}>
          <Title level="5" truncate={false}>
            {document.name}
          </Title>
          <Anchor
            color="dark-1"
            href={document.link}
            label={document.link}
            target="_blank"
          />
        </Row>
      ))}
    </Box>
  </Layer>
);
DescriptionInfo.propTypes = {
  info: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  speaker: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  meetingLink: PropTypes.string.isRequired,
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

const ButtonGoToLink = ({ onClick }) => (
  <Button
    alignSelf="center"
    color="accent-4"
    label="Ir a reunion"
    onClick={onClick}
    primary
  />
);

const Talk = ({
  talk: { description, name, speaker, meetingLink, track, documents },
  room,
  children,
}) => {
  const [open, setOpen] = useState(false);

  const color = track ? track.color : 'accent-3';
  let shouldDisplayMoreInfo = description || meetingLink;
  const talkLink = meetingLink || room?.link;
  return (
    <>
      <Card borderColor={color} margin="xsmall" gap="small">
        {children}
        <Title>{name}</Title>
        <Box gap="medium">
          <Detail icon={UserIcon} text={speaker.name} />
          {room && <Detail icon={HomeIcon} text={room.name} />}
          {shouldDisplayMoreInfo && <ButtonMoreInfo onClick={() => setOpen(true)} />}
          {talkLink && <ButtonGoToLink onClick={() => window.open(talkLink, '_blank')} />}
        </Box>
      </Card>
      {open && (
        <DescriptionInfo
          title={name}
          speaker={speaker.name}
          info={description}
          onClose={() => setOpen(false)}
          documents={documents}
          meetingLink={meetingLink}
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
