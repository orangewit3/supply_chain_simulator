import React, { useState } from 'react'
import web3 from '../../../lib/ethereum/web3'
import CocoaBeanFarmer from '../../../../build/contracts/CocoaBeanFarmer.json'

import {
  Button,
  fade,
  FormControl,
  Grid,
  makeStyles,
  TextField,
  withStyles,
} from '@material-ui/core'
import styles from '../../../styles/Home.module.css'

const useStylesReddit = makeStyles((theme) => ({
  root: {
    border: '0.5px solid #aec6cf',
    width: 300,
    overflow: 'hidden',
    borderRadius: '1.5em',
    margin: '-1px',
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

const ColorButton = withStyles((theme) => ({
  root: {
    backgroundColor: '#d3d3d3',
    borderRadius: '2em',
    padding: '10px',
    textTransform: 'capitalize',
  },
}))(Button)

const CreateBeanTransactionForm = () => {
  // const handleEnter = (e) => {
  //   const key = e.which
  //   if (key === 13) {
  //     e.preventDefault()
  //     e.stopPropagation()
  //   }
  // }

  // State for form
  const [ beanTxnName, setBeanTxnName ] = useState('txn1')
  const [ beanTxnDescription, setBeanTxnDescription ] = useState('first bean txn')
  const [ beanTxnQuantityToSend, setBeanTxnQuantityToSend ] = useState('10')


  const handleCreateBeanTransaction = async () => {
    const contract = new web3.eth.Contract(
      CocoaBeanFarmer.abi,
      // Harded code for demo
      "0xcaDbE04877927d4450335FDbB4b2EA2018883cD2",
    )


    // const ethereum = window.ethereum
    // const web3Instance = new Web3(ethereum)
    // const enabledWeb3 = await ethereum.enable()
    const account = await web3.eth.getAccounts()
    const accountAddress = await account[ 0 ]

    /**
     * @todo We need an if-check to validate the form has all fields filled
     */
    // if (
    //   beanTxnName != 'txn1' &&
    //   beanTxnDescription != 'first bean txn' &&
    //   beanTxnQuantityToSend != '10'
    // ) {
    await contract.methods
      .createBeanTransaction(
        beanTxnName,
        beanTxnDescription,
        beanTxnQuantityToSend.toString()
      ).send({ from: accountAddress })

    contract.events.BeanTransaction({
      fromBlock: 0
    }).on('bean transaction data', event => console.log(event))
    //   } else {
    //     console.log()
    //   }
  }

  return (
    <div className={ styles.card }>
      <form on>
        <Grid className={ styles.formField } item>
          <FormControl>
            <RedditTextField
              label='name'
              size='small'
              required={ true }
              // onKeyPress={ handleEnter }
              variant='filled'
              placeholder={ beanTxnName }
              onChange={ (e) =>
                setBeanTxnName(e.currentTarget.value)
              }
            />
          </FormControl>
        </Grid>
        <Grid className={ styles.formField } item>
          <FormControl>
            <RedditTextField
              label='description'
              size='small'
              required={ true }
              // onKeyPress={ handleEnter }
              variant='filled'
              placeholder={ beanTxnDescription }
              onChange={ (e) =>
                setBeanTxnDescription(e.currentTarget.value)
              }
            />
          </FormControl>
        </Grid>
        <Grid className={ styles.formField } item>
          <FormControl>
            <RedditTextField
              label='quantity to send'
              size='small'
              required={ true }
              // onKeyPress={ handleEnter }
              variant='filled'
              placeholder={ beanTxnQuantityToSend }
              onChange={ (e) =>
                setBeanTxnQuantityToSend(e.currentTarget.value)
              }
            />
          </FormControl>
        </Grid>
        <div className={ styles.formButtonDiv }>
          <ColorButton
            className={ styles.formButton }
            onClick={ handleCreateBeanTransaction }
          >
            Create Transaction
            </ColorButton>
        </div>
      </form>
    </div>
  )
}

export default CreateBeanTransactionForm