import { makeStyles } from '@material-ui/core/styles';

export const HigherLowerStyles = makeStyles({
    root: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200, 1fr))',
      // justifyContent: 'center',
      // alignItems: 'center',
      // padding: '8px'
    },
    box: {
        height: '400px',
        width: '400px',
        backgroundColor: 'yellow'
    }
  });