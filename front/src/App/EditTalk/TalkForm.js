import { useHistory } from 'react-router-dom';
import MainHeader from '#shared/MainHeader';
import { TalkIcon } from '#shared/icons';
import MyForm from '#shared/MyForm';
import React from 'react';

export const TalkForm = ({ onSubmit, openSpace, subtitle }) => {
  const history = useHistory();
  const openSpaceHasTracks = openSpace && openSpace.tracks.length > 0;

  return (
    <>
      <MainHeader>
        <MainHeader.Title icon={TalkIcon} label="Nueva Charla" />
        <MainHeader.SubTitle>{subtitle}</MainHeader.SubTitle>
      </MainHeader>
      <MyForm onSecondary={history.goBack} onSubmit={onSubmit}>
        <MyForm.Text label="Título" placeholder="¿De que trata tu charla?" />
        <MyForm.TextArea placeholder="Describí tu charla con mas detalle..." />
        <MyForm.Link label="Link" placeholder="Link a la reunion" />
        {openSpaceHasTracks && (
          <MyForm.Select
            label="Track"
            name="trackId"
            options={openSpace.tracks}
            labelKey="name"
            valueKey="id"
          />
        )}
      </MyForm>
    </>
  );
};
