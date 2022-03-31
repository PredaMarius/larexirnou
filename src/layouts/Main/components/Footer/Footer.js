import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography, Link, colors } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
    background:colors.blueGrey[100],
    position: 'absolute',
  marginBottom: 0,
  marginTop:'15px',
  width: '100%',
  height: '200px'    
  }
}));

const Footer = props => {
  const { className } = props;

  const classes = useStyles();

  return (
    <div
      
      className={clsx(classes.root, className)}
    >
      <Typography variant="body1">
        &copy;{' '}
        <Link
          component="a"
          href="http://larexir.ro/"
          target="_blank"
        >
          Larexir Decor
        </Link>
        . 2019
      </Typography>
      <Typography variant="caption">
        Created by SoftDivision Company
      </Typography>
    </div>
  );
};

Footer.propTypes = {
  className: PropTypes.string
};

export default Footer;
