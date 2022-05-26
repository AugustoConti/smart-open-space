import React from 'react';
import { Box, Button } from 'grommet';
import RowBetween from '#shared/RowBetween';
import { TrashIcon } from '#shared/icons';
import PropTypes from 'prop-types';

const List = (props) => (
  <Box as="ul" margin={{ top: 'small', bottom: 'none' }} {...props} />
);

const ListItem = (props) => <RowBetween as="li" border="top" pad="xxsmall" {...props} />;

const Item = ({ itemName, onRemove }) => (
  <ListItem>
    {itemName}
    <Button icon={<TrashIcon color="neutral-4" />} onClick={onRemove} />
  </ListItem>
);
Item.propTypes = {
  onRemove: PropTypes.func.isRequired,
  itemName: PropTypes.string.isRequired,
};

const ListWithRemoveButton = ({ items, onChange }) => {
  return (
    <List>
      {items.map((item, index) => (
        <Item
          key={`${item}-${index}`}
          itemName={item}
          onRemove={() =>
            onChange({ target: { value: items.filter((_, i) => i !== index) } })
          }
        />
      ))}
    </List>
  );
};
ListWithRemoveButton.propTypes = {
  items: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ListWithRemoveButton;
