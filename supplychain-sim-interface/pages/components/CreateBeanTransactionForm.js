import React, { useState } from 'react'
import {
  Button,
  fade,
  FormControl,
  TextField,
  withStyles,
} from '@material-ui/core'
import styles from '../../styles/Home.module.css'


const ColorButton = withStyles((theme) => ({
  root: {
    color: '#aec6cf',
    backgroundColor: 'black',
    borderRadius: '0.5em',
  },
}))(Button)

const useStylesReddit = makeStyles((theme) => ({
  root: {
    border: '0.5px solid #aec6cf',
    width: 300,
    overflow: 'hidden',
    borderRadius: '0.5em',
    backgroundColor: '#fff',
    transition: theme.transitions.create([ 'border-color', 'box-shadow' ]),
    '&:hover': {
      backgroundColor: '#fff',
    },
    '&$focused': {
      backgroundColor: '#fff',
      boxShadow: `${fade('#FF9933', 0.25)} 0 0 0 2px`,
      borderColor: '#FF9933',
    },
  },
  focused: {},
}))

/* @dev Show display name at all times */
function RedditTextField(props) {
  const classes = useStylesReddit()

  return (
    <TextField InputProps={ { classes, disableUnderline: true } } { ...props } />
  )
}

const CreateBeanTransactionForm = () => {
  const handleEnter = (e) => {
    const key = e.which
    if (action !== key === 13) {
      e.preventDefault()
      e.stopPropagation()
      
    }
  }

  // State for form
  const [ beanTxnName, setBeanTxnName ] = useState('bean txn name')
  const [ beanTxnDescription, setBeanTxnDescription ] = useState('bean txn description')
  const [ beanTxnQuantityToSend, setBeanTxnQuantityToSend ] = useState('bean quantity to send for this txn')

  return (
    <Form className={ styles.form } on>
      <Grid item>
        <FormControl>
          <RedditTextField
            label='name'
            size='small'
            required='true'
            onKeyPress={ handleEnter }
            variant='filled'
            placeholder={ beanTxnName }
            onChange={ (e) =>
              setBeanTxnName(e.currentTarget.value)
            }
          />
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl>
          <RedditTextField
            label='description'
            size='small'
            required='true'
            onKeyPress={ handleEnter }
            variant='filled'
            placeholder={ beanTxnDescription }
            onChange={ (e) =>
              setBeanTxnDescription(e.currentTarget.value)
            }
          />
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl>
          <RedditTextField
            label='quantity to send'
            size='small'
            required='true'
            onKeyPress={ handleEnter }
            variant='filled'
            placeholder={ beanTxnQuantityToSend }
            onChange={ (e) =>
              setBeanTxnQuantityToSend(e.currentTarget.value)
            }
          />
        </FormControl>
      </Grid>
      <Grid
        item
        className={ }
      >
        <FormControl>
          <ColorButton
            variant='outlined'
            disableRipple='true' onClick={ handleRequestAccess }
          >
            Create Bean Transaction
            </ColorButton>
        </FormControl>
      </Grid>
    </Form>
  )
}