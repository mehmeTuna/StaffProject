import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    minWidth: 150,
    minHeight:200
  },
  bullet: {
    display: 'inline-block',
    margin: '0 1px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 0,
  },
});

export default function CareerAbout() {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="subtitle2" component="p">
        Staff: Bülent Çolak
        </Typography>
        <Typography variant="subtitle2" component="p">
        Gender: Male
        </Typography>
        <Typography variant="subtitle2" component="p">
        Martial Status: Unspecified
        </Typography>
        <Typography variant="subtitle2" component="p">
        GSM: 007827292641
        </Typography>
        <Typography variant="subtitle2" component="p">
        Class: Boss
        </Typography>
        <Typography variant="subtitle2" component="p">
        Experience: Founder
        </Typography>
        <Typography variant="subtitle2" component="p">
        Status: Recruitment
        </Typography>
      </CardContent>
    </Card>
  );
}