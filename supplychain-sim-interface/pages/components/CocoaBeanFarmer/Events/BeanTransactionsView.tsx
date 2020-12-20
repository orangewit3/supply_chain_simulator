import { memo } from 'react'


const BeanTransactionsView = memo(({
  beanTransactionData
}) => {

  return (
    <div className="grid max-h-screen place-items-center my-10 p-10 rounded-3xl shadow-lg">
      <div className='text-xl bg-gray-100 mx-5 p-2 shadow-lg rounded-md'>New Bean Transactions</div>
      <div className='grid m-20 py-20'>
        {/* { showBeanEvent ? (
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
        } */}
      </div>
      <p>{beanTransactionData}</p>
    </div>
  )
})

export default BeanTransactionsView