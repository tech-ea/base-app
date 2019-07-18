import React from 'react';
import Typography from '@material-ui/core/Typography';
const capitalize = s => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const SceneHeader = props => {
  const { path } = props;
  const title = path.split('/');
  return (
    <Typography variant="h6" noWrap>
      {title.map(item => `${capitalize(item)} `)}
    </Typography>
  );
};

export default SceneHeader;
