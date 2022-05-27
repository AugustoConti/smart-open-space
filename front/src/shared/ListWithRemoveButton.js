import React from 'react';
import { Box, Button } from 'grommet';
import RowBetween from '#shared/RowBetween';
import { TrashIcon } from '#shared/icons';
import PropTypes from 'prop-types';

const List = (props) => (
  <Box as="ul" margin={{ top: 'small', bottom: 'small' }} {...props} />
);

const ListItem = (props) => <RowBetween as="li" border="top" pad="xxsmall" {...props} />;

const Item = ({ color, itemName, onRemove }) => (
  <ListItem background={color}>
    <Box>{itemName}</Box>
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
      {items.map((item, itemId) => (
        <Item
          color={item.color}
          key={`${item.name}-${itemId}`}
          itemName={item.name}
          onRemove={() =>
            onChange({ target: { value: items.filter((_, index) => index !== itemId) } })
          }
        />
      ))}
    </List>
  );
};
ListWithRemoveButton.propTypes = {
  items: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ListWithRemoveButton;
