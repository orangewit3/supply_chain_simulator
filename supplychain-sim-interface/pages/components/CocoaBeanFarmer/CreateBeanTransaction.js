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

/**
 * @dev Current attempt at decoupling boolean. See next dev comment for more 
 * info.
 */
export const showBeanEvent = false

/**
 * @dev Below is Jason's previous attempt at decoupling boolean of 
 * `showBeanEvent`, a boolean that we can use in our higher-order component, 
 * `index.js`, to perform an if-check to display the event data of the newly 
 * created transaction.
 */
// export async function useBeanEvent(showBeanEvent) {
//   if (!showBeanEvent) {
//     const [ showBeanEvent, setBeanEvent ] = useState(false)

//     return [ showBeanEvent, setBeanEvent ]
//   }

//   return showBeanEvent
// }

const CreateBeanTransactionForm = () => {
  /**
   * @dev
   * @todo The several lines below are for handling a submission of the form 
   * using the ENTER key (denoted as `event.which === 13`)
   */
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

    /**
     * @dev If you uncomment the next 3 lines, then this allows MetaMask to
     * request to be connected to the app after we make a call to the
     * `createBeanTransaction` function.
     */
    // const ethereum = window.ethereum
    // const web3Instance = new Web3(ethereum)
    // const enabledWeb3 = await ethereum.enable()
    const account = await web3.eth.getAccounts()
    const accountAddress = await account[ 0 ]

    /**
     * @dev
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

    showBeanEvent = true

    //   } else {
    //     console.log()
    //   }
  }

  return (
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
  )
}

export default CreateBeanTransactionForm