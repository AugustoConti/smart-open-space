import React from 'react';

import { Button } from 'grommet';
import { Add } from 'grommet-icons';

const ButtonNew = props => <Button label="Nuevo" icon={<Add />} primary {...props} />;

export default ButtonNew;
