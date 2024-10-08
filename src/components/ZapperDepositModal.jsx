import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { ethers } from 'ethers'
import {
  useAccount,
  erc20ABI,
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import TokenDisplay from 'components/TokenDisplay'
import { getZapAddress } from 'utils/addressHelpers'
import zapABI from 'config/abi/zap'
import lpTokenAbi from 'config/abi/lpToken'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: '#02264d',
    color: 'white',
    border: 'none',
  },
}

export default function ZapperDepositModal(props) {
  const zapAddress = getZapAddress()
  const [open, setOpen] = useState(false)
  const { address } = useAccount()
  const tokenABI = props.tokenA.isTokenOnly ? erc20ABI : lpTokenAbi

  const [allowance, setAllowance] = useState(0)
  const [amount, setAmount] = useState(0)

  const tokenAAllownceRead = useContractRead({
    address: props.tokenA.lpAddresses,
    abi: tokenABI,
    functionName: 'allowance',
    args: [address || '0x000000000000000000000000000000000000dead'],
    chainId: 8453,

    onSuccess(data) {
      console.log('Success', data)
    },
  })

  const { config, error, refetch } = usePrepareContractWrite({
    address: zapAddress,
    abi: zapABI,
    functionName: 'zap',
    args: [
      props.tokenA.lpAddresses,
      ethers.utils.parseEther(amount.toString() || '1'),
      props.tokenB.lpAddresses,
    ],
    chainId: 8453,
  })

  const { write, isSuccess, data, isLoading, reset } = useContractWrite({
    ...config,
  })

  const { isSuccess: finished } = useWaitForTransaction({
    chainId: 8543,
    hash: data?.hash,
  })

  const { config: approveConfig } = usePrepareContractWrite({
    address: props.tokenA.lpAddresses,
    abi: tokenABI,
    functionName: 'approve',
    chainId: 8453,
    args: [zapAddress, '1000000000000000000000000'],
  })

  const { write: approveWrite } = useContractWrite({
    ...approveConfig,
  })

  function openModal() {
    setOpen(true)
  }

  function closeModal() {
    setOpen(false)
  }

  function handleDeposit() {
    if (props.tokenA.lpSymbol == 'USDC' || props.tokenA.lpSymbol == 'USDT') {
      if (ethers.utils.formatUnits(allowance, 6) < amount) {
        approveWrite?.()
      } else {
        write?.()
      }
    } else {
      if (ethers.utils.formatUnits(allowance, 'ether') < amount) {
        approveWrite?.()
      } else {
        write?.()
      }
    }
  }

  async function updateUI() {
    const allownceA = (tokenAAllownceRead.data || 0).toString()
    setAllowance(allownceA)
  }

  useEffect(() => {
    updateUI()
  }, [])

  console.log(zapAddress)

  return (
    <>
      <div className='flex justify-center pb-16'>
        <button
          className='bg-secondary-700 rounded-lg p-3 hover:scale-105 transition ease-in-out'
          onClick={openModal}
        >
          {props.tokenA.lpSymbol} into {props.tokenB.lpSymbol}
        </button>
      </div>

      <Modal
        isOpen={open}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className='w-[350px] p-6 rounded-lg'>
          <div className='flex justify-around'>
            <TokenDisplay token={props.tokenA} modal={true} />
            <TokenDisplay token={props.tokenB} modal={true} />
          </div>
          <p className='text-center text-lg pt-4'>
            {props.tokenA.lpSymbol} into {props.tokenB.lpSymbol}
          </p>
          <p className='text-center text-gray-400 text-sm py-2'>
            Select any amount of tokens.
          </p>

          <div className='form_input'>
            <input
              type='number'
              placeholder='0'
              className='h-[45px!important]'
              value={amount}
              min={0}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <p className='text-right'>Available: {props.availableA}</p>
          <div className='flex gap-3 pt-4'>
            <button
              className='border border-gray-600 w-full rounded-lg hover:scale-105 transition ease-in-out p-[8px]'
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              onClick={handleDeposit}
              disabled={props.availableA < amount}
              className='border disabled:opacity-50 disabled:hover:scale-100 border-secondary-700 w-full rounded-lg hover:scale-105 transition ease-in-out p-[8px] bg-secondary-700'
            >
              Deposit {props.tokenA.lpSymbol}{' '}
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}
