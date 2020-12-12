import { useEffect, useState } from 'react'
import Head from 'next/head'
import CocoaBeanFarmer from '../lib/ethereum/contract-api/cocoaBeanFarmer'

/** @dev Components */
import ETHGasCard from './components/ETHGas/ETHGasCard'
import CreateBeanTransaction from './components/CocoaBeanFarmer/CreateBeanTransaction'
import showBeanEvent from './components/CocoaBeanFarmer/CreateBeanTransaction'
import DeploySupplyChainTransactions from './components/SupplyChainTransactions/DeploySupplyChainTransactions'
import DeployCocoaBeanFarmer from './components/CocoaBeanFarmer/DeployCocoaBeanFarmer'
import DeployManufacturer from './components/Manufacturer/DeployManufacturer'
import Manufacturer from './components/Manufacturer/DeployManufacturer'
import Header from './components/Layouts/Header'

/** @dev Sample data  */
import memeData from '../lib/meme-data.json'

import PropTypes from 'prop-types'
import {
  Button,
  ClickAwayListener,
  Grid,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  Link,
} from '@material-ui/core'
import styles from '../styles/Home.module.css'


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(0.5),
  },
  table: {
    // minWidth: 500,
    maxWidth: '300px',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  margin: {
    margin: theme.spacing(0.5)
  },
}))


// For sortable head
const headCells = [
  { id: 'id', numeric: true, disablePadding: false, label: 'id' },
  { id: 'description', numeric: false, disablePadding: false, label: 'description' },
  { id: 'amount', numeric: true, disablePadding: false, label: 'amount' },
  { id: 'isCredit', numeric: false, disablePadding: false, label: 'isCredit' },
  { id: 'date', numeric: true, disablePadding: false, label: 'date' },
  { id: 'imageUrl', numeric: false, disablePadding: false, label: 'imageUrl' }
]

// Create data for table
function createData(id, description, amount, isCredit, date, imageUrl) {
  return { id, description, amount, isCredit, date, imageUrl }
}

/**
 * @dev `descendingComparator()`, `getComparator()`, and `stableSort` are all
 * functions for sorting table columns.
 */
function descendingComparator(a, b, orderBy) {
  if (b[ orderBy ] < a[ orderBy ]) {
    return -1
  }
  if (b[ orderBy ] > a[ orderBy ]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [ el, index ])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[ 0 ], b[ 0 ])
    if (order !== 0) return order
    return a[ 1 ] - b[ 1 ]
  })
  return stabilizedThis.map((el) => el[ 0 ])
}

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {/**
         * @dev and @todo 
         * Currently, the only header where sorting is useless is `imageUrl`
         */}
        { headCells.map((headCell) => (
          <TableCell
            key={ headCell.id }
            align={ headCell.numeric ? 'right' : 'left' }
            padding={ headCell.disablePadding ? 'none' : 'default' }
            sortDirection={ orderBy === headCell.id ? order : false }
          >
            <TableSortLabel
              active={ orderBy === headCell.id }
              direction={ orderBy === headCell.id ? order : 'asc' }
              onClick={ createSortHandler(headCell.id) }
            >
              { headCell.label }
              { orderBy === headCell.id ? (
                <span className={ classes.visuallyHidden }>
                  {order === 'desc' ? '' : '' }
                </span>
              ) : null }
            </TableSortLabel>
          </TableCell>
        )) }
      </TableRow>
    </TableHead>
  )
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf([ 'asc', 'desc' ]).isRequired,
  orderBy: PropTypes.string.isRequired,
}


/**
 * @dev Main functional component:
 * 
 * NOTE: 
 * If using `beanTxnEvents`, replace props as `Home({ beanTxnEvents })`
 * If using `allSupplyChainTxns`, replace props as `Home({ allSupplyChainTxns })` 
 * 
 * @param {props} beanTxnEvents OR allSupplyChainTxns 
 */
