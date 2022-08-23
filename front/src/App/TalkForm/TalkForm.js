import { useHistory } from 'react-router-dom';
import MainHeader from '#shared/MainHeader';
import { TalkIcon } from '#shared/icons';
import MyForm from '#shared/MyForm';
import React from 'react';

const emptyTalk = { name: '', description: '', meetingLink: '' };

export const TalkForm = ({
  onSubmit,
  openSpace,
  subtitle,
  title,
  initialValues = emptyTalk,
}) => {
  const history = useHistory();
  const openSpaceHasTracks = openSpace && openSpace.tracks.length > 0;
  return (
    <>
      <MainHeader>
        <MainHeader.Title icon={TalkIcon} label={title} />
        <MainHeader.SubTitle>{subtitle}</MainHeader.SubTitle>
      </MainHeader>
      <MyForm onSecondary={history.goBack} onSubmit={onSubmit}>
        <MyForm.Text
          label="Título"
          placeholder="¿Como querés nombrar tu charla?"
          value={initialValues.name}
        />
        <MyForm.TextArea
          style={{ fontFamily: 'monospace' }}
          placeholder="Describí tu charla con mas detalle. Podés usar Markdown"
          value={initialValues.description ? initialValues.description : ''}
        />
        <MyForm.Link
          label="Link"
          placeholder="Link a la reunión virtual (meet/zoom)"
          value={initialValues.meetingLink ? initialValues.meetingLink : ''}
        />
        {openSpaceHasTracks && (
          <MyForm.Select
            label="Track"
            name="trackId"
            options={openSpace.tracks}
            labelKey="name"
            valueKey="id"
            value={initialValues.track ? initialValues.track.id : ''}
          />
        )}
      </MyForm>
    </>
  );
};