function Home({ allSupplyChainTxns }) {
  const [ order, setOrder ] = useState('asc')
  const [ orderBy, setOrderBy ] = useState('id')
  const [ open, setOpen ] = useState(false)
  // CSS for Material-UI
  const classes = useStyles()
  // To make txn data easier to manage in table format
  const rows = []

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleTooltipClose = () => {
    setOpen(false)
  }

  const handleTooltipOpen = () => {
    setOpen(true)
  }

  allSupplyChainTxns.map((txn, index) => {
    rows.push(createData(
      txn.id,
      txn.description,
      txn.amount,
      '' + txn.isCredit,
      txn.date,
      txn.imageUrl
    ))
  })


  return (
    <div>
      <Header />
      <div className={ styles.container }>
        <Head>
          <title>Supply Chain Simulator</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={ styles.main }>

          <h1 class='title-font mb-r text-4xl font-bold leading-15 tracking-tight'>Supply Chain Simulator</h1>

          <ETHGasCard />
          <DeploySupplyChainTransactions />
          <DeployCocoaBeanFarmer />
          <DeployManufacturer />

          <CreateBeanTransaction />

          <div class='grid m-20 py-20'>
            { showBeanEvent ? (
              <p>
                No transaction event data yet.
              </p>
            ) : (
                <div>
                  {
                    console.log(
                      contract.events.BeanTransaction({
                        fromBlock: 0
                      }).on('bean transaction data', event => console.log(event))
                    )
                  }
                </div>
              )
            }
          </div>

          <div className={ styles.grid }>

            <div className={ styles.card } >
              <div>
                <h2 className={ styles.description }>
                  Transaction Details
              </h2>
                <TableContainer component={ Paper }>
                  <Table
                    className={ classes.table }
                    aria-labelledby='tableTitle'
                    aria-label='enhanced table'
                  >
                    <EnhancedTableHead
                      classes={ classes }
                      order={ order }
                      orderBy={ orderBy }
                      onRequestSort={ handleRequestSort }
                    />
                    <TableBody>
                      { stableSort(rows, getComparator(order, orderBy))
                        .map((row, index) => {
                          const labelId = `enhanced-table-checkbox-${index}`

                          return (
                            <TableRow>
                              {/* <TableCell component="th" scope="row" padding="none">
                              <ClickAwayListener onClickAway={ handleTooltipClose }>
                                <Tooltip
                                  arrow
                                  PopperProps={ {
                                    disablePortal: true,
                                  } }
                                  onClose={ handleTooltipClose }
                                  open={ open }
                                  disableFocusListener
                                  disableHoverListener
                                  disableTouchListener
                                  title="Unique Tooltip per txn"
                                >
                                  <div>
                                    <button
                                      onClick={ handleTooltipOpen }
                                      className={ styles.tooltip }
                                    >
                                      <img
                                        src='./eye-tooltip-button.png'
                                        className={ styles.tooltipImg }
                                        height='12px'
                                        width='12px'
                                      />
                                    </button>
                                  </div>
                                </Tooltip>
                              </ClickAwayListener>
                            </TableCell> */}
                              <TableCell component="th" id={ labelId } scope="row" size='small'>
                                { row.id }
                              </TableCell>
                              <TableCell align="right" size='small'>{ row.description }</TableCell>
                              <TableCell align="right" size='small'>{ row.amount }</TableCell>
                              <TableCell align="right" size='small'>{ row.isCredit }</TableCell>
                              <TableCell
                                align="right"
                                size='small'
                              // style={ {
                              //   whiteSpace: 'nowrap',
                              //   textOverflow: 'ellipsis',
                              //   overflow: 'hidden',
                              //   maxWidth: '190px'
                              // } }
                              >
                                { row.date }
                              </TableCell>
                              <TableCell
                                align="right"
                                size='small'
                                style={ {
                                  whiteSpace: 'nowrap',
                                  textOverflow: 'ellipsis',
                                  overflow: 'hidden',
                                  maxWidth: '250px',
                                } }
                              >
                                <Link href={ row.imageUrl } target='_blank'>{ row.imageUrl }</Link>
                              </TableCell>
                            </TableRow>
                          )
                        }) }
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>
        </main>

        <footer className={ styles.footer }>
          Made with 💙 by{ ' ' }
          <a
            href="https://giesgroups.illinois.edu/disruptionlab/affiliated-staff/"
            target="_blank"
            rel="no credit where credit is due"
          >
            <img
              src="/uni-wordmark-full-color.svg"
              alt="no credit where credit is due"
              className={ styles.logo }
            />
          </a>
        </footer>
      </div >
    </div>
  )
}


Home.getInitialProps = (ctx) => {
  /**
   * @todo
   * Uncomment once the function works.
   */
  // const addresses = await web3.eth.getAccounts()
  // const beanTxnEvents = CocoaBeanFarmer.methods
  //   .createBeanTransaction()
  //   .send({
  //     from: addresses[ 0 ]
  //   })
  // const beanTxnEvents = CocoaBeanFarmer.events.beanTxn({
  //   fromBlock: 0
  // }).on('bean transaction data', event => {
  //   return event
  // })

  const allSupplyChainTxns = memeData.transactions

  // return { beanTxnEvents }
  return { allSupplyChainTxns }
}

export default Home